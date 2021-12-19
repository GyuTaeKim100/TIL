## 환경 설정
1. React 기반 CRA(Create React App) with typescript
2. css
3. eslint
   + standard style 가이드 
4. prettier 
   + eslint와 연동
5. day.js
6. react-testing-library
<br> </br>

## components 폴더 구조
```
  └── components
       └──  FilterTodos           
       └──  MultiSelectChips
       └──  TodoForm
       └──  TodoItem
       └──  TodoItemList
       └──  TodosTemplate
       └──  Todos
```
## 평가기준
1. (완료) React App의 완성도를 평가합니다.
2. (완료) App은 오류, 버그없이 정상 동작해야 합니다.
3. (50%) 테스트 코드가 작성되었는지 평가합니다.(선택항목)
   + react testing library를 통해 사용자 이벤트를 기반으로 테스트 진행
   + 단위 테스트 진행률(80%)
   + component 별 test case 
       + FilterTodos
            + 컴포넌트 정상 출력 여부
            + 버튼 그룹 기능
              1. '모두' 버튼 만 active 상태인 경우에 다른 버튼을 클릭 시 '모두' 버튼은 normal 상태가 되고, 클릭한 버튼이 active 상태가 된다
              2. '모두' 버튼이 normal state 인 경우, '모두' 버튼 외 다른 버튼을 모두 순차적으로 클릭 시 클릭한 버튼은 모두 active 상태가 된다.(중복 선택 허용) 
              3. 단 '모두' 버튼 외 normal 상태 버튼 중 마지막 남은 하나의 normal 상태 버튼을 클릭 시 '모두' 버튼 외 다른 버튼들은 normal 상태가 되고 '모두' 버튼 만 active 상태가 된다
       + MultiSelectChips
            + 기능
              1. 주어진 props에 따라 chips active 상태 및 normal 상태로 정상 변경 
       + TodoForm 
            + 컴포넌트 정상 출력 여부
            + 기능
              1. input 값 변경
              3. select 값 변경
              4. input 값이 존재하지 않는 경우 submit 버튼 클릭 시 todo가 추가 되지 않음
              5. input 값이 존재하는 경우 submit 버튼 클릭 시 todo가 추가 된다. 추가 되고 나서 select 및 input은 기본 값으로 변경된다.
        + TodoItemList
              + 컴포넌트 정상 출력 여부
              + 기능
               1. todoItem 갯수가 일치하는 여부
        + TodoItem 
            + viewMode (보기 모드)
               1. 컴포넌트 정상 출력 여부
               2. 컴포넌트 내부 element의 content 정상 출력 여부
               3. viwMode에서 editMode (수정 모드)로 정상 변경 여부
            + editMode (수정 모드)
               1. 컴포넌트 정상 출력 여부
               2. 컴포넌트 내부 element의 value 정상 여부
               3. select 값 변경
               4. input 값 변경
               5. input 값이 존재하지 않는 경우 submit 버튼 클릭 시 todo가 변경 되지 않음
               6. input 값이 존재하는 경우 submit 버튼 클릭 시 todo가 변경됨. viewMode로 자동 변경됨 
<br></br>               

1. (완료) ES6 숙련도를 평가합니다.
2. (완료) 얼마나 시멘틱하게 마크업되었느냐를 평가합니다.
3. (못함) 지체장애인, 시각장애인, 저시력자 등의 취약계층에 대한 접근성이 확보되었는지 평가합니다.
   + 웹 접근성 경험이 없음
   + 현재 공부 중
4. (완료) 작성한 코드의 가독성을 평가합니다.
5. (완료) 장기적으로 유지보수가 가능한 코드인지를 평가합니다.
6. (완료) 다양한 브라우저, 디바이스에 대한 호환성이 확보되었는지 평가합니다.

<br> </br>

## 기본규칙 
 - (완료) 그림 1의 리스트는 To do list 입니다. 좌측의 체크박스는 완료버튼이며, 완료시 To do 가 완료되었다는 의미로 텍스트에 line through 가 생겨야 합니다.
 - (완료) 그림 1의 상단, '할일을 추가하세요' 는 input 영역이며, 텍스트 입력 후 추가시 하단 리스트에 항목이 추가됩니다.
 - (완료) 그림 2과 같이, 스크롤을 내렸을때 상단 input 영역은 상단에 고정된 상태로 유지되어야 합니다.

