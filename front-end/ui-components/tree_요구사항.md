
- 작업 중

# Tree

## 사진
![img1](./imgs/1.png)
 
## 구동 환경
- 구동 머신
    - M1 Mac Mini
    - Mac OS 
    - 칩
        - Apple M1 칩
        - 8코어 CPU(성능 코어 4개 및 효율 코어 4개)
        - 8코어 GPU
        - 16코어 Neural Engine
    - 메모리
        - 8GB
        - 8GB 통합 메모리
        - 다음 사양으로 구성 가능:  16GB
    - 저장 장치1
        - 256GB
        - 256GB SSD
        - 다음 사양으로 구성 가능:  512GB, 1TB 또는 2TB
- 브라우저
    - Chrome 65 이상 (2018~) 

## 구현 기술
   - react
   - react-table
   - react-window 


## UI/UX 요구사항
1. Tree Node
    - 기본
        - 크기, 즉 Width, Height는 자유
        - Depth는 Indent 넓이로 구분
        - 접고 펴기
            - Children이 존재하는 경우만 출력
            ..... 시간 상 생략

2. Table Header
    - 첫 번째 Cell
        - 전체 Row Cell 선택 체크박스 존재
        - Index를 텍스트로 출력
    - 나머지 Cell
        - Sort 기능
            - Sort 규칙 주입 가능
        - Filter 가능
            - Filter 규칙 주입 가능

3. Table Body 
    - Scroll X, Y는 기본적으로 출력
    - Body Width가 Tree 전체 Width보다 큰 경우에도, 모든 Scroll X 시 Scroll Y가 출력

4. Table Row
    - 가상화 지원
        - Scroll 위치에 따른 부분 렌더링 지원
        - 코드상 Scroll 이동 시, 가상화 기능이 정상 작동 됨.
    - 재랜더링 시 랜더링 병목 최소화
        - 초당 1번씩 특정 Row가 변경 시에도, 사용성에 문제 없어야 함.
        - 가능하다면 초당 1번씩 모든 Row가 변경 시에도, 사용성에 문제 없어야 함.
            - Vanila JS 기준으로, 부분 변경 구현?
            - React 기준으로, Fiber 재조화 알고리즘은, 3천 개 이상의 Row 기준으로 제대로 작동 안되는 것 같음.
                - 메모리 변화폭이 매우 큼.
                - 사용성에서 Freeze 현상 발생.
                - 랜더링 반영 속도가 매우 느려짐.     
    - 첫 번째 Cell
        - 체크 박스
            - 해당 Row Cell 선택/해제 가능
            - 만약 Children이 존재 하는 경우, 포함하는 모든 하부 Children까지 선택/해제 됨. 
            - 선택/해제 이벤트가 발생 시, Tree 외부에서 선택된 Row 목록에 대해서 정보를 파악할 수 있어야 함. 
    - 이름 Cell
        - Children이 존재하는 경우, 펴기/접기 토글 버튼이 존재
        - Content 제약이 없음.



        
            




----------------

# 1. react-table-optimization

## 환경

- M1 Mac mini 기본 사양
- firefox developer edition
- React & Redux & Redux Observable

## Table 요구사항

1.  커뮤니티 활성화
2.  Document 지원
3.  다양한 기능 지원
    1. sorting 지원
       1. Header 별
       2. 기존 sorting 된 결과를 바탕으로 새로운 sorting 가능
    2. 다양한 header column filter 지원
       1. 지향점은 기획적인 변경에 유연해야 함. 즉 Table 라이브러리에 종속되지 않은 컴포넌트로 filter 기능 구현 가능
       2. 최소
          - input box filter
          - select box filter
       3. 예정 (미정)
          - Modal, Tab, Menu List, Checkbox 등
    3. Table row의 자유로운 커스터마이징
       - 예시로 Checkbox, InProgress Bar 등을 삽입 가능
