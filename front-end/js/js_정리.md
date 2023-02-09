# 자바스크립트 자주 하는 실수

- es6
  - 업계 표준
  - 먼저 공부하자
  - 설탕 문법 많다
- es5
  - 내부 구조 공부 시 좋다
  - es6의 원형을 알 수 있다

### 자바스크립트의 현재와 미래

1. ES6는 없다(?)
    - ECMAScript 6th edition부터는 연도 표기
    - 2015년부터 해마다 새 명세가 갱신
    - 보통 'ES6'라고 하면 'ES6와 그 이후'를 의미

2. ESM으로의 전환

- Common.JS, AMD가 ESM으로 전환될 것
- `<script>` 태그도 ESM을 지원함
- 예) CommonJS (과거 NodeJS)

    ```
        var $ = require('jquery')
        exports.myExample = function() {}
    ```

- 예) ESM

    ```
        import $ from 'jquery'
        export function myExample {}
    ```

- 예) 웹 브라우저 모듈

    ```
        <script type="module">
            import {feature} from 'module-name'
            feature()
        </script>
    ```

- 자바스크립트 미래 (정확한 예측 불가)
  - JS 10년 주기설에 의하면 올해가 3번째 주기 시작
  - 브라우저, Node 발전에 따라 트랜스파일러의 필요성 하락
  - JS가 아닌 JS:TS, WebASM, Rust 등
  - 새로운 번들러 등장 : Webpack의 독주는 언제까지?

### 일반적인 UI 브라우저 병목현상 (js 속도가 크게 중요하지 않을 것으로 추측)

- (게임 3D 제외)
- backend
- browser 자체에서
- file 크기
- cache 정책

### 브라우저에 새 언어가 네이티브로 지원 시 JS는 긴장이 필요한 시기일 것이다. (대체 가능성)

### 어휘적 환경 lexical environment

- 정의
  - 변수나 함수 등의 식별자를 정의할 떄 사용되는 명세
  - 중첩된 어휘적 환경에 기반해 동작
  - Environment Record와 outer 속성을 포함
- 관련 문법
  - 함수 선언 function declaration
  - 블럭문 block statement
  - Try~Catch문의 Catch 절
- 종류
  - 전역 환경 global environment
  - 모듈 환경 module environment
    - 개개 파일(import, require)에 대한
  - 함수 환경 function enviroment

### 실행 컨텍스트 Excution Context

- 정의
  - 자바스크립트 코드가 실행되는 환경
  - 모든 JS 코드는 실행 컨텍스트 내부에서 실행된다.
- 종류
  - 전역 실행 컨텍스트 global excution context
  - 함수 실행 컨텍스트 functional excution context
  - eval 함수 실행 컨텍스트 eval function excution context
    - 필요성 없다. 쓰지말자.

### 어휘적 범위 Lexical Scope

- 같은 범위 혹은 그 보다 안쪽의 코드에서 바깥 영역에는 접근할 수 있지만 그 역은 성립하지 않는다.
- 범위의 구분
  - 함수 선언
  - 블럭문 (if, for, while), Try-Catch의 catch 절
- 예

    ```
        function hello() {
            {
            const greeting = '안녕하세요';
            }
            console.log(gretting)
        }
        hello();
    ```

### 클로저 Closure

- 처음 만들어 질 때의 어휘적 범위를 그대로 유지한 함수
- 어휘적 범위 바깥에서 해당 범위에 접근할 수 있다.

    ```
        function hello() {
            const greeting = '안녕하세요';

            return function() {
                console.log(greeting)
            }
        }

        const say = hello();
        say(); // greeting 출력
    ```

### 엄격한 모드 stric mode

- 진입 방법
  - use strict : 전역 영역, 함수 내에 표기
  - ES2015 모듈 사용 (자동 적용)
- 일반 모드와 차이
  - 조용한 에러(에러 출력안하면서 무시) 대신 명시적으로 에러 발생
  - JS 엔진 최적화를 어렵게하는 실수 방지
  - 향수 ES2015에 포함될 예약어/문법 대비
