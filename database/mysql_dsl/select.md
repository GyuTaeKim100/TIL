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