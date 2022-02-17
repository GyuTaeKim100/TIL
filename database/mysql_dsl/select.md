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
## 숫자와 문자열을 다루는 함수들1
 - 종류
     - ROUND : 반올림
     - CEIL : 올림
     - FLOOR : 내림
 - 예제
     - `SELECT ROUND(0.5) CEIL(0.4) FLOOR(0.6);`
         - ROUND(0.5)는 1 출력,
         - CEIL(0.4)는 1 출력
         - FLOOR(0.6)은 0 출력
     - `SELECT Price, ROUND(price), CEIL(price), FLOOR(price) FROM Products`
         - 생략

## 숫자와 문자열을 다루는 함수들2
 - 종류
   - ABS : 절대값
 - 예제
    - `SELECT ABS(1), ABS(-1), ABS(3, -10);`
         - ABS(1)은 1 출력
         - ABS(-1)은 1 출력
         - ABS(3, -10)은 7 출력 
    - `SELECT * FROM OrderDetails WHERE ABS(Qunatity - 10) < 5;`
         - ABS(Quantity - 10) < 10은 Qunatity은 5보다 작으면서 5보다 큰수를 출력한다. (10 -5 < Qunatity  < 10 +5)
         - 즉 6, 14 사이의 값을 출력한다.

## 숫자와 문자열을 다루는 함수들3
 - 종류
    - GREATEST : (괄호 안에서) 가장 큰 값
    - LEAST : (괄호 안에서) 가장 작은 값
 - 예제
    - `SELECT GREATEST(1,2,3), LEAST(1,2,3,4,5);`
        - GREATEST(1,2,3)은 3 출력
        - LEAST(1,2,3,4,5)는 1 출력
    - ```
        SELECT
            OrderDetailID, ProductID, Quantity,
            GREATEST(OrderDetailID, ProductID, Quantity),
            LEAST(OrderDetailId, ProductID, Quantity) FROM OrderDetails; 
      ```  
        - 생략

## 그룹 함수 (집계 함수)
 - 조건에 따라 집계된 값을 가져옵니다.
 - 종류
     - MAX : 가장 큰 값
     - MIN : 가장 작은 값
     - COUNT : 갯수 (NULL값 제외)
     - SUM: 총합
     - AVG: 평균값
 - 예제
     - ```
        SELECT
          MAX(Quantity),
          MIN(Qantity),
          COUNT(Quantity),
          SUM(Quantity),
          AVG(Quantity)
        FROM OrderDetails 
        WHERE OrderDetailID BETWEEN 20 AND 30
       ```
         - OrderDetailID가 20에서 30 사이에서 그룹 함수에 의한 레코드 출력
         - MAX(Quantity)는 50
         - MIN(Qunatity)는 6
         - COUNT(Quantity)는 11
         - SUM(Qunatity)는 254
         - AVG(Qunatity)는 23.0909

## 제곱과 제곱근
 - 종류
    - POW(A,B), POWER(A,B): A를 B만큼 제곱
    - SQRT : 제곱근 (스퀘어 루트)
 - 예제
    - `SELECT POW(2,3), POWER(5,2), SQRT(16);`
        - POW(2,3)은 8
        - POWER(5,2)은 25
        - SQRT(16)은 4
    - `SELECT Price, POW(price, 1/2) FROM Products WHERE SQRT(Price) < 4;`
        - 생략

## TRUNCATE
 - TRUNCATE(N,n) : N을 소숫점 n자리까지 선택, n이 음수인 경우 마지막 자리수부터 n 갯수만큼 0으로 변환
 - 예제
   -  ```
         SELECT 
            TRUNCATE(1234.5678, 1),
            TRUNCATE(1234.5678, 2),
            TRUNCATE(1234.5678, 3),
            TRUNCATE(1234.5678, -1),
            TRUNCATE(1234.5678, -2),
            TRUNCATE(1234.5678, -3);  
      ```
        - TRUNCATE(1234.5678, 1): 1234.5
        - TRUNCATE(1234.5678, 2): 1234.56
        - TRUNCATE(1234.5678, 3): 1234.567
        - TRUNCATE(1234.5678, -1): 1230
        - TRUNCATE(1234.5678, -2): 1200
        - TRUNCATE(1234.5678, -3): 1000
    - `SELECT Price FROM Products WHERE TRUNCATE(Price, 0) = 12;`
        - Price가 12.50, 12,00, 12.75, 12.50 같이 12로 시작하는 값만 출력

