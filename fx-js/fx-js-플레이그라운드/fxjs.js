// 목적은 실제 코드 구동 테스트 및 기능 이해를 위한 플레이그라운드이다.
// 기본 코드 베이스는 fxjs 인프런 기본편 강의 최종 코드이다.
// 필요 또는 개선이 필요한 경우, fxjs의 코드를 수정하고, 테스트한다.

// ## curry
// curring을 통해서 함수 평가를 지연시킬 수 있다.
// curry 적용 함수 호출 방법
// add(a,b) 기준
// 1. add(1)(2)
// 2. add(1,2)
// 3. add(1,2,3,4,5,6,7,8,9,10) 
//  - 1, 2 이후로는 무시 된다.
//  - 무시된 값에 대해서 consoel.warn이 필요할까?
// 만약 curry의 인자가 1개인 경우에는?
//  - 해당 함수로는 커링 처리가 안된다.
//  - ramdajs에는 curryN이라는 함수가 존재한다.
export const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const isIterable =  a => !!(a && a[Symbol.iterator])

export const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

// ## redcueF
// 코드 분석 핵심1 : acc와 a가 모두 Promise인 경우, 두 Promise를 합성하는 방법은?
//  - 해당 코드를 호출하는 reduce에서는 acc는 Promise가 풀린 값만을 받는다.
//  - **단 실제적으로 acc 또한 Promise일 수 있다. 이 경우에 대한 별도 처리를 추가해야 한다.**
const reduceF = (acc, a, f) =>  {

    return a instanceof Promise ?
        a.then(a => f(acc, a), e => e === nop ? acc: Promise.reject(e)) :
        f(acc, a);
}

export const head = iter => go1(take(1, iter), ([h])=> h)

// ## reduce
//  - 코드 분석 핵심1 : acc가 Promise이면서 동시에, iter의 value가 Promise이다.
//      - 두 Promise 간 합성이 reduce 함수 내부의 reduceF에서 어떻게 이루어지는지 파악한다.
//  - 코드 분석 핵심2 : reduce 내부에서 이터레이터가 Promise인 경우, Promise가 then으로 이행 된 후, 재귀적으로 recur 함수를 호출한다. 
export const reduce = curry((f, acc, iter)=> {
    if(!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter)

    iter = iter[Symbol.iterator]();

    // 최초 acc가 Promise인 경우, go1으로 처리한다.
    // 한 번 acc가 Promise가 된 경우, 계속 acc는 Promise가 된다.
    // 실질적으로 go1에 의해서, Promise가 이행된 값으로 acc가 바뀐다. 
    // 그 후 reduceF로 연산 시, cur이 Promise인 경우, acc가 Promise가 된다.
    // 이 경우, then 후 recur 함수를 리턴한다. (**순차적으로 실행되도록 재귀처리**) 
    return go1(acc, function recur(acc){
        let cur;
        while(!(cur = iter.next()).done) {
            acc = reduceF(acc, cur.value, f);
            if(acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    })
})

export const go = (...args) => reduce((a, f)=> f(a), args);

export const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs)

export const take = curry((l, iter)=> {
    let res = []
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        while(!(cur = iter.next()).done) {
            const a = cur.value;
            if(a instanceof Promise) {
                return a
                    .then(a => (res.push(a), res).length ===l ? res : recur())
                    .catch(e => e === nop ? recur(): Promise.reject(e))
            }
            res.push(a);
            if(res.length === l) return res;
        }
        return res
    }();
})

export const takeAll = take(Infinity)

export const L = {};

L.range = function* (l) {
    let i = -1;
    while(++i < l) yield i;
}

L.map = curry(function* (f, iter) {
    for (const a of iter){
        yield go1(a, f)
    }
})

export const nop = Symbol('nop')

L.filter = curry(function* (f, iter) {
    for (const a of iter){
        const b = go1(a, f)
        if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
        else if (b) yield a;
    }
})

L.entries = function * (obj) {
    for (const k in obj) yield [k, obj[k]];
}

L.flatten = function* (iter) {
    for (const a of iter) {
        if(isIterable(a) && typeof a != 'string') yield* a;
        else yield a;
    }
}

L.deepFlat = function* f(iter) {
    for (const a of iter) {
        if(isIterable(a) && typeof a != 'string') yield* f(a);
        else yield a;
    }
}