- 엄격한 모드 외의 엄격함
  - JS의 이상한 동작은 독특한 형변환도 원인
  - 일치 연산자 === 사용 습관화
  - 명시적 형변환 활용

### 비동기 자바스크립트 Asyncronous JavaScript

- 비동기 처리는 필연
  - 기능 대부분을 외부 API에 의존하고 있기 때문
  - 외부 API를 호출하고 결과를 콜백으로 전달받음
    - addEventListener, ...
- 자바스크립트의 동작 원리
  - 자바스크립트는 싱글 스레드 언어
  - 이벤트 루프와 스택을 통해 스케줄링
  - UI 업데이트, 사용자 이벤트를 모두 같은 스레드로 처리
    - callstack이 오랫동안 안 비면 UI가 버벅이는 현상 발생, 함수 하나하나를 잚게 쪼갠다.
- 콜백 지옥은 해결된 문제
  - 더 우아한 비동기 처리 방법 : Promise, async, await
  - 함수 분리 등의 코딩 패턴 적용
  
### 이벤트 루프 Event loop

- 자바스크립트의 동시성 concurrentcy 처리 모델의 기본 원리
- 구조
  - memory heap
    - 여러 객체 값 저장
    - 메모리 직접 관리, 액세스가 상대적으로 느림
    - 메모리는 자동 관리
  - call stack
    - 함수 하나당 Frame (1개당 실행 콘텍스트)
  - Queue (이벤트 큐)
    - Message가 있는지 event loop에서 확인
    - Message 처리를 통해 동기식 처리
    - 단 콜스텍이 비어있을 때만 작동

### ES6 제너레이터를 사용한 비동기 프로그래밍

