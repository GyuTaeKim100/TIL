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