L.flatMap = curry(pipe(L.map, L.flatten))

export const map = curry(pipe(L.map, takeAll))

export const filter = curry(pipe(L.filter, takeAll))

export const find = curry((f, iter)=> go(
    iter,
    L.filter(f),
    take(1),
    ([a])=> a
))

export const flatten = pipe(L.flatten, takeAll);
export const flatMap = curry(pipe(L.map, flatten))

export const add = (a, b) => a + b;

export const range = l => {
    let i  = -1;
    let res = []
    while (++i< l) {
        res.push(i)
    }
    return res;
}

export const C = {}

export function noop() {}

const catchNoop = ([...arr]) => 
    (arr.forEach(a => a instanceof Promise ? a.catch(noop) : a), arr);

C.reduce = curry((f, acc, iter) => iter ?
    reduce(f, acc, catchNoop(iter)) :
    reduce(f,catchNoop(acc))
)

C.take = curry((l, iter) => take(l, catchNoop(iter)))

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.filter, C.takeAll))

// ## curry 사용하기
console.log('## curry 사용하기')
const minus = curry((a, b) => a - b)
console.log('minus 1', minus(10, 5)) // 5
console.log('minus 2', minus(10)) // 함수 출력
console.log('minus 3' , minus(10)(5)) // 5

// console.clear();

// ## isIterable 사용하기
console.log('## isIterable 사용하기')
console.log('isIterable 1', isIterable(1)) // false
console.log('isIterable 2', isIterable([1,2,3])) // true

// console.clear();

// ## go1 사용하기
console.log('## go1 사용하기')
console.log('go1 1', go1(10, a => a * a)) // 100
console.log('go1 2', go1(Promise.resolve(10), a => a * a)) // Promose<pending>
console.log('go1 2', go1(Promise.reject('error'))) // Promose<pending> with Uncaught (in promise) error

// console.clear();

// ## reduceF 사용하기
console.log('## reduceF 사용하기')
console.log('reduceF 1', reduceF(1, 2, (a, b)=> a + b)) // 3
// value가 Promise인 경우
console.log('reduceF 2', reduceF(1, Promise.resolve(2), (a, b)=> a + b))
// acc가 Promise인 경우 
//  - 이런 경우가 존재하는가? acc는 동기, 비동기의 평가 결과 값이므로, Promise가 될 수 없다고 생각한다.
console.log('reduceF 3', reduceF(Promise.resolve(1), 2, (a, b) => a+ b)) // [object Promise]2
// 만약 acc가 Promise라면? 
// 또는 각각의 인자가 Promise인 경우 어떻게 합성할 수 있는가? 
//  - Promise.all 또는 Promise.race 또는 Promise.allSettled 통해서, 두 개 이상의 Promise를 합성할 수 있다.

// console.clear();

// ## redcue 사용하기
console.log('## redcue 사용하기')
console.log('reduce 1', reduce((a, b) => a + b, [1,2,3,4,5])) // 15

// console.clear();

// reduce 2
//  - 잘못된 reduce 사용 예시이다.
//      - 문법적으로 평가가 제대로 안됨. 
//      - 즉 reduce( (a, b) => a + b)와 [Promise.resolve(1), ...]이 별도로 평가 됨.
console.log('reduce 2', reduce((a, b) => a + b), [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]) // (..._) => f(a, ..._) [promise<fullfiled> :1, promise<fullfield>: 2, promise<fullfiled> :3]

// reduce 3
//  - 코드 분석 핵심1 : acc가 Promise이면서 동시에, iter의 value가 Promise이다.
//      - 두 Promise 간 합성이 reduce 함수 내부의 reduceF에서 어떻게 이루어지는지 파악한다.
//      - redcue의 보조함수의 인자에는 Promise가 풀린 값이 들어간다. 
//  - 코드 분석 핵심2 : reduce 내부에서 이터레이터가 Promise인 경우, Promise가 then으로 이행 된 후, 재귀적으로 recur 함수를 호출한다. 
console.log('reduce 3', reduce((a, b) => { 
    console.log('   a, b', a, b) // 프로미스가 풀린 값이 출력된다.
    return a + b
}, [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])) // Promise<pending> : 6