# SELECT

## 실습 링크
 - https://www.w3schools.com/mysql/trymysql.asp?filename=trysql_select_all

## 용도
 - 원하는 정보 가져오기 

## 실습
 - `SELECT * FROM Customer;`
     - Customer 테이블에 존재하는 모든 레코드 출력 + 모든 컬럼 
 - `SELECT CustomerName FROM Customers;`
     - Customer 테이블에 존재하는 모든 레코드 출력 + CustomerName 컬럼만 출력
 - `SELECT CustomerName, ContactName, Contry FROM Customers;` 
     - Customer 테이블에 존재하는 모든 레코드 출력 + CustomerName, ContactName, Contry 컬럼만 출력
 - `SELECT CustomerName, 1, 'Hello, NULL FROM Customers;`
     -  아직 정확히 무슨 의미인지 모르는 중
 - 조건
   - 예제
        - `SELECT * FROM Orders WHERE EmployeeId = 3;`
            -  Orders 테이블에 존재하는 레코드 중 EmployeeId가 3인 레코드들만 출력
        - `SELECT * FROM OrderDetails WHERE Quantity < 5;`
            - OrderDetails 테이블에 존재하는 레코드 중 Qunatity가 5보다 작은 레코드들만 출력
 - 원하는 순서대로 데이터 가져오기
     - ORDER BY 구문
         1. ASC : 오름차순, 기본
         2. DESC : 내림차순
     - 예제
         - `SELECT * FROM Customers ORDER BY ContactName;`
             - Customers 테이블에 존재하는 레코드를 contactName 기준으로 ASC 정렬
         - `SELECT * FROM Customers ORDER BY ContactName DESC;`
             - Customers 테이블에 존재하는 레코드를 contactName 기준으로 DESC 정렬
         - `SELECT * FROM OrderDetails ORDER BY ProductId ASC, Qnatity DESC;`
             - ProductID 기준으로 먼저 오름차순 정렬 후, Quantity 기준으로 내림차순 정렬
 - 원하는 만큼만 데이터 가져오기
     - LIMIT 구문 
          1. LIMIT {가져올 갯수} 또는 LIT {건너뛸 갯수}, {가져올 갯수} 를 사용하여, 원하는 위치에서 원하는 만큼만 데이터를 출력
     - 예제
          - `SELECT * FROM Customers LIMIT 10;`
              - 최신 레코드 10개만 출력
          - `SELECT * FROM Customers LIMIT 0, 10;`
              - 최신 레코드 10개만 출력
          - `SELECT * FROM Customers LIMIT 30, 10;`
              - 31 ~ 40번째 레코드 출력 (총 10개)
      - 활용
          - 페이지네이션
 - 원하는 별명(alias)으로 데이터 가져오기
     - AS 구문
        - AS를 사용해서 컬럼명을 변경할 수 있다.
     - `SELECT CustomerId AS ID, CustomerName AS NAME, Address AS ADDR FROM Customers;`
         - 컬럼을 ID, NAME, Address으로 변경 후, 레코드 가져옴 
     - `SELECT CustomerId AS '아이디', CustomerName AS '고객명', Address AS '주소' FROM Customers; `
         - 한글, 추후 작성 예정
 - 모두 활용하기
     - 예제
       - `SELECT CustomerID AS '아이디', CustomerName AS '고객명', City AS '도시',Contry AS '국가' FROM Customers WHERE City ='London' OR Contry ='Mexico' ORDER BY CustomerName LIMIT 0, 5;`
           - 컬럼명은 '아이디', '고객명', '도시', '국가'로 변경하고,
           - 테이블은 CustomerName 이고,
           - City 컬럼이 'London' OR Contry 컬럼이 'Mexico' 이고,
           - CustomerName 기준으로 오름차순하고, 
           - 레코드 순서는 1에서 5까지 가쟈온다.

