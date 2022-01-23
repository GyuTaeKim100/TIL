
# HTTP 헤더 1

## 일반 헤더
 - header-field = field-name ":" OWS field-value OWS (OWS:띄어쓰기 허용)
 - 용도
   - HTTP 전송에 필요한 모든 부가 정보
 - 표준 헤더가 너무 많음
   - https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
 - 필요시 임의의 헤더 추가 가능
   - 예) helloworld: hihi
 - 예시
   - 메시지 바디의 내용
   - 메시지 바디의 크기, 압축, 인증
   - 요청 클라이언트
   - 서버 정보
   - 캐시 관리 정보
   - etc... 무수히 많음
 - 헤더 예시 1
    ```
        GET /search?q=hello&hl=ko HTTP/1.1
        Host: www.google.com
    ```
     - field-name은 대소문자 구분 없음
 - 헤더 예시 2
    ```
        HTTP/1.1 200 OK
        Content-Type: text/html;charset=UTF-8
        Content-Length:3423

        <html>
            <body>...</body>
        </html>
    ```

## HTTP 헤더 분류 - RFC2616(과거)
 - ![29.png](./img/29.png)
 - 헤더 분류
  1. General 헤더
       - 메시지 전체(요청, 응답 구분 없이)에 적용되는 정보
       - 예) Connection: close
  3. Request 헤더
       - 요청 정보
       - 예) User-Agent: Mozilla/5.0 (Macintosh; ..)
  4. Response 헤더
       - 응답 정보
       - 예) Server: Apache
  5. Entity 헤더
       - 엔티티 바디 정보
       - 예
         - Content-Type: text/html
         - Content-Length: 3423

## HTTP BODY - message body - RFC2616(과거)
 - ![30.png](./img/30.png)
 - 메시지 본문(message body)은 엔티티 본문(entity body)을 전달하는 데 사용
 - 엔티티 본문은 요청이나 응답에서 전달할 실제 데이터
 - 엔티티 헤더는 엔티티 본문의 데이터를 해석할 수 있는 정보 제공
   -  종류
        1. 데이터 유형(html, json)
        2. 데이터 길이
        3. 압축 정보 
        4. 등등

## HTTP 표준 - 1999년 RFC2616 폐기됨
 - 스펙 세분화 됨
## HTTP 표준 - 2014년 RFC7230~7235 등장

## RFC723x 변화
 - 엔티티(Entity) -> 표현 (Representation)
 - Representation = representation Metadata + Representation Data
    > 표현 = 표현 메타데이터 + 표현 데이터

## HTTP BODY - message body - RFC7230(최신)
 - ![31.png](./img/31.png)
 - 메시지 본문(message body)를 통해 표현 데이터 전달
 - 메시지 본문 = 페이로드(payload)
 - **표현**은 요청이나 응답에서 전달할 실제 데이터
 - **표현 헤더는 표현 데이터**를 해석할 수 있는 정보 제공
   > 데이터 유형(html,json), 데이터 길이, 압축 정보 등등
 - 참고
   - 표현 헤더는 표현 메타데이터와, 페이로드 메시지를 구분해야만 하지만 생략함.  

## 왜 Entity에서 표현으로 변경되었을까?
 - 리소스를 HTML 또는 json으로 표현으로 명확하게 구체화 

## 표현 헤더
 -  ![32.png](./img/32.png)
 -  사용 범위
    1. 전송
    2. 응답
 -  종류
    1. Content-Type
         - ![33.png](./img/33.png)
         - 표현 데이터의 형식
           > 미디어 타입, 문자 인코딩 
         - 종류
           1. text/html; charset=utf-8
           2. appliation/json
           3. image/png 
    2. Content-Encoding
         - ![34.png](./img/34.png)
         - 표현 데이터를 압축하기 위해 사용
         - 데이터를 전달하는 곳에서 압축 후 인코딩 헤더 추가
         - 데이터를 읽는 쪽에서 인코딩 헤더의 정보로 압축 해제
         - 종류
           1. gzip
           2. deflate
           3. identity : 압축 안함
    3. Content-Language
         - ![35.png](./img/35.png)
         - 표현 데이터의 자연 언어
         - 큰 공식 사이트의 경우 다국어 지원 시 클라이언트에서 원하는 언어 요청 가능
         - 예) 한국어, 영어 등
    4. Content-Length
          - ![36.png](./img/36.png)
          - 바이트 단위
          - 표현 데이터의 길이
          - Transfer-Encoding(전송 코딩)을 사용하면 Content-Length를 사용하면 안됨
            - Transfer-Encoding에 content-Length 관련 정보 포함함, 추후 자세히 설명
          - *명확히는 표현 헤더가 아닌 페이로드 헤더이다*

## 협상(콘텐츠 네고시에이션)
 - 클라이언트가 선호하는 표현 요청
 - 서버는 클라이언트가 원하는 우선순위에 최대한 맞춰서 표현 제공
 - 사용 범위
   - 요청 시
 - 종류
    1. Accept
        - 클라이언트가 선호하는(가능하다면) 미디어 타입 전달
    2. Aceept-Charset
        - 클라이언트가 선호하는(가능하다면) 문자 인코딩
    3. Accept-Encoding
        - 클라이언트가 선호하는(가능하다면) 압축 인코딩
    4. Accept-Language
        - 클라이언트가 선호하는(가능하다면) 자연 언어
        - ![37.png](./img/37.png)
        - ![38.png](./img/38.png)
        - ![39.png](./img/39.png)
        - ![41.png](./img/41.png)
          - *협상과 우선순위1 - Quality Values(q) 섹션 참고*

