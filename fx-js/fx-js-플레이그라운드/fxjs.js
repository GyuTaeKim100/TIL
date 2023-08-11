// 직접 fxjs 인프런 기본편 강의 최종 코드를 타이핑함.
// 실제 코드 구동 테스트 및 기능 이해를 위한 플레이그라운드이다.

export const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const isIterable = a => a && a[Symbol.iterator];

export const go1 = (a, f) => a instanceof Promise ? a.then(f) : f(a);

const reduceF = (acc, a, f) => 
    a instanceof Promise ?
        a.then(a => f(acc, a), e => e === nop ? acc: Promise.reject(e)) :
        f(acc, a);

export const head = iter => go1(take(1, iter), ([h])=> h)

export const reduce = curry((f, acc, iter)=> {
    if(!iter) return reduce(f, head(iter = acc[Symbol.iterator]()), iter)

    iter = iter[Symbol.iterator]();
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

// curry 사용하기
const minus = curry((a, b) => a - b)
console.log('minus 1', minus(10, 5)) // 5
console.log('minus 2', minus(10)) // 함수 출력
console.log('minus 3' , minus(10)(5)) // 5
// console.clear()

// isIterable 사용하기
console.log('isIterable 1', isIterable(1)) // false
console.log('isIterable 1', isIterable([1,2,3])) // true