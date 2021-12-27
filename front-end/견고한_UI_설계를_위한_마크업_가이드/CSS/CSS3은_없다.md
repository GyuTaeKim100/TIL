# css3는 없다.
 - 각 기능별 모듈만 존재
 - there will never be a css4 -Tab Atkins
 - 통합된 명세 존재x, 모듈별 명세만 존재
 - 모듈 명세
   -  Selectors Level 3
   -  CSS transforms Module Level 1
   -  CSS Grid Layout Module Level 2

## CSS 명세가 방대해졌다.
 - 2020년 9월 현재, 전체 CSS 프로퍼티 533개
 - 주요 개념과 자주 사용하는 속성 먼저 공부
   - 참고
     - chrome platform status/ css usage / all properties / stack rank

## 레이아웃
 - 기본 개념
   - 크기와 위치
 - CSS Box Model
   - CSS 레이아웃의 기본 원리
   - 엘리먼트의 크기를 정하는 표준
   - box-sizing 속성으로 크기 계산 방식 변경 가능
 - 구성
   - margin
   - padding
   - content
   - width
   - height
 - box-sizing
   - 기본 상태(box-sizing:content-box) 시 width, height 시 content 크기 설정
     - padding, border에 의해 박스 크기가 커진다
   - box-sizing:border-box 시 width, height 시 border 까지 포함
 - flexbox
   - 편리한 레이아웃 작성을 위해 추가된 명세
   - 부모/자식/자식들 사이의 관계를 직관적으로 정의
   - IE도 10부터 제한적 지원
     - 레거시 코드는 float을 사용

## 성배 레이아웃 holy grail layout
 - 헤더, 푸더, 콘텐츠, 사이드(양옆)
 - 예)
   - content 높이가 유동적인 경우 
     - float 시 side 높이가 같이 높아지지 않음
   - 전체 페이지의 높이가 웹브라우저의 view port 높이보다 짧으면 footer 아래가 비어 보임
     - 꼼수 (당시 레거시의 기술적 한계)
        1. table tag 사용하여 layout 만듬. 하지만 현재는 안그럼
         - html 의미 어긋, 성능 문제 존재, 접근성 문제(헤더와 사이드부터 접근 함)
        2. absoulte position 사용
          - footer와 header를 제일 위와 제일 아래에 가득 채워서 설정
          - content 영역 크기는 항상 정해져 있다,.
        3. js를 통해 inlinse style을 통하여 side bar 높이 설정
        4. 가짜 컬럼 사용
          - side 높이는 그대로 출력
          - 전체 영역에 이미지를 추가
          - side 높이 이외에는 전체 이미지가 출력 됨

## flex box를 통해 성배 레이아웃 해결

## flex box
 - flex container
   - display: flex or inline-flex
   - 속성
     - main axis 
       - 메인 축
       - flex-direction
         - flex-direction: row (글쓰기 방향과 일치)
     - writing -mode
     - 직교 축 cross axis
     - flex wrap
       - 넘치는 아이템에 대한 배치 규칙
       - main 축과 직교
 - flex item
   - flex container의 자식
   - 속성
     - order
       - flex item의 순서를 fix
       - html 상 순서와 상관없이 함
       - 접근성은 html의 순서가 중요


### Grid Layout
 - 1차원적인 flex box와 달리 2차원적인 구성
 - 성배 레이아웃은 필연적으로 중첩(x, y)이 필요하다.
 - 갤러리, 게시판 레이아웃은 격자무늬를 원해서 보통 table 형식을 사용함. flex는 한축만 독립적(다른 축에 영향을 받지 않음)으로 작동하여서 격자무늬에 적합하지 않음. => 그래서 Grid 사용
 - 표준이 계속 바뀌고 브라우저마다 명세가 다른 경우가 많다.

### 레이아웃 공부
 - flexbox froggy 
 - runlayout.com CSS레이아웃을 배웁시다.
   - 과거 방식 레이아웃.  

### 논리적 프로퍼티와 값 Logical properties and values
 - CSS Logical Properties and values module
   - 물리적인(physical) 프로퍼티나 값이 아닌 논리적인 프로퍼티와 값을 레이아웃을 다룰 수 있게 하는 표준
   - inline 과 block
     - inline : 텍스트 쓰기 방향
     - block : 텍스트 쓰기 방향에 수직
    - 용어의 변화
      - size : width나 height 대신 사용
      - start : 텍스트 흐름의 시작 위치
      - end : 텍스트 흐름의 끝 위치
  - 참고
    - W3C CSS Logical Properties and Values Level 1 문서 
  - 예
    ```
      .container {
        background: #ffa;
        margin: 10px;
      }

      .text {
        display: inline-block;
        background: red;
        color: #fff;
        margin-block-start: 20px;
      }
    ```

    - 사용 이유
      - 다양한 언어를 지원시 (다국어)
    - 최신 브라우저에서 지원