4.  다양한 기능에 대한 컴포넌트 외부의 로직(비즈니스 로직 포함) 최소화
5.  Tree 지원
6.  css 커스터마이징 제약이 최소화 또는 없음
7.  대규모 데이터에 대한 렌더링 속도 최적화
    1. 초기 렌더링 시
    2. sorting 시
    3. filter 시
    4. 검증
       - 트리 구조 예시
         1. 1depth 노드
         - 10만 개
         2. 2depth 노드
         - 1depth 당 1만 개
         3. 3depth 노드
         - 2depth 당 1천 개
       - 측정
         - 초기 렌더링 시간
         - sorting 렌더링 시간
8.  Infinite scroll 지원
9.  Virtualize 지원
    - 전체 Row 중 Viewport에 보여지는 부분 또는 보여지는 부분에서 특정 offset 까지만 사전에 Rendering 지원
10. Table 컴포넌트 외부의 비즈니스 로직 최소화
11. Table 컴포넌트 외부에서 Table data source를 Table이 지원하는 Table data에 알맞게 구조 변경 또는 Parsing 최소화

## Table Library 선정

- react-table

## 1차 구현 결과

1.  - ![1.png](./imgs/1.png)
    - 요약
      1. 5000개의 Table Row를 가짐
      2. Tree 구조는 최대 3 depth
      3. 트리 depth 별 노드 갯수 비율
      - 1 depth 노드 갯수 : 2 depth 노드 갯수 : 3 depth 노드 갯수 = 1: 10: 최소 100 ~ 최대 3000 (평균 미정)
      - 트리 1 depth 노드 갯수는 20개
    - 문제점
      1. 대규모 랜더링에 대한 Re Rendering 최적화가 고려 안함
      - 추측
        - 초기 렌더링 이후 1개의 row를 Re Rendering 시 모든 Row가 Re Rendering 됨.
      - 추측의 근거
        1. 1개의 row에 대한 Table data source를 변경 시 최소 5초의 Re Rendering 시간 소요
        2. sorting 최소 시 5초의 Re Rendering 시간 소요
        3. checkbox 1개를 enable 또는 disable 시 5초의 Re Rendering 소요
        4. checkbox를 모두를 동시에 enable 또는 disable 시 5초의 Re Rendering 시간 소요
        5. filter 후 filter 조건 제거 시 5초의 Re Rendering 시간 소요
      2. Table 외부의 비즈니스 로직에서 Table data source에 알맞게 data 구조 또는 property name 또는 property value를 수정하고 있음
      3. Table의 부모 컴포넌트가 리렌더링 시 Table의 모든 Row가 Re Rendering 됨.
      4. \*\*실시간 변경 여부를 Re Rendering 하지 못함
      - 구체적인 상황
        - data fetch를 redux Observable를 통해서 관리한다.
        - redux Observable를 통해 epic action으로 data fetch를 하고 결과를 action을 통해서 store에 반영 중
        - Table에 fetch 할 data가 1초 마다 변경 된다.
        - data는 특정 소수의 Row만 Re Rendring 한다.
      - 문제점
        1.  data는 특정 소수의 Row의 Rendering 결과만 변경한다고 할 경우, Re Rendering 속도가 느려서 data를 fetch 후 Re Rendring 완료 시간이 사용성에 문제가 느껴질 정도로 느림.
            - 초기 렌더링 후 3초 후 Re Rendring이 완료 되고, 시간에 비례하게 Re Rendring 완료 시간이 증가하고, 3분 이후부터 Re Rendering이 멈춤.
            - 브라우저 freezing 현상 발생
      - 문제 원인 추측
        - redux action을 통해서 data fetch를 관리하는 부분에서 여러 data fetch가 쌓여도

##

## 문제

1.  Out Of Memory 발생
2.  5000개 이상의 Tree 형식의 Table의 초기 렌더링이 3~5초 소요
3.  5000개 이상의 Tree 형식의 Table 특정 Row를 Rendering 시 모든 Row가 동시에 Rendering 됨
4.

## Out Of Memory

-
- 일반 사용자가 발생 시 해결하는 방법
  - https://loveuceci.tistory.com/2237

## 참고

## 의문

- 개발자 Chrome은 일반 사용자 Chrome과 무슨 차이?

- firefox 개발자 에디션 vs 개발자 Chrome




----------------



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