- 일종의 코루틴이다.
  > 코루틴 설명 (<https://en.wikipedia.org/wiki/Coroutine>)
  - 제너레이터가 코루틴과 다른점은 멈출 때 돌아갈 위치를 지정할 수 없다.
  - 세미 코루틴이다.
    - 제너레이터는 단지 호출자에게 제어권을 반환하게 된다.
    - 이터레이터 next() 함수가 호출 될 때 마다, 이터레이터 내 호출되는 위치로 제어권을 넘겨주고, 그 결과를 반환받는다. (즉 제너레이터와 호출자를 통해서 상호간 제어권 뿐만 아니라, 데이터까지 주고 받을 수 있다.)
    - 제너레이터 함수 내부에서는 콜백 또는 프로미스를 사용하지 않으면서도, 비동기적으로 데이터를 주고받으며 실행되고 있다. (비동기를 보다 동기적으로 처리할 수 있는 인상을 줌.)

```
 function* myGen() {
  const x = yield 1; // x = 10
  const y = yield x + 1 // y = 20
   const z = yield y + 2 // z = 30
  Return x + y + z;
 }

 const myItr = myGen();
 console.log(myItr.next()); // {value: 1, done: false}
 console.log(myItr.next(10)); // {value: 11, done: false }
 console.log(myItr.next(20)); // {value: 22, done: false }
 console.log(myItr.next(30)); // {value: 60, done: true }
```

- 콜백헬 문제점
  > 콜백헬 발생은 연속적 전달식(CPS)에 의해서 이다. (CPS : <https://en.wikipedia.org/wiki/Continuation-passing_style>)
  - 가독성  외에, 중요한 문제는 콜백함수를 다른 함수로 전달하는 순간, 그 콜백함수에 대한 제어권을 잃는다.
    - 즉, 내가 제공한 콜백이 언제 실행되는지, 몇 번 실행되는지 등에 대해 추적이 불가능한다. (추적이 불가능함에 의한 콜백에 대한 신뢰도가 적다는 의미 또한 내포한다.)
    - Callback 횟수가 많아질 수록, 프로그램이 예측이 더 어렵고, 에러가 발생하기 쉽고, 디버깅 또한 어렵다.
  - 의문
    - 콜백은 재귀가 되는가?
    - 콜백 후 콜백 외부에서 콜백 실행 완료 여부를 확인할 수 있는가?
      - 이를 제너레이터 문법으로 제어권을 호출한 지점으로 리턴하는 방식으로 실현 가능함.
      - 제너레이터 외 다른 방법은 없는가?
- 프로미스 문제점 (정리가 덜됨.)
  - 체이닝에 의한 순차적으로 의존성을 가지면서 실행하지 않는 경우에는, 치명적인 단점이다.
    - Promise 체이닝에 대한 낮은 이해도는 불필요한 중첩 프로미스 체이닝과 이로 인한 문제점이 생긴다. (자세한 내용은 MDN 프로미스 문제점 참고)

```
 // Tip: Arrow 함수를 쓰면 보다 가독성이 향상됨.
 function orderCoffee(phoneNumber) {
    return getId(phoneNumber)
      .then(id => getEmail(id))
      .then(email => getName(email))
      .then(name => order(name, "coffee"));
  }
```

- 예시 (나쁜), 제너레이터 적용 (정리가 덜 됨)
  - iterator.next()가 비동기 함수 내부에서 호출되므로, 이터레이터를 범용적으로 사용할 수 없다.
    - 제너레이터가 본인의 제어권을 상실했다.

```
  function* orderCoffee(phoneNumber) {
    const id = yield getId(phoneNumber);
    const email = yield getEmail(id);
    const name = yield getName(email);
    const result = yield order(name, "coffee");
    return result;
  }

  const iterator = orderCoffee("010-1234-1234");
   iterator.next();

   function getId(phoneNumber) {
     // …
     iterator.next(result);
   }

   function getEmail(id) {
     // …
     iterator.next(result);
   }

   function getName(email) {
     // …
     iterator.next(result);
   }
  
   function order(name, menu) {
     // …
     iterator.next(result);
   }

```

- 예시, 제너레이터와 프라미스의 만남
  - 결과적으로 각각의 함수에서 제너레이터를 의존하지 않으면서도, 외부에서 제너레이터 제어가 가능하다.
  - 제너레이터를 활용해서 비동기 코드를 동기식 코드인 것처럼 작성할 수 있게 되었다.

```

  function getId(phoneNumber) {
   return 프로미스
  }

  function getEmail(id) {
   return 프로미스
  }

  function getEmail(id) {
   return 프로미스
  }

  function getName(email) {
    return 프로미스
  }

  function order(name, menu) {
    return 프로미스
  }

  function* orderCoffee(phoneNumber) {
    // 장점으로 id, email, name, result 모두 함수 내에 캡슐화되어서 관리가 됨.
    const id = yield getId(phoneNumber);
    const email = yield getEmail(id);
    const name = yield getName(email);
    const result = yield order(name, "coffee");
    return result;
  }

  const iterator = orderCoffee(“010-1234-5678”);
  let ret;

  (function runNext(val) {
    // var은 프로미스가 전달됨.
    // 최초 실행 시, val은 undefined?
    ret = iterator.next(val);

    if(!ret.done) {
     ret.value.then(runNext);  
    } else {
     console.log(“result : ” , ret.value):
    }
})();
```

- co 라이브러리
  - 제너레이터를 쉽게 사용할 수 있는 편리한 두 함수를 제공한다.
  - 참고
    - <https://github.com/tj/co>
- 과거 koa
  - koa-router는 특정 URL을 핸들링 할 때, 제너레이터가 사용 가능하다.
    - koa가 제너레이터를 기반으로 미들웨어에 대한 제어를 하므로, 개발자는 yield만으로 비동기를 동기처럼 처리가 가능하다.

```
  router.post("/login", function*() {
    const { email, password } = this.request.body;
    const user = yield userDB.get(email);
    const valid = yield crypter.compare(password, user.password);
    //  …
  });

```

- 비동기의 동기처럼 순차적으로 처리의 끝판왕은 async/await

- 참고
  - <https://ui.toast.com/weekly-pick/ko_20160408>