## 각종 연산자들 
 - 사칙연산
     -  종류
           - `+, -, *, /` : 각각 더하기, 빼기, 곱하기, 나누기
           - `%, MOD` : 나머지
     - 예제
         - `SELECT 1 + 2;`
             -  1 + 2 칼럼에 3 출력한다.
          - `SELECT 5 - 2.5 AS DIFFERENCE`
             - DIFFERENCE 컬럼에 2.5 출력한다.
          - `SELECT 3 * (2+4) / 2, 'Hello';`
             - 3 * (2+4) / 2 컬럼에 9.0000 출력하고, Hello 컬럼에 Hello 문자열 출력한다.
          - `SELECT 'ABC' + 3;`
             - 'ABC' + 3 컬럼에 3 출력
             - 사칙연산에서 ABC 문자열을 0으로 인식한다.
          - `SELECT '1' + '002' * 3`
              - '1' + '002' * 3 컬럼에 7 출력한다.
              - '1'은 1이 되고, '002'는 2가 된다.
          - `SELECT OrderID + ProductID FROM OrderDetails;`
              - OrderId + ProductId 컬럼에 각 레코드 별로 OrderId와 ProductId가 합쳐진 값을 출력한다.
          - `SELECT ProductName, Price / 2 AS HalfPrice FROM Products;`
              - 출력되는 레코드는, ProductName 컬럼과 Half 컬럼이 존재하고, Half 컬럼에는 Price/2 연산된 값이 출력된다.
  - 참/거짓 관련 연산자
      - 종류
            - TRUE(1로 인식), FALSE(0으로 인식)
            - !TRUE, NOT 1, !FALSE, NOT FALSE
       - 예제
           - `SELECT TRUE, FALSE;`
                 - 출력되는 레코드는, TRUE 컬럼에 1, FALSE 컬럼에 0 출력한다.
            - `SELECT !TRUE, NOT 1, !FALSE, NOT FALSE`
                 - 출력되는 레코드는, !TRUE 컬럼에 0, NOT 1 컬럼에 0, !FALSE 컬럼에 1, NOT FALSE 컬럼에 1 출력한다.
            - `SELECT 0 = TRUE, 1 = TRUE, 0 = FALSE, 1 = FALSE;`
                - 출력되는 레코드는 0 = TRUE 컬럼에 0, 1 = TRUE 컬럼에 1, 0 = FALSE 컬럼에 1, 1 = FALSE 컬럼에 0 출력한다.
            - `SELECT * FROM Customers WHERE FALSE;`
                - 레코드가 선택되지 않음
            - `SELECT * FROM Customers WHERE City = 'berlin';`
                - City가 'berlin'인 모든 레코드 출력
  - 참/거짓 관련 연산자2
      - 종류
            - IS : 양쪽이 모두 TRUE 또는 FALSE
            - IS NOT : 한 쪽은 TRUE, 한 쪽은 FALSE
      - 에제
            - `SELECT TRUE IS TRUE;`
                - TRUE IS TRUE 컬럼에 1 출력
            - `SELECT TRUE IS NOT FALSE;`
                - TRUE IS NOT FALSE 컬럼에 1 출력
            - `SELECT (TRUE IS FALSE) IS NOT TRUE;`
                - (괄호부터 먼저 진행)
                - (TRUE IS FALSE)는 FALSE가 되고,
                - FALSE IS NOT TRUE는 TRUE가 된다.
                - (TRUE IS FALSE) IS NOT TRUE 컬럼에 1 출력한다.
  - 참/거짓 관련 연산자3
        - 종류
            - AND, && : 양쪽이 모두 TRUE 일 때만 TRUE
            - OR, || : 한쪽은 TRUE이면 TRUE
        - 예제
            - `SELECT TRUE AND FALSE, TRUE OR FALSE;`
                - TRUE AND FALSE 컬럼에는 0, TRUE OR FALSE 컬ㄹ머에는 1 출력한다.
            - `SELECT 2 + 3 = 6 OR 2 * 3 = 6;`
                - 2 + 3 = 6은 FALSE이고,
                - 2 * 3 = 6은 TRUE이고,
                - FALSE OR TRUE는 TRUE이다.
                - 1이 출력된다.
            - `SELECT * FROM Orders WHERE CustomerID = 15 AND EmployeeId = 4;`
                - CustomerID가 15이고,
                - EmployeeId가 4인 모든 레코드를 출력한다.
            - `SELECT * FROM Products WHERE ProductName = 'Tofu' OR CategoryId = 8;`
                - ProductName이 'Tofu'이거나 CategoryId가 8인 모든 레코드를 출력한다.
            - `SELECT * FROM OrderDetails WHERE ProductId = 20 AND (OrderId = 10514 OR Quantity = 50);`
                - ProductId가 20이면서,
                - OrderId가 10514이거나 Quantity가 50인 모든 레코드를 출력한다.
    - 비교 연산자
          - 종류
              - = : 양쪽 값이 같음
              - !=, <> : 양쪽 값이 다름
              - `>,<`: (왼쪽, 오른쪽) 값이 더 큼
              - `>=, <=`: (왼쪽, 오른쪽) 값이 같거나 더 큼
           - 예제
               - `SELECT 1 = 1, !(1 <> 1), NOT (1 < 2), 1 > 0 IS NOT FALSE;`
                   - 1 = 1 컬럼은 1,
                   - !(1<>1) 컬럼은 1
                   - NOT (1 < 2) 컬럼은 0
                   - 1 > 0 IS NOT FALSE 컬럼은 1
               - `SELECT 'A' = 'A', 'A' != 'B', 'A' < 'B', 'A' > 'B';`
                   - 'A' = 'A'는 1,
                   - 'A' != 'B'는 1,
                   - 'A' < 'B'는 1,
                   - 'A' > 'B'는 0
               - `SELECT 'A' = 'a';`
                   - 'A' = 'a'는 1 (영어 대소문자 구분 안함)
               - `SELECT ProductName, Price, Price > 20 AS EXPENSIVE FROM Products;`
                   - EXPENSIVE 컬럼은 0 또는 1이 된다.
    - 비교 연산자2
          - 종류
              - BETWEEN {MIN} AND {MAX} : 두 값 사이에 있음
              - NOT BETWEEN {MIN} AND {MAX} : 두 값 사이가 아닌 곳에 있음
           - 예제
              - `SELECT 5 BETWEEN 1 AND 10;`
                  - 1 출력
              - `SELECT 'banana' NOT BETWEEN 'Apple' AND 'camera';`
                  - 0 출력
              - `SELECT * FROM OrderDetails WHERE ProductId BETWEEN 1 AND 4;`
                  - ProductID가 1 ~ 4 사이의 레코드들을 출력
              - `SELECT * FROM Customers WHERE CustomerName BETWEEN 'b' AND 'c';` 
                  - 0 출력 (대소문자 구분 안함)
              - `SELECT * FROM Customers WHERE CustomerName BETWEEN 'b' AND 'c';`
                  - CustomerName이 전부 b로 시작하는 레코드를 출력
                  - 더 나은 방법 존재, LIKE 연산자를 통해 LIKE 'b%'를 SELECT문의 마지막에 덧붙인다.
    - 비교 연산자3
          - 종류
              - IN (...) : 괄호 안의 값들 가운데 있음
              - NOT IN (...) : 괄호 안의 값들 가운데 없음
          - 예제
              - `SELECT 1 + 2 IN (2,3,4)`
              - `SELECT 'Hello' IN (1, TRUE, 'hello')`
              - `SELECT * FROM Customers WHERE City In ('Torino', 'Paris', 'Portland', 'Medrid')`
                - City가 Torino, Paris, Portland, Medrid 중 하나인 레코드들을 출력
    - 비교 연산자4
          - 종류
              - LIKE '...%...' : 0 ~ N개 문자를 가진 패턴
              - LIKE '..._...' : _ 갯수만큼의 문자를 가진 패턴
          - 예제
                - ```
                   SELECT
                      'HELLO' LIKE 'hel%',
                      'HELLO' LIKE 'H%',
                      'HELLO' LIKE 'H%O',
                      'HELLO' LIKE '%O',
                      'HELLO' LIKE '%HELLO%',
                      'HELLO' LIKE '%H',
                      'HELLO' LIKE 'L%'
                  ```
                    - 'hel%'는 hel로 끝나거나, hel뒤에 어떤 문자열이 와도 TRUE이다. 1 출력
                    - 1 출력, 'HELLO' LIKE 'H%'
                    - 1 출력, 'H' 뒤에 0~N 개의 문자열이 오고 마지막에 O가 온다.
                    - 1 출력, 마지막이 'O'로 끝난다.
                    - 1 출력, %HELLO%는 HELLO도 된다.
                    - 0 출력, H로 끝나는 단어는 HELLO는 될 수 없다.
                    - 0 출력, L로 시작하는 단어는 HELLO가 될 수 없다.
                - ```
                    SELECT
                        'HELLO' LIKE 'HEL__',
                        'HELLO" LIKE 'h___o',
                        'HELLO' LIKE 'HE_LO',
                        'HELLO' LIKE '_____',
                        'HELLO' LIKE '_HELLO',
                        'HELLO' LIKE 'H_O',
                  ```
                    - 출력 생략
                - `SELECT * FROM Employess WHERE Notes LIKE '$ecconics%'`
                    - Note 컬럼의 value 중 economics가 포함된 모든 레코드를 출력
                - `SELECT * FROM OrderDetails WHERE OrderID LIKE '1025_`
                    - 1025와 마지막에 문자 하나가 덧붙은 모든 레코드를 출력

## 참고 
    - https://www.inflearn.com/course/%EC%96%84%EC%BD%94-%EB%A7%88%EC%9D%B4%EC%97%90%EC%8A%A4%ED%81%90%EC%97%98/lecture/86844?tab=note&volume=0.05&speed=1