### css 구조 정리
  - 예시
    ```
      h1, h2, div{
        background-color:blue;
        font-size: 12px;
      }
    ```
    - 규칙 Rule : 위 코드 전체
    - 선택자 : h1, h2, div
    - 속성 property : backgorund-color, font-size
    - 값 value : blue, 12px;
    - 선언 declaration : background-color:blue, font-size: 12px
    - 선언 블록 declaration block : { background-color: blue; font-size:12px; }

### 선택자 Selector
 - CSS Selector : 문서 트리의 엘리먼트를 찾는 패턴 표준
 - 엘리먼트 선택자 Element selectors
   - 타입 선택자 : HTML 태그 이름
     - 예: div, span, input, ...
   - 수도 엘리먼트 pseudo element : 문서 트리에 직접 존재 않지만 엘리먼트처럼 취급
     - 예: ::after, ::before, ::selection, ::placeholder, ...
   - 유니버설 선택자 : 모든 HTML 태그를 선택
     - 예: *
 - 속성 선택자 Attribute selectors
   - 아이디 선택자 id : 엘리먼트의 id 속성
     - 예: #main, #section-id
   - 클래스 선택자 class: 엘리먼트의 class 속성
     - 예: .header, .sidebar, .main-menu, ...
   - 수도 클래스 pseudo: 특정 정보나 상황에 의해 적용
     - 예: :hover, :visited, :focus, :is(), :not(), :lang(), ...
   - 속성 선택자 attribute: 엘리먼트의 모든 속성 
     - 예: `[href]`, `[class="example"]`, `[attr~="str]`, ... 

### 특정성 Specificity
 - 선택자가 얼마나 구체적인지 나타내는 정도. 더 구체적일수록 우선순위가 높다.
 - 우선순위
   - 인라인 스타일
   - 아이디 선택자
   - 클래스 선택자, 수도 클래스 선택자, 속성 선택자
   - 타입 선택자, 수도 엘리먼트 선택자
 - 유니버셜 선택자는 제외
 - 같은 속성을 바꿀 시 우선순위
 - 예
    ```
      div.class = 0 0 1 1
      div.class > * = 0 0 1 1
      div.class > * [title]:hover  = 0 0 3 1
      div.class > * [title]:hover #hello = 0 1 3 1
      div.class > * [title]:hover #hello = 0 1 3 1
      <div class="class" style="color:blue"> = 1 0 0 0
      <div class="class" style="color: !important blue"> = 1 1 0 0 0 // inline style 이김
    ```
  - !important 건드리지말자. 제거하고 특정성을 높이자.
  - 특정성 규칙을 엄격히 하자
    - BEM 그리고 SMACSS
    - BEM 
      ```
        .block {}
        .block__element {}
        .block--modifier {}
        .block__element--modifier {}
      ```
        - 단점 
          - 보기 길어짐
          - 널리 사용 안됨.
    - SMACSS의 state 표현 방식
      ```
        .button {
          background: silver;
          color:black;
        }

        .button.is-primary {
          background: blue;
          color:white;
        }
      ```
        - 단점
          - 규칙 복잡
          - BEM에 비해 널리 사용 안됨.
    - JS 안의 CSS
      - 공유하지 않으면 충돌도 없다.
        - class 이름을 랜덤하게 만듬
      - js 내 css 선언
      - 단점
        - js 코드가 약간 지저분해진다(?)

### 마진 병합 Margin collapsing
 - 수직 인접한 두 마진이 더 큰 쪽으로 병합되는 현상
 - 경우
   - 인접 형제 노드의 수직 마진은 병합된다.
     - 나중에 나타난 엘리먼트가 clear 되어야 하는 경우 제외
   - 부모와 자식의 인접한 수직 마진은 병합된다.
     - 단, 마진 사이에 다른 컨텐츠가 없어야 함
     - 예) 패딩, 보더 등
   - 빈 블럭의 수직 마진은 병합된다.
     - 한 블럭의 margin-top과 margin-bottom도 병합된다.
     - 두 마진을 분리할 높이, 패딩, 보더, 인라인, 컨텐츠가 없을 때 발생
 - 예
   - child margin이 parent 보다 큰 경우 child margin에 parent margin이 통합
