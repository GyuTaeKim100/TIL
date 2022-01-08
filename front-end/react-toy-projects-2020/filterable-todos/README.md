## 실행화면
1. 기본 화면
   - 작업 완료 후 추가 예정

## 명령어
yarn 기준
1. node_modules 설치
      ```
      yarn
      ```

2. 개발자 모드 실행
      ```
      yarn start
      ```

3. test code 실행
      ```
      yarn test 
      ```
4. build
      ```
      yarn build
      ```

5. build 실행
 
      ```
      yarn global add serve // 설치 안된 경우만
      serve -s build
      ``` 

<br></br>   

## 개발 TODO 우선순위
1. 웹 접근성(스크린 리더기 대상) 도입
2. typescript 폴더 절대 경로
3. react-hook-form 도입
4. tailwind css 도입
5. 테스트 코드 깨지는 부분 수정

<br></br>   
## 환경 설정
1. React 기반 CRA(Create React App) with typescript
2. css
3. eslint
   + standard style 가이드 
4. prettier 
   + eslint와 연동
5. day.js
6. react-testing-library
<br></br>

## components 폴더 구조
```
  └── components
       └──  common
             └── Chip
             └── Chips
             └── FilterChips
       └──  Todos
             └──  FilterTodos           
             └──  TodoForm
             └──  TodoItem
             └──  TodoItemList
             └──  TodosTemplate
             └──  Todos
```
<br></br>   

## 테스트 코드
   + react testing library를 통해 사용자 이벤트를 기반으로 테스트 진행
   + todos test case 목록 
       + 전체적으로 테스트 코드 재작성 필요
<br></br>               


## 기본규칙 
 - (완료) 그림 1의 리스트는 To do list 입니다. 좌측의 체크박스는 완료버튼이며, 완료시 To do 가 완료되었다는 의미로 텍스트에 line through 가 생겨야 합니다.
 - (완료) 그림 1의 상단, '할일을 추가하세요' 는 input 영역이며, 텍스트 입력 후 추가시 하단 리스트에 항목이 추가됩니다.
 - (완료) 그림 2과 같이, 스크롤을 내렸을때 상단 input 영역은 상단에 고정된 상태로 유지되어야 합니다.
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

 ## 끝. 이상입니다. 읽어주셔서 감사합니다.
