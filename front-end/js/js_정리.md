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
   -  함수 선언
   -  블럭문 (if, for, while), Try-Catch의 catch 절
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
   -  use strict : 전역 영역, 함수 내에 표기
   -  ES2015 모듈 사용 (자동 적용)
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
   -  memory heap
      - 여러 객체 값 저장
      - 메모리 직접 관리, 액세스가 상대적으로 느림
      - 메모리는 자동 관리
   -  call stack
      -  함수 하나당 Frame (1개당 실행 콘텍스트)
   - Queue (이벤트 큐)
     - Message가 있는지 event loop에서 확인
     - Message 처리를 통해 동기식 처리
     - 단 콜스텍이 비어있을 때만 작동
     
### Promise, async, await
 - Promise : 비동기 처리를 위한 객체
   - 세 가지 상태: 대기(pending), 이행(fulfilled), 거부(rejected)
   - 비동기 처리 후 뒤의 두 가지 상태 반환
   - 성공시 .then() / 실패시 .then() 또는 catch()
   - 한 번 상태가 결정된 Promise의 상태는 변경 불가
   - Promise.resolve, Promise.reject는 상태가 결정된 Promise 반환
   - Promise의 정적 메소드를 통해 다중 Promise 처리
 - async/await : 보다 편리한 비동기 처리
   - async 함수는 항상 promise를 반환한다.
   - async 함수에서 성공은 return, 실패는 에러를 throw한다.
   - await와 함께 비동기 함수를 실행하면 마치 동기식인 듯 동작한다.
 - 차이점
   - ?