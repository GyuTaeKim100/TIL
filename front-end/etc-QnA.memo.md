## 1. 개발자 Chrome은 일반 사용자 Chrome과 무슨 차이?

## 2. firefox 개발자 에디션 vs 개발자 Chrome

## React document / 주요 개념

### 2. JSX 소개

- JSX
  - React Element 생성
  - 에러 및 경고 메시지를 표시할 수 있게 해줌.
  - HTML보다 Javascript에 가까움
    - React DOM은 HTML 어트리뷰트 이름 대신 camelCase 프로퍼티 명명 규칙을 사용. 예) class -> className, tableindex -> tableIndex
  - 주입 공격을방지
    - 의문: 주입 공격?
      - XSS (cross-site-scripting)
        - https://nordvpn.com/ko/blog/xss-attack/
    - React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 함. 명시적으로 작성되지 않은 내용은 주입되지 않음.
    -
- UI 로직
  - 이벤트가 처리되는 방식
  - 시간에 따라 state가 변하는 방식
  - 화면에 표시하기 위해 데이터가 준비되는 방식 등
- React는 마크업과 로직을 별도의 파일로 분리하는 대신, 둘다를 포함하는 컴포넌트라고 부르는 느슨하게 연결된 유닛으로 관심사를 분리

### 3. 엘리먼트 렌더링

- 예시
  ```
   const element = <h1>Hello, world</h1>;
  ```
- 엘리먼트 특징
  - 브라우저 DOM 엘리먼트와 달리, React 엘리먼트는 일반 객체이며(plian object) 쉽게 생성할 수 있다.
  - React DOM은 react 엘리먼트와 일치하도록 브라우저 DOM을 업데이트한다.
  - 엘리먼트는 컴포넌트의 구성요소이다.
  - 불변 객체이다.
    - 엘리먼트 생성 이후, 해당 엘리먼트의 자식이나 속성을 변경 할 수 없음.
  - 엘리먼트는 영화에서 하나의 프레임과 같이 특정 시점의 UI를 보여줌. (엘리먼트 트리 개념 또한 동일)
  - UI를 업데이트하는 유일한 방법은 새로운 엘리먼트를 생성하고, 이를 ReactDOM.render()로 전달하는 것
- React DOM 특징
  - 모든 엘리먼트를 관리
  - React로 구현된 애플리케이션은 일반적으로 하나의 루트 DOM 노드가 있음.
  - ReactDOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는 데 필요한 경우에만 DOM을 업데이트한다.
  - React DOM은 내용이 변경된 노드만 업데이트 한다.
  - 실제로 대부분 React 앱은 ReactDOM.render()를 한 번만 호출한다.
- React DOM, React element 목적
  - 시간의 변화에 따라 UI가 어떻게 변화될 지 고민하는 것보다 더 많은 수의 버그를 없앨 수 있다.
  - 즉 선언형 엘레먼트 트리를 생성하고, 이전의 엘리먼트 트리와 이후의 엘리먼트 트리를 비교해 변경된 트리의 노드만 업데이트 한다.

### 4.Component와 Props

- Props

  - 속성을 나타내는 데이터
  - 읽기 전용

- 순수함수
  - 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환
- Component 특징
  - React 엘리먼트를 반환
  - 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 함.
  - 이름은 항상 대문자
    - 규칙에 대한 자세한 내용 : https://ko.reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized
- 컴포넌트 합성
  - 컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있음. 이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미.

### 5.State와 생명주기

- state

  - props와 유사하지만, 비공개이며 컴포넌트에 의해 완전히 제어됨.

- 생명주기 메서드
  - 생성자
  - 마운팅
    - 처음 DOM에 렌더링 될 때
  - 언마운팅
    - DOM이 삭제 될 때
  - 의문: 생성자와 마운팅의 차이?
- state를 올바르게 사용하기

  - 직접 State를 수정하지 마세요.

    - ```
        // Wrong
        this.state.comment= 'Hello'; // 다시 렌더링 하지 않음

        // Correct
        this.setState({comment: 'Hello'});
      ```

    - this.state를 지정할 수 있는 유일한 공간은 바로 constructor 임.

  - State 업데이튼 비동기적일 수 있음.

    - React는 성능을 위해 여러 setState() 호출을 단일 업데이트로 한꺼번에 처리할 수 있음.
    - this.props와 this.state가 비동기적으로 업데이트 될 수 있음

      - ```
          // Wrong
          this.setState({
            counter: this.state.counter + this.sprops.increment
          });

          // Correct
          // @param state: 이전 state
          // @param props: 업데이트가 적용된 시점의 props
          // 의문 : hook에서는?
          this.setState((state, props) => ({
            counter: state.counter + props.increment
          }));
        ```