<br> </br>
## 마크업
 - (완료) To do list 화면을 마크업합니다. css3 를 사용하셔도 좋으며, 다양한 디바이스 크기를 만족하여야 합니다.
 - (완료) 상단 중요도 선택 select box 는 화면의 사이즈와 상관없이 항상 width:60px 이어야 합니다.
 - (완료) 상단 '추가' 버튼은 화면의 사이즈와 상관없이 항상 width:80px; height:40px 이어야 합니다.
 - (완료) 상단 할일입력 input 필드의 width 는 중요도와 추가 버튼을 제외한 나머지 영역이어야 합니다. (예: 창 크기가 400px 인 경우 중요도가 60px 이고 추가버튼이 80px이므로 input 은 260px 이어야 합니다)
 - (완료) 리스트 좌측 체크박스와, 우측 회색 영역 (드래그앤 드랍) 은 각각 width가 항상 40px 이어야 합니다.

<br> </br>
## javascript
 - (완료) 추가영역 하단의 '모두', '매우 중요', '중요', '보통' 영역은 중요도 필터링 버튼입니다. 매우 중요, 중요, 보통은 복수로 선택될 수 있으며 선택된 할일 목록만 화면에 노출되고, 나머지는 숨겨져야 합니다. 모두를 활성화할 경우 다른 항목은 비활성화되며, 모든 할 일이 노출됩니다.
 - (완료) 추가영역 하단의 '모두', '완료', '미완료' 영역은 완료여부 필터링 버튼입니다. 완료, 미완료는 복수로 선택될 수 있으며 선택된 할일 목록만 화면에 노출되고, 나머지는 숨겨져야 합니다. 모두를 활성화할 경우 다른 항목은 비활성화되며, 모든 할 일이 노출됩니다.
  
  <br> </br>
## javasciprt 추가 기능
 - (완료) 이미 추가된 할일항목 (예 : 세탁소에서 빨래 찾아오기) 을 터치하면 input 으로 변경되면서, 내용을 수정할 수 있어야 합니다. (수정하는 경우 추가일은 오늘 날짜로 변경됩니다.)
 - (완료) 할 일 추가 input 이 비어있는 상태에서 추가버튼을 누르면 입력되지 않아야 합니다. 
     +  현재는 할일 추가 또는 기존 할일 수정 시 input 값이 유효하지 않은 경우 form submit 이벤트가 유효하지 않음
     + 현재는 할일 추가 또는 기존 할일 수정 시 input 값이 유효한 경우 form submit 이벤트가 유효함
     +  추가 개선 아이디어 Todo
         +  input이 빈 상태인 경우 추가 및 수정 버튼의 상태가 diabled로 변경
         +  input이 빈 상태인 경우 버튼 클릭은 이벤트 시 error toast 출력
 - (안함) 드래그 앤 드랍 (회색 영역을 터치했을 때만 동작) 으로 할 일의 순서를 바꿀 수 있어야 합니다.

 <br> </br>

## 실행 방법
yarn 기준
1. test code 실행
      ```
      cd SUPER-TODOS

      yarn test  // node_modules가 없으면 yarn test 명령어가 정상적으로 실행되지 않음
      ```
2. 첨부된 build 실행
 
      ```
      cd SUPER-TODOS
      serve -s build
      ``` 

3. build
      ```
      cd SUPER-TODOS
      yarn build
      yarn global add serve
      serve -s build
      ```  
4. 혹시 과제에 첨부한 build 파일에 문제가 있는 경우 node_modules 재설치가 필요
      ```
      yarn
      ```

## 이슈 및 알림
1. 코드 중간 TODO 주석은 포맷이 'TODO : todo 내용'으로 작성되었습니다.
2. TODO 주석 외 일반 주석도 존재합니다.
<br></br>

## 이상입니다. 읽어주셔서 감사합니다.