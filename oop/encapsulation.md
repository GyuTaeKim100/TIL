# 캡슐화 (Encapsulation)
 - 데이터 + 관련 기능 묶기
 - 객체가 기능을 어떻게 구현했는지 외부에 감추는 것 (블랙박스화)
   - 구현에 사용된 데이터의 상세 내용을 외부에 감춤
 - 정보 은닉(Information Hiding) 의미 포함
 - 외부에 영향 없이 객체 내부 구현 변경 가능

## 캡슐화 하지 않으면
 - 안 좋은 예시
   - 기본 예제
      - ```
        if (acc.getmembership() ===REGULAR && acc.getExpDate().isAfter(now())) {
            ... 정회원 기능
        } 
        ```
         - REGULAR : 정회원
         - ExpDate : 만료일
         - ServiceDate(): 시작일
   - 기본 예제 + 추가 요구사항 
       - 추가 요구사항 : (이벤트) 5년 이상 사용한 현재 정회원에게 정회원 혜텍 1개월 무상 제공
       - ```
         if (acc.getMembership() == REGULAR && 
            (
                (acc.getServiceDate().isAfter(fiveYearAgo) && acc.getExpDate().isAfter(now())) ||
                (acc.getServiceDate().isBefore(fiveYearAgo) && addMonth(acc.getExpDate()).isAfter(now())) 
            )
         ) {
            ... 정회원 기능
         }
         ```
   -  ![6.png](./img/6.png)
      -  요구사항 변경 예
        1. 장기 사용자에게 특정 기능 실행 권한을 연장 (단 유효 일자는 그대로 유지)
        2. 계정을 차단하면 모든 실행 권한 없음
        3. Date를 LocalDateTime으로 변경

## 캡슐화하면
 - 기능을 제공하고 구현 상세를 감춤
 - 개선 예시
   - ```
      if (acc.hasRegularPermission()) {
          ... 정회원 기능
      }
     ```
   - ```
      public class Account {
          private Membership membership;
          private Date expDate;

          public boolean hasReqularPermission() {
              return membership === REGULAR && expDate.isAfter(now())
          }
      } 
     ```
  - 기능 조건 변경 예시
   - ```
      if (acc.hasRegularPermission()) {
          ...정회원 기능
      } 
     ```
   - ```
      public class Account {
          public boolean hasRegularPermission() {
              return membership === REGULAR && 
                 ( expDate.isAfter(now()) || 
                    (
                        serviceDate.isBefore(fiveYearAgo()) && addMonth(expDate).isAfter(now())
                    )
                )
          }
      } 
     ```
   - 캡슐화 효과
     - 연쇄적인 변경 전파를 최소화
     - ![7.png](./img/7.png) 

## 캡슐화와 기능
 - 캡슐화 시도 -> 기능에 대한 (의도) 이해를 높임
 - ```
    if(acc.getMembership() ==REGULAR) {
        ...
    }
   ```
    - 멤버십이 REGULAR와 같은지 검사하는 이유는 실제로 무엇 때문인가?
 - 검사하는 이유는 계정이 REGULAR 권한을 가졌는지 확인하기 위함
    - 예시
        - ```
            if (acc.hasRegularPermission()) {

            }
            ```
        - ```
            public class Account {
                public boolean hasRegularPermission() {
                    ...
                }
            }
            ```

## 캡슐화를 위한 규칙
 - Tell, Don't Ask
    - 데이터 요청이 아닌 동작하기
    - 나쁜 예시
        - ```
            if (acc.getMembership() == REGULAR) {
                ... 정회원 기능
            }
        ```
    - 개선 예시
        - ```
            if (acc.hasRegularPermission()) {
                ... 정회원 기능
            }
        ```
 - Demeter's Law
    - 메서드에서 생성한 객체의 메서드만 호출
    - 파라미터로 받은 객체의 메서드만 호출
    - 필드로 참조하는 객체의 메서드만 호출
    - 예시1
        - ```
            // 수정 전
            acc.getExpDate().isAfter(now);

            // 수정 후
            acc.isExpired()
        - ```
    - 예시2
        - ```
            // 수정 전
            Date date = acc.getExpDate();
            date.isAfter(now);

            // 수정 후
            acc.isValid(now)
          ```