## 문자열 관련 함수들1
 - 종류
    - UCASE, UPPER : 모두 대문자로
    - LCASE, LOWER : 모두 소문자로
 - 예제
    - `SELECT UPPER('abcDEF'), LOWER('abcDEF');`
        - UPPER('abcDEF)는 ABCDEF
        - LOWER('abcDEF)는 abcdef
    - `SELECT UCASE(CustomerName), LCASE(ContactName) FROM Customers;`
        - 생략

## 문자열 관련 함수들2
 - 종류
     - CONCAT: 괄호 안의 내용 이어붙임
         - 괄호 안 숫자도 문자로 변경
     - CONCAT_WS(S, ...): 괄호 안의 내용(...을 의미함) S로 이어붙임
 - 예제
     - `SELECT CONCAT('HELLO', ' ', 'THIS IS ', 2021);`
         - HELLO THIS IS 2021
     - `SELECT CONCAT_WS('-', 2021, 8, 16, 'AM');`
         - 2021-8-16-AM
     - `SELECT CONCAT('O-ID', OrderId) FROM Orders;`
         - O-ID-12345 같은 형식으로 레코드들 출력
     - `SELECT CONCAT_WS(' ', FirstName, LastName) As FullName FROM Employees;`
           - FirstName의 값과 LastName값 사이에 공백 하나 존재하는 문자열의 레코드들 출력

## 문자열 관련 함수들3
  - 종류
      - SUBSTR, SUBSTRING : 주어진 값에 따라 문자열 자름
      - LEFT: 왼쪽부터 N글자
      - RIGHT : 오른쪽부터 N글자
  - 예제
        - ```
            SELECT
              SUBSTR('ABCDEFG', 3),
              SUBSTR('ABCDEFG', 3, 2),
              SUBSTR('ABCDEFG', -4),
              SUBSTR('ABCDEFG', -4, 2); 
          ```
            - SUBSTR('ABCDEFG', 3)는 CDEFG 출력
            - SUBSTR('ABCDEFG', 3, 2)는 CD 출력
            - SUBSTR('ABCDEFG', -4)는 DEFG 출력
            - SUBSTR('ABCDEFG', -4, 2)는 DE 출력
        - ```
           SELECT
             LEFT('ABCDEFG', 3),
             RIGHT('ABCDEFG', 3);
          ```
            - LEFT('ABCDEFG', 3)는 ABC
            - RIGHT('ABCDEFG', 3)는 EFG
        - ```
            SELECT
                OrderDate,
                LEFT(OrderDate, 4) AS Year,
                SUBSTR(OrderDate, 6, 2) AS Month,
                RIGHT(OrderDate, 2) AS Day
            FROM Orders;
          ```
            - OrderDate는 형식이 YYYY-MM-DD 형식이다.

## 문자열 관련 함수들4
 - 종류
     - LENGTH : 문자열의 **바이트** 길이
     - CHAR_LENGTH, CHARACTER_LENGTH: 문자열의 **문자 길이**
         
 - 예제
     - ```
        SELECT
            LENGTH('ABCDE'),
            CHAR_LENGTH('ABCDE'),
            CHARACTER_LENGTH('ABCDE'); 
       ```
         - LENGTH('ABCDE')는 5
         - CHAR_LENGTH('ABCDE')는 5
         - CHARACTER_LENGTH('ABCDE')는 5 

## 문자열 관련 함수들5
 - 종류
   - TRIM : 양쪽 공백 제거
   - LTRIM : 왼쪽 공백 제거
   - RTRIM : 오른쪽 공백 제거
 - 예제
     - ```
        SELECT 
          CONCAT('|', ' HELLO ', '|'),
          CONCAT('|', LTRIM(' HELLO ', '|')),
          CONCAT('|', RTRIM(' HELLO ', '|')),
          CONCAT('|', TRIM(' HELLO ', '|')) 
       ```
         - CONCAT('|', ' HELLO ', '|')는 | HELLO |
         - CONCAT('|', LTRIM(' HELLO ', '|'))는 | HELLO|
         - CONCAT('|', RTRIM(' HELLO ', '|'))는 | HELLO|
         - CONCAT('|', TRIM(' HELLO ', '|'))는  |HELLO|
     - ```
         SELECT * FROM Categories WHERE CategoryName = ' Beverages '; 
       ```
         - 아무것도 출력 안될 수 있음
     - ```
         SELECT * FROM Categories WHERE CategoryName = TRIM(' Beverages ') 
       ```
         - 출력 됨

## 문자열 관련 함수들6
 - 종류
     - LPAD(S, N, P): S가 N글자가 될 때까지 P를 이어붙임
     - RPAD(S, N, P): S가 N글자가 될 때까지 P를 이어붙임
 - 예제
     - ```
        SELECT
            LPAD('ABC', 5, '-'),
            RPAD('ABC', 5, '-') 
       ```
        - LPAD('ABC', 5, '-')는 --ABC
        - RPAD('ABC', 5, '-')는 ABC--
     - ```
        SELECT
            LPAD(SupplierID, 5, 0),
            RPAD(Price, 6, 0)
        FROM Products; 
       ```
          - LPAD(SupplierID, 5, 0)는 00001같이 자릿수는 같으면서 index 등을 출력 가능
          - RPAD(Price, 6, 0)는 18.00 같은 수를 18.000로 변경한다

## 문자열 관련 함수들7
 - REPLACE(S,A,B) : S중 A를 B로 변경
 - ```
    SELECT
        REPLACE('맥도날드에서 맥도날드 햄버거를 먹었다', '맥도날드', '버거킹')
   ```
    - 버거킹에서 버거킹 햄버거를 먹었다
 - ```
    SELECT
        REPLACE(Description, '. ', ' and ' )
        FROM Categories;
   ```
    - soft drinks, coffees, teas, bears, and ales => soft drinks and coffees and teas and and ales (and and, 단어 사이에 and 중복 문제 발생)
 - ```
      SELECT
        REPLACE(REPLACE(Description, '. ', ' and ' ), ',', ' and')
        FROM Categories;
   ```
     - 단어 사이에 and and 중복 문제 해결

## 문자열 관련 함수들8
 - INSTR(S, s) : S 중 s의 첫 위치 변환, 없을 시 0
 - ```
    SELECT
        INSTR('ABCDE', 'ABC'),
        INSTR('ABCDE', 'BCDE'),
        INSTR('ABCDE', 'C'),
        INSTR('ABCDE', 'DE'),
        INSTR('ABCDE' ,'F')
   ```
      - INSTR('ABCDE', 'ABC')는 1
      - INSTR('ABCDE', 'BCDE')는 2
      - INSTR('ABCDE', 'C')는 3
      - INSTR('ABCDE', 'DE')는 4
      - INSTR('ABCDE' ,'F')는 0
 - ```
    SELECT * FROM Customers
        WHERE INSTR(CustomerName, ' ') BETWEEN 1 AND 6; 
   ```  
    - CustomerName의 첫 번째 글자(공백으로 구분)가 6글자 미만인 레코드 출력

## CAST
 - CAST(A, T) : A를 T자료형으로 변환
 - 예제
    - ```
        SELECT
            '01' = '1',
            CONVERT('01', DECIMAL) = CONVERT('1', DECIAL);
      ```
        -  '01' = '1' 는 0,
            CONVERT('01', DECIMAL) = CONVERT('1', DECIAL)는 1


## 숫자 관련 함수들 1
 - 종류
    - ROUND : 반올림
    - CEIL : 올림
    - FLOOR : 내림
 - 예제
    - ```
        SELECT ROUND(0.5), CEIL(0.4), FLOOR(0.6);
      ```
        - ROUND(0.5) : 1
        - CEIL(0.4) : 1
        - FLLOR(0.6) : 0
    - ```
        SELECT Price, ROUND(price), CEIL(price), FLOOR(price) FROM Products;
      ```
        - 생략

## 숫자 관련 함수들 2
 - 종류
    - ABS : 절대값
 - 예제
    - ```
        SELECT ABS(1), ABS(-1), ABS(3 - 10);
      ```
        - ABS(1) : 1
        - ABS(-1) : -1
        - ABS(3 - 10) : 7
    - ```
        SELECT * FROM OrderDetails WHERE ABS(Qunatity - 10) < 5;
      ```
        - Quantity - 10이 5보다 작거나, 혹은 Quantity - 10이 -5보다 크다를 의미
        - Quantity는 6 ~ 14 사이 값이 출력된다.

## 숫자 관련 함수들 3
 - 종류
    - GREATEST : (괄호 안에서) 가장 큰 값
    - LEAST : (괄호 안에서) 가장 작은 값
 - 예제
    - ```
        SELECT GREATEST(1,2,3),
        LEAST(1,2,3,4,5);
      ```
        - GREATEST(1,2,3) : 3
        - LEAST(1,2,3,4,5) : 1
    - ```
        SELECT 
            OrderDetailId, ProductId, Qunatity,
            GREATEST(OrderDetailId, ProductId, Quantity),
            LEAST(OrderDetailId, ProductId, Quantity)
            FROM OrderDetails;
      ```
        - 생략

## 숫자 관련 함수들 4 - 그룹 함수
 - 종류
    - MAX : 가장 큰 값
    - MIN : 가장 작은 값
    - COUNT : 갯수(NULL값 제외)
    - SUM : 총합
    - AVG : 평균값
- 예제
    - ```
        SELECT
            MAX(Quantity),
            MIN(Qunatity),
            COUNT(Qunatity),
            SUM(Quantity),
            AVG(Quantity)
        FROM OrderDetails
        WHERE OrderDetailId BETWEN 20 AND 30;
      ```
        - OrderDetailId가 20~30 사이 로우 중
            - MAX(Quantity) : Quantity 중 가장 큰 것
            - MIN(Qunatity) : Quantity 중 가장 작은 것
            - COUNT(Qunatity) : Quantity의 총 갯수
            - SUM : Quantity들의 총 합
            - AVG : Quantity들의 평균 값
      ```

## 숫자 관련 함수들 5
 - 종류
    - POW(A,B), POWER(A,B) : A를 B만큼 제곱
    - SQRT : 제곱근
 - 예제
    - ```
        SELECT 
            POW(2,3),
            POWER(5,2),
            SQRT(16);
            POWER(16, 1/2);
      ```
        - POW(2,3) : 8
        - POWER(5,2) : 25
        - SQRRT : 4
        - POWER(16, 1/2): 4
    - ```
        SELECT Price, POW(Price, 1/2)
            FROM Products
            WHERE SQRT(Price) < 4;
      ```
        - Price의 제곱근이 4보다 작은 로우에 대해서
            - 생략

## 숫자 관련 함수들 6
 - 종류
    - TRUNCATE(N, n) : N을 소숫점 n자리까지 선택
 - 예제
    - ```
        SELECT
            TRUNCATE(1234,5678, 1),
            TRUNCATE(1234,5678, 2),
            TRUNCATE(1234,5678, 3),
            TRUNCATE(1234,5678, -1),
            TRUNCATE(1234,5678, -2),
            TRUNCATE(1234,5678, -3),
      ```
        -   TRUNCATE(1234,5678, 1): 1234.5
        -   TRUNCATE(1234,5678, 2): 1234.56
        -   TRUNCATE(1234,5678, 3): 1234.567
        -   TRUNCATE(1234,5678, -1): 1230
        -   TRUNCATE(1234,5678, -2): 1200
        -   TRUNCATE(1234,5678, -3): 1000
    - ```
        SELECT Price FROM Products
            WHERE TRUNCATE(Price, 0) = 12;
      ```
        - Price는 12.50, 12.00, 12.75, 12.50 같은 값들이 출력됨

## 문자열 관련함수들 1
 - 종류
    - UCASE, UPPER : 모두 대문자로
    - LCASE, LOWER : 모두 소문자로
 - 예제
    - ```
        SELECT
            UPPER('abcDEF'),
            LOWER(abcDEF);
      ```
        - UPPER('abcDEF') : ABCDEF
        - LOWER('abcDEF') : abcdef
    - ```
        SELECT
            UCASE(CustomerName),
            LCASE(ContentName)
        FROM Customers;
      ```
        - 생략

## 문자열 관련함수들 2
 - 종류
    - CONCAT : 괄호 안의 내용 이어붙임
    - CONCAT_WS(s, ...) : 괄호 안의 내용 S로 이어붙임 (js의 array.join과 같음)
 - 예제
    - ```
        SELECT CONCAT('HELLO', ' ', 'THIS IS ', 2021);
      ```
        - *CONCAT 안의 숫자는 문자열로 변환됨*
        - HELLO THIS is 2021
    - ```
        SELECT CONCAT_WS('-', 2021, 8, 15, 'AM');
      ```
        - 2021-8-12-AM
    - ```
        SELECT CONCAT('O-ID', OrderId) FROM Orders;
      ```
        - O-Id: 특정 숫자 를 가진 모든 로우들이 출력됨
    - ```
        SELECT
            CONCAT_WS(' ', FirstName, LastName) As FullName
            FROM Employees;
      ```

## 문자열 관련함수들 3
 - 종류
    - SUBSTR, SUBSTRING : 주어진 값에 따라 문자열 자름
    - LEFT : 왼쪽부터 N글자
    - RIGHT : 오른쪽부터 N글자
 - 예제
    - ```
        SELECT
            SUBSTR('ABCDEFG', 3),
            SUBSTR('ABCDEFG', 3, 2),
            SUBSTR('ABCDEFG', -4),
            SUBSTR('ABCDEFG', -4, 2);
      ```
        -  SUBSTR('ABCDEFG', 3): CDEFG
        -  SUBSTR('ABCDEFG', 3, 2): CD
        -  SUBSTR('ABCDEFG', -4): DEFG
        -  SUBSTR('ABCDEFG', -4, 2): DE
    - ```
        SELECT
            LEFT('ABCDEFG', 3),
            RIGHT('ABCDEFG', 3);
      ```
        - LEFT('ABCDEFG', 3) : ABC
        - RIGHT('ABCDEFG', 3) :
    - ```
        SELECT
            OrderDate,
            LEFT(OrderDate, 4) AS Year,
            SUBSTR(OrderDate, 6, 2) AS Month,
            RIGHT(OrderDate, 2) AS Day
        FROM Orders;
      ```
        - *OrderDate는 1996-07-04 형식으로 값이 존재함*
        - Year는 YYYY
        - Month는 MM
        - Day는 dd

## 문자열 관련 함수 4
 - 종류
    - LENGTH: 문자열의 바이트 길이
    - CHAR_LENGTH, CHARACTER_LENGTH: 문자열의 문자 길이
 - 예제
    - ```
        SELECT
            LENGTH('ABCDEF'),
            CHAR_LENGTH('ABCDE'),
            CHARACTER_LENGTH('ABCDE');
      ```
        -  LENGTH('ABCDEF') : 5
        -  CHAR_LENGTH('ABCDE') : 5
        -  CHARACTER_LENGTH('ABCDE') : 5
    - ```
        SELECT
            LENGTH('안녕하세요'),
            CHAR_LENGTH('안녕하세요'),
            CHARACTER_LENGTH('안녕하세요');
      ```
        - *사이트에서 사용하는 문자열 셋에 따라 결과가 달라질 수 있음을 알 수 있다*
        -  LENGTH('안녕하세요') : 15 (3byte * 5)
        -  CHAR_LENGTH('안녕하세요') : 5
        -  CHARACTER_LENGTH('안녕하세요') : 5
## 문자열 관련 함수 5
 - 종류
    - TRIM : 양쪽 공백 제거
    - LTRIM : 왼쪽 공백 제거
    - RTRIM : 오른쪽 공백 제거
 - 예제
    - ```
        SELECT
            CONCAT('|', ' HELLO ', '|'),
            CONCAT('|', LTRIM(' HELLO ', '|')),
            CONCAT('|', RTRIM(' HELLO ', '|')),
            CONCAT('|', TRIM(' HELLO ', '|'));
      ```
        -   CONCAT('|', ' HELLO ', '|') : | HELLO |
        -   CONCAT('|', LTRIM(' HELLO ', '|')) : |HELLO |
        -   CONCAT('|', RTRIM(' HELLO ', '|')) : | HELLO|
        -   CONCAT('|', TRIM(' HELLO ', '|')) :  |HELLO|
    - ```
        SELECT * FROM Categories
        WHERE CategoryName = ' Beverages ';
      ```
        - 아무 값도 안나옴 (공백을 함께 저장하지 않은 경우에는)
    - ```
        SELECT * FROM Categories
        WHERE CategoryName = TRIM(' Beverages ');
      ```
        - 값 출력됨

## 문자열 관련 함수 6
 - 종류
    - LPAD(S,N,P) : S가 N글자가 될 떄 까지 P를 이어붙임
    - RPAD(S,N,P) : S가 N글자가 될 때 까지 P를 이어붙임
 - 예제
    - ```
        SELECT
            LPAD('ABC', 5, '-'),
            RPAD('ABC', 5, '-');
      ```
        - LPAD('ABC', 5, '-') : --ABC
        - RPAD('ABC', 5, '-') : ABC--

    - ```
        SELECT
            LPAD(SupplierId, 5, 0),
            RPAD(Price, 6, 0)
        FROM Products;
      ```
        - LPAD(SupplierId, 5, 0) : SupplierId가 1인 경우 00001이 된다
        - RPAD(Price, 6, 0) : Price가 19.00인 경우 19.000이 된다

## 문자열 관련 함수 7
 - 종류
    - REPLACE(S,A,B) : S 중 A를 B로 변경
 - 예제
    - ```
        SELECT REPLACE('맥도날드에서 맥도날드 햄버거를 먹었다.', '맥도날드', '버거킹');
      ```
        - 버거킹에서 버거킹 햄버거를 먹었다.
    - ```
        SELECT
            REPLACE(Description, ', ', ' and ')
        FROM Categories;
      ```
        -  생략
    - ```
        SELECT
            Description,
            REPLACE(Description, ', and', ','),
            REPLACE(REPLACE(Description, ', and', ',', ' and')
      ```
        -  REPLACE(Description, ', and', ','): 기존 ', and'를 ','로 대체
        -  REPLACE(REPLACE(Description, ', and', ','), ',', ' and') :  기존 ', and'를 ','로 대체 후, 대체 된 문자열의 ','을 ' and'로 대체

## 문자열 관련 함수 8
 - 종류
    - INSTR(S, s) : S중 s의 첫 위치 반환, 없을 시 0
 - 예제
    - ```
        SELECT
            INSTR('ABCDE', 'ABC'),
            INSTR('ABCDE', 'BCDE'),
            INSTR('ABCDE', 'C'),
            INSTR('ABCDE', 'EF'),
            INSTR('ABCDE', 'F');
      ```
       - INSTR('ABCDE', 'ABC') : 1
       - INSTR('ABCDE', 'BCDE') : 2
       - INSTR('ABCDE', 'C') : 3
       - INSTR('ABCDE', 'EF') : 4
       - INSTR('ABCDE', 'F') : 0
    - ```
        SELECT * FROM Customers 
            WHERE INSTR(CustomerName, ' ') BETWEEN 1 AND 6;
      ```
        - CustomerName의 ' '가 1~6 사이에 있는 CustomerName을 출력
        - * 만약 INSTR(CustomerName, ' ') < 6;*인 경우 0도 포함되므로 의도치 않은 값도 출력된다.

## 문자열 관련 함수 9
 - 종류
    - CAST(A, T) : A를 T 자료형으로 변환
 - 예제
    - ```
        SELECT
            '01' = '1',
            CONVERT('01', DECIMAL) = CONVERT('1', DECIMAL);
      ```
        - *'01'과 '1'은 숫자가 아니다.* '01' = '1'은 0이 출력된다.
        - CONVERT('01', DECIAL) = CONVERT('1', DECIMAL)는 CONVERT로 DECIMAL가 되므로 둘다 1이 되고 1이 출력된다.




## 참고 
    - https://www.inflearn.com/course/%EC%96%84%EC%BD%94-%EB%A7%88%EC%9D%B4%EC%97%90%EC%8A%A4%ED%81%90%EC%97%98/lecture/86844?tab=note&volume=0.05&speed=1
    - https://dev.mysql.com/doc/refman/8.0/en/non-typed-operators.html