- 데이터는 아래로 흐름.
- 부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없음.
- 로컬 또는 캡슐화. state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에 접근할 수 없음.
- 컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있음.
- 하향식(top-down) 또는 단방향식 데이터 흐름
- state는 항상 특정한 컴포넌트가 소유하고, 그 state로 부터 파생된 UI 또는 데이터는 오직 트리구조에서 자신의 아래에 있는 컴포넌트에만 영향을 미친다.
- 트리구조가 props들의 폭포라고 한다면, 각 컴포넌트의 state는 임의의 점에서 만나지만 동시에 아래로 흐르는 부가적인 수원(water source)라고 할 수 있음.

### 6. 이벤트 처리하기

- html 이벤트 처리와 다른 점
  - React는 html 처럼 false를 반환해도 기본 동작을 방지할 수 없음. preventDefault를 명시적으로 호출해야 함.
- e
  - 합성 이벤트
  - W3C 명세에 따라 합성 이벤트를 정의하므로, 브라우저 호환성에 문제 없음.
  - 의문: 단 브라우저 고유 이벤트와 정확히 동일하게 동작하지 않음.
    - 자세한 사항은 합성 이벤트 섹션 참고

### 7. 리스트와 Key

- Key
  - React가 어떤 항목을 변경, 추가 또는 삭제 할지 식별하는 것을 돕는다.
  - 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 함.
  - Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용. 예시로 데이터의 ID
  - 리스트의 항목에 명시적으로 key를 지정하지 않으면 React는 기본적으로 인덱스를 key로 사용함.
  - key는 형제 사이에서만 고유한 값이어야 한다. 전체 범위에서 고유할 필요는 없음.
  - 항목의 순서가 바뀔 수 있는 경우 Key에 인덱스를 사용하는 것은 권장하지 않음.
    - 성능 저하 또는 컴포넌트의 state와 관련된 문제가 발생할 수 있음.
    - 참고
      - https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

### 8. 폼

- 제어 컴포넌트 기술 (Controlled Component)

  - HTML에서 `<input>`, `<textarea>`, `<select>`와 같은 폼 엘리먼트는 일반적으로 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트 함.
  - React에서는 변경 할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며, setState()에 의해 업데이트 됨.
  - React State를 신뢰 가능한 단일 출처(single source of truth)로 만들어 두 요소를 결합할 수 있음. 그러면 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어한다. 이러한 방식으로 *React에 의해 값이 제어되는 입력 폼 엘리먼트를 제어 컴포넌트*라고 함.
  - 다중 입력 제어하기

    - ```
        constructor(props) {
          super(props);
          this.state = {
            isGoing: true,
            numberOfGuests: 2
          }
        }


        handleInputChange(event) {
          const target = event.target;
          const value = event.type ==='checkbox' ? target.checked : target.value;
          const name = target.name
          this.setState({
            [name] : value
          })
        }

        render () {
          return (
            <form>
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.handleInputChange}
              />
              <input
                name="numberOfGuests"
                type="number"
                value={this.state.numberOfGuests}
                onChange={this.handleInputChange}
              />
            </form>
          )

        }
      ```

  - 제어되는 Input Null 값
    - 제어 컴포넌트에 value prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없음.
    - value를 설정헀는데, 여전히 수정이 가능하다면 value를 undefined 또는 null로 설정했을 수 있음.
  - 제어 컴포넌트의 대안
    - 제어 컴포넌트는 데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고, React 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하는 게 지루 할 수 있음.
    - 폼 구현하기 위한 대체 기술인 비제어 컴포넌트가 존재
      - 의문: 비제어 컴포넌트? 어떻게 폼 구현을 대체?
  - 완전한 해결책
    - react hook form, formik

### 10. State 끌어올리기

- state를 동기화 시키려고 노력하는 대신 하향식 데이터 흐름을 추천
- state를 끌어올리는 작업
  - 단점
    - 양방향 바인딩 접근 방식보다 더 많은 "보일러 플레이트" 코드를 유발
      - 의문: 예시 필요, 양방향 바인딩 예시 또한 필요
  - 장점
    - 버그를 찾고 격리하기 더 쉽게 만듬.
      - React Developer Tools 사용을 추천
    - 어떤 state든 특정 컴포넌트 안에 존재하기 마련이고, 그 컴포넌트가 자신의 state를 스스로 변경할 수 있으므로 버그가 존재할 수 있는 범위가 크게 줄어듬.
    - 사용자의 입력을 거부하거나 변형하는 자체 로직을 구현할 수도 있음.
      - 예시로 어떤 값이 props 또느 state로 부터 계산될 수 있다면,그 값을 직접적으로 state로 두지 말고 최근에 변경된 원천 값만 state로 한다. 즉 render() 메서드 안에서 원천 값을 통해서 추가적인 계산을 진행한다.

### 11. 합성 (Composition) vs 상속 (Inheritance)

- 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용하는 것이 좋음.
- 컴포넌트에 다른 컴포넌트 담기
  - 특정 컴포넌트는 어떤 자식 컴포넌트가 올 지 알 수 없음.
  - React 엘리먼트는 단지 객체이므로, prop으로 전달 가능
- 특수화
  - 더 구체적인 컴포넌트가 일반적인 컴포넌트를 렌더링하고 props를 통해 내용을 구성한다.
- 상속은?
  - 상속 계층 구조로 작성을 권장할 만한 사례를 아직 찾지 못함.
  - props와 합성은 명시적이고 안전한 방법으로 컴포넌트의 모양과 동작을 커스터아미징하는데 필요한 모든 유연성을 제공.
  - 만약 UI가 아닌 기능을 여러 컴포넌트에서 재사용하기를 원한다면, 별도의 Javascript 모듈로 분리하는 것이 좋음. 컴포넌트에서 해당 함수, 객체, 클래스 등을 import 하여 사용할 수 있음. (상속받을 필요 없이)

## react document / HOC 고차 컴포넌트

- HOC (Higher Order Component)
- 컴포넌트 로직을 재사용하기 위한 React의 고급 기술
- React API의 일부가 아닌, React의 구성적 특성에서 나오는 패턴
- 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수이다.
- 컴포넌트는 props를 UI로 변환하는 반면, 고차 컴포넌트는 컴포넌트를 새로운 컴포넌트로 변환
- 예시, Redux connect
- 횡단 관심사 (Cross-Cutting Concerns)에서 고차 컴포넌트 사용하기
  - mixin을 권장하지 않음.
    - 이유 : https://ko.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html
  -

## react document / hook

- 컴포넌트 사이에서 상태 로직을 재사용하기 어렵다.
- class 기반에서는 render props, 고차 컴포넌트 같은 패턴을 활용
  - 의문: 고차 컴포넌트?

## reference

- React overview
  - https://ko.reactjs.org/docs/react-api.html
- Rect.PureComponent https://velog.io/@dolarge/Pure-Component%EB%9E%80

## React Fiber

1. We call these operations “side effects” (or “effects” for short) because they can affect other components and can’t be done during rendering.
   - can't be done during rendering?
2. stack frame을 수동으로 처리하면 스케줄링뿐만 아니라 concurrency 및 error boundary와 같은 기능들에 대한 잠재력을 확보할 수 있다.
   - error boundary 는 어떤?
   - concurrency는 어떤? react concurrentcy?
3. fiber Node?
4. React의 Element와 React Fiber Node는 1:1로 대응된다. 하나의 엘리먼트를 렌더링하는것을 하나의 작은 단위인 Fiber로 맵핑시킨것이다.

   - React element?
   - React element와 React DOM의 관계는?
   - React DOM element 와 Component element 차이?
   - DOM element는 `<button>`, Component element는 `<Button >`

5. current fiber, in progress fiber 두종류가 있는데 현재 피버는 이미 렌더링 된 것을 나타내고 진행중인 fiber는 현재 스택 프레임을 차지하며 렌더링이 진행중인 fiber를 나타낸다.

6. stack을 다시 구현할 때 장점은 stack 프레임을 메모리에 유지하고 언제든지 원하는대로 실행할 수 있다는 점입니다. 이건 우리의 목표를 달성하는데 중요합니다.
   - ?
7. 스케줄링 외에도 stack 프레임을 수동으로 처리하면 동시성 및 오류 경계와 같은 잠재적인 문제가 발생할 수 있습니다. 향후 섹션에선 이것에 대해 다룹니다.
   - ?
8. output - React 애플리케이션의 leaf 노드입니다. 렌더링 환경에 따라 노드는 달라질 수 있습니다(브라우저에서는 div, span 등). JSX에서는 소문자 태그 이름을 사용합니다.
   개념적으로 fiber의 출력물은 함수의 반환 값입니다. 모든 fiber는 결국 출력물을 가지긴 하지만, 실제 출력물은 호스트 컴포넌트의 leaf 노드에서만 생성됩니다. 그 다음 출력물은 트리의 위로 전달됩니다.

   - ?

9. completeWork와 completeUnitOfWork의 차이점?

## reference

- https://velog.io/@jangws/React-Fiber#react-fiber
- https://medium.com/@bendtherules/exploring-react-fiber-tree-20cbf62fe808
- https://simsimjae.tistory.com/473
- https://bumkeyy.gitbook.io/bumkeyy-code/frontend/a-deep-dive-into-react-fiber-internals
- https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree
- React.memo() 현명하게 사용하기
  - https://ui.toast.com/weekly-pick/ko_20190731

7. memoization & cache
   - https://medium.com/@soyoung823/memoization-cache-f8b5930e3ee1

## React Memo

- useMemo와 React.memo 차이점
  - https://sustainable-dev.tistory.com/137
- useCallback과 memo의 차이점
  - useCallback은 함수 재생성을 최소화, 함수를 props로 넘기는 경우 props가 변경되면서 rerender 시키는 부분을 최소화
  - useMemo는 함수의 연산량이 많을 때 이전 결과값을 재사용, useCallbakc은 함수가 재생성되는 것을 방지. (먼 차이?)
  - useMemo는 모든 값을 캐싱할 수 있다.(불확실) memo는 컴포넌트를 감싸서 props가 바뀌었을 때만 리렌더링
- useMemo, useCallback cache size?
- useMemo와 useCallback 차이점?
  - useMemo는 함수 return 값이 memorizaed, useCallback 함수 자체가 memorized
  -
- caching과 memoization은 다르다. memoization은 최적화 개념.
- React.memo는 Fiber Node를 최대 2개만 생성?
- React.memo 사용 권장
  - Pure Functional Component
  - Rendering이 자주 일어나느 경우
  - re-rendering이 되는 동안 계속 props 값이 전달 될 경우
  - UI element의 양이 많은 컴포넌트의 경우
- caching과 memoization 차이점
  - memoization은 동적 계획법..
- react-table에서 React.memo 사용 노하우
- useMemo 시 소비되는 resource? cache에 대한?
- react-table viertualize는 어떻게 작동? (구체적 작동)
- react-table scroll 지원?

## table

- react-virtualized
- row는 purecomponent
  - 즉, PureComponent는 현재 state, props와 바뀔 state, props를 비교하여 업데이트 여부를 결정하게 되는 것이다.
- table windowing 기법
  - 목록을 가상화 하는 기법
  - 사용자에게 실제로 보이지 않는 컴포넌트는 렌더링하지 않고 영역만 차지하고 있다가 스크롤되면 그 스크롤 위치에 있는 커모넌트만 렌더링 하여 보여주는 방식
  - react 공식 문서에서도 windowing 기법 추천
  - 대표적인 windowing 라이브러리로는 react-window, react-virtualized
    - 두 라이브러리 차이?
  - react-table + react-window 예제
    - https://codesandbox.io/s/576ul?file=/src/App.js:939-953
- react table - headeless 철학
  - https://www.merrickchristensen.com/articles/headless-user-interface-components/

## reference

- https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree
- React.memo() 현명하게 사용하기
  - https://ui.toast.com/weekly-pick/ko_20190731
- memoization & cache

  - https://medium.com/@soyoung823/memoization-cache-f8b5930e3ee1

- table virtualized https://velog.io/@kimjh96/react-virtualized-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94

- react-table with react-window

  - https://codesandbox.io/s/576ul?file=/src/App.js
    - table row가 10만개임.
    - 초기 렌더링 빠름, Re Rendering 또한 빠름

- ## react도 tabulation이 가능할까?

## react virtualized

- https://bvaughn.github.io/react-virtualized/#/components/List