## 협상과 우선순위1 - Quality Values(q)
  - ![40.png](./img/40.png)
  - Quality Values(q) 값 사용
  - 0~1, 클수록 높은 우선순위
  - 생략 시 1
  - Accept-Language: ko-KR;ko;q=0.9,en-US;q=0.8;en;q=0.7
    - 해석
      1. ko-KR;q=1 (q생략)
      2. ko;q=0.9
      3. en-US;q=0.8
      4. en:q=0.7

## 협상과 우선순위2 - Quality Values(q)
 - ![42.png](./img/42.png)
 - 구체적인 것이 우선한다.
 - 예) `Accept:text/*, text/plain, text/plain;format=flowed,*/*`
    1. text/plain;format=flowed
    2. text/plain
    3. text/*
    4. `*/*`

## 협상과 우선순위3 - Quality Values(q)
 - 구체적인 것을 기준으로 미디어 타입을 맞춘다.
 - 예) `Accept:text/*;q=0.3,text/html;q=0.7,text/html;level=1,text/html;level=2;q=0.4,*/*,q=0.5`
   - ![43.png](./img/43.png)

## 전송 방식
 1. 단순 전송
  - ![44.png](./img/44.png)
 2. 압축 전송
  - ![45.png](./img/45.png) 
 3. 분할 전송
  - [46.png](./img/46.png) 
  - [47.png](./img/47.png)
  - 용량이 큰 경우, 바로바로 보여주기를 원하는 경우
  - 주의, content-length를 넣으면 안됨 
 4. 범위 전송
  - [48.png](./img/48.png)
  - 예시: 부족한 부분에 대해서 재요청 시

## 일반 정보
 - From
   - 유저 에이전트의 이메일 정보
   - 사용 범위
     - 요청
   - 예) 검색 엔진 같은곳에서 크롤링 시 유저 에이전트의 이메일 정보에 사용
 - Referer
   - 이전 웹 페이지 주소
   - 현재 요청된 페이지의 이전 웹 페이지 주소
   - A -> B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청
   - Referer를 사용해서 유입 경로 분석 가능
   - 사용 범위
     - 요청
   - 참고
     - referer는 단어 referrer의 오타   
 - User-Agent
   - 유저 에이전트 애플리케이션 정보
   - [49.png](./img/49.png)
   - 클라이언트의 애플리케이션 정보(웹 브라우저 정보, 등등)
   - 통계 정보
   - 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
   - 사용 범위
     - 요청
 - Server
   - 요청을 처리하는 오리진 서버의 소프트웨어 정보
        > 오리진 서버: 요청 시 여러 프록시 서버(캐시 서버 포함)를 거치게 되는 데, 실제 요청을 위한 서버를 의미함
   - 사용 범위
      - 응답 
   - 예
      1. Server: Apache/2.2.22 (Debian)
      2. server: nginx

 - Date
   - 메시지가 생성된 날짜
   - 사용 범위
       - 응답
   - 예) Date: Tue, 15 Nov 1994 08:12:31 GMT

## 특별한 정보
 - Host: 요청한 호스트 정보(도메인)
   - [50.png](./img/50.png)
   - 사용 범위
     - 요청
   - **필수 값**
   - 예
     1. 하나의 서버가 여러 도메인을 처리해야 할 때 또는 하나의 IP 주소에 여러 도메인이 적용되어 있을 때
       - [51.png](./img/51.png)
           - IP로만 통신하는 경우 내부 서버 도메인 구분이 불가능
           - 과거에, 많은 문제를 일으켜서 필수값이 됨
       - [52.png](./img/52.png)
 - Location: 페이지 리다이렉션
     - 웹 브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동(리다이렉트)
     - 응답 코드 3xx에서 설명
     - 구분
         - 201 (Created) : Location 값은 요청에 의해 생성된 리소스 URI
         - 3xx (Redirection) : Location 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴
 - Allow: 허용 가능한 HTTP 메서드
     - 405 (Method Not Allowed)에서 응답에 포함해야 함
     - Allow: GET, HEAD, PUT
     - 예) 잘못된 Method 시 사용 가능한 Method 종류 가르쳐줌
     - 실제 서버에서 많이 구현하지는 않음
 - Retry-After: 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
     - 503 (Service Unavailable) : 서비스가 언제까지 불능인지 알려줄 수 있음
     - 예
        1. Retry-After: Fri, 31 Dec 1999 23:59:59 GMT (날짜 표기)
        2. Retry-After: 120 (초단위 표기)

## 인증 
  1. Authorization : 클라이언트 인증 정보를 서버에 전달
    - 예
       - Authorization: Basic xxxxxxxx....xxxxx (인증 방식마다 포멧이 다름)
  2. WWW-Authenticate : 리소스 접근시 필요한 인증 방법 정의
    - 리소스 접근 시 필요한 인증 방법 정의 (서버가 클라이언트에게 전달)
    - 401 Unauthorized 응답과 함께 사용
    - 예: WWW-Authenticate: Newauth realm="apps",type=1,title="Login to \"apps\"",Basic realm="simple"

## 참고
 - https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/lecture/61375?tab=note&volume=0.10&quality=auto 인프런 - 모든 개발자를 위한 HTTP 기본 지식