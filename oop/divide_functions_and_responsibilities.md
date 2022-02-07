# 기능과 책임을 분리

## 기능 분해
 - ![24.png](./img/24.png)
 - 기능은 하위 기능으로 분해
 - 기능은 여러 하위 기능의 모임에 의해 구현됨

## 기능을 누가 제공할 것인가?
 - 기능은 곧 책임
     - 분리한 각 기능을 알맞게 분배
     - ![25.png](./img/25.png)
         - 주석
             - 오타 정정, chagePasswordService => changePasswordService
             - memberRepostory, Member 네이밍은 회원이란 어휘와 관련이 있다.
     - 의문
         1. member와 memberRepository의 차이는?
             - 답변
                 - 아래 하위 기능 사용 섹션의 예제 코드 참고

## 하위 기능 사용
 - 예제
   -  ```
        public class ChangePasswordService {
            public Result changePassword(
                String id,
                String oldPw,
                String newPw
            ) {
                Member mem = memberRepository.findOne(id);
                if (mem == null) {
                    return Result.NO_MEMBER;
                }

                try {
                    mem.changePassword(oldPw, newPw);
                    return Result.Success;
                } catch (BadPasswordException ex) {
                    return Result.BAD_PASSWORD;
                }
            }
        }  
      ```
        - 주석
            - 하위 기능은 memberRepository를 의미 

## 큰 클래스, 큰 메서드
 - 클래스나 메서드가 커지면 절차 지향의 문제 발생
     - 큰 클래스 -> 많은 필드를 많은 메서드가 공유
     - 큰 메서드 -> 많은 (메서드 내) 변수를 많은 코드가 공유
     - 여러 기능이 한 클래스/메서드에 섞여 있을 가능성 존재
 - 책임에 따라 알맞게 코드 분리 필요
     - ![26.png](./img/26.png)

## 몇 가지 책임 분배/분리 방법
 - 패턴 적용
 - 계산 기능 분리
 - 외부 연동 분리
 - 조건별 분기는 추상화
 - 그 외 더 존재..

## 패턴 적용
 - 전형적인 역할 분리
     -  간단한 웹
         - 컨트롤러, 서비스, DAO
     -  복잡한 도메인
         - 엔티티, 벨류, 리포지토리, 도메인 서비스
     - AOP
         - Aspect(공통 기능)
     - GoF
         - 팩토리, 빌더, 전략, 템플릿 메서드, 프록시, 데코레이터 등

## 계산 분리
 - 개선 전 예제
     -  ```
            Member mem = memberRepository.findOne(id);
            Product prod = productRepository.findOne(prodId);

            int payAmount = prod.price() * orderReq.getAmount();
            
            // 아래 코드 주의!
            double pointRate = 0.01;
            if (mem.getMembership() == GOLD) {
                pointRate = 0.03;
            } else if (mem.getMembership() == SILVER) {
                pointRate = 0.02;
            }

            if (isDoublePointTarget(prod)) {
                pointRate *= 2;
            }

            int point = (int) (payAmount * pointRate);

            ...
        ``` 

  - 개선 후 예제
      - ```
          Member mem = memberRepository,findOne(id);
          Product prod = productRepository.findOne(prodId);

          int payAmount = prod.price() * orderReq.getAmount();
          PointCalculator cal = new PointCalculator(
              payAmount,
              mem.getMembership(),
              prod.getId()
          );
          int point = cal.calculate()
        ```
      - ```
          public class PointCalculator {
              ...membership, payAmount, prodId 필드/생성자

              public int calulate() {
                  double pointRate = 0.01;
                  if (membership == GOLD) {
                      pointRate = 0.03;
                  } else if (membership == SILVER) {
                      pointRate = 0.02;
                  }

                  if (isDoublePointTarget(prodId)) {
                      pointRate *=2;
                  }
                  return (int) (payAmount * pointRate);
              }
          }
        ```
          - 주석
              - PointCalculator 생성 시 생성자의 프로퍼티를 통해 필요 값을 넣는 것과 calculate 메서드의 프로퍼티로 전달하는 방식이 존재하는데 각 방식 별로 트레이드 오프가 존재한다. (자세한 것은 dependency_and_DI 질문 파트 참고)

## 연동 분리
 - 네트워크, 메시징, 파일 등 연동 처리 코드 분리
 - 개선 전 예제
     -  ```
          Product prod = findOne(id);

          RestTemplate rest = new RestTemplate();
          List<RecoItem> recoItems = rest.get("http://internal/recommend?id=" + prod.getId() + "&user=" + userId + "&category" + prod.getCategory(), RecoItem.class)  
        ```
  - 개선 후 예제
      - ```
          Product prod = findOne(id);

          RecommendService recoService = new RecommendService();
          List<RecoItem> recoItems = recoService.getRecoItems(prod.getId(), userId, prod.getCategory()); 
        ``` 
## 조건 분기는 추상화
 - 연속적인 if-else는 추상화 고민
 - 개선 전 예제
   -  ```
        String fileUrl ="";
        if (fileId.startWith("local:")) {
            fileUrl = "/files/" + fileId.substring(6);
        } else if (fileId.startWith("ss:")) {
            fileUrl = "http://fileserver/files/" + fileId.substring(3);
        }
      ```
 - 개선 후 예제
    - ```
        FileInfo fileInfo = FileInfo.getFileInfo(fileUrl);
        String fileUrl = fileInfo.getUrl(); 
      ```   
    - ```
        public interface fileInfo {
            String getUrl();
            static FileInfo getFile(...) {
                // 경우에 따라 local file info 또는 ss file info를 반환
            }
        } 

        public class SSFileInfo implements FileInfo {
            private String fileId;

            public String getUrl() {
                return "http://fileserver/files" + fileId.substring(3);
            }
        }
      ```
        - 다형성을 통해 if-else 해결
  - 주의: 의도가 잘 드러나는 이름 사용
    - 예
        - HTTP로 추천 데이터 읽어오는 기능 분리 시
            - RecommendService(의도 보다 명확) > HttpDataService
## 역할 분리와 테스트
 - 역할 분리가 잘 되면 테스트도 용이 해짐
 - 예제 1 (안좋은)
     -  ```     
            Member mem = memberRepository.findOne(id);
            Product prod = productRepository.findOne(prodId);

            int payAmount = prod.price() * orderReq.getAmount();
            
            // 아래 코드 주의!
            double pointRate = 0.01;
            if (mem.getMembership() == GOLD) {
                pointRate =0.03;
            } else if (mem.getMembership() == SILVER) {
                pointRate = 0.02;
            }

            if (isDoublePointTarget(prod)) {
                pointRate *=2;
            }

            int point = (int) (payAmount * pointRate);

            ... 
        ```
          - memberRepository와 productRepository를 실행 해야만 아래 포인트 관련된 코드를 실행 가능하다. (실행 시 다른 객체에 대한 의존성 존재)
  - 예제 2 (좋은)
      - ```
        public class PointCalculator {
        ...membership, payAmount, prodId 필드/생성자

        public int calulate() {
            double pointRate = 0.01;
            if (membership == GOLD) {
                pointRate = 0.03;
            } else if (membership == SILVER) {
                pointRate = 0.02;
            }

            if (isDoublePointTarget(prodId)) {
                pointRate *=2;
            }
            return (int) (payAmount * pointRate);
            }
        }   
        ```
           - PointCalculator는 독립된 모듈이므로, 별도 테스트 가능

## 분리 연습1
 - 개선 전
     - ```
        public class CashClient {
            private SecretKeySpec keySpec;
            private IvParameterSpec ivSpec;

            private Res post(Req req) {
                String reqBody = toJson(req);

                // 암호화 진행
                Cipher cipher = Cipher.getInstance(DEFAULT_TRANSFORM);
                cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
                String encReqBody = new String(Base64.getEncoder().encode(cipher.doFinal(reqBody)));

                // 암호화 후 전달
                ResponseEntity<String> responseEntity = restTemplate.postForEntity(api, encReqBody, String.class);

                // 수신
                String encRespBody = responseEntity.getBody();

                //복호화
                Cipher cipher2 = Cipher.getInstance(DEFAULT_TRANSFORM);
                cipher2.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
                String respBody = new String(cipher.doFinal(Base64.getDecoder().decoder(encRespBody)));

                // 복호화 리턴
                return jsonToObj(respBody);
            }
        }
       ```
         - 분리 포인트
             - 암복호화에 사용하는 객체
                 -  keySpec, ivSpec
             - 계산 기능 (암복호화)
             - 외부 연동
    - 개선 후
      -  ```
            public class CashClient {
                private Cryptor cryptor;

                private Res post(Req req) {
                    String reqBody = toJson(req);

                    String encReqBody = cryptor.encrypt(reqBody);

                    ResponseEntity<String> responseEntity = restTemplate.postForEntity(api, encReqBody, String.class);

                    String respBody = cryptor.decrypt(endRespBody);

                    return jsonToObj(respBody);
                }
            }

            public class Cryptor {
                private SecretKeySpec keySpec;
                private IvParameterSpec ivSpec;

                public String encrypt(String plain) {
                    Cipher cipher = Cipher.getInstance(DEFAULT_TRANSFORM);
                    cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
                    return new String(
                        base64.getEncoder().encode(cipher.doFinal(plain))
                    );
                }

                public String decrypt(String encrypted) {
                    Cipher cipher2 = Cipher.getInstance(DEFAULT_TRANSFORM);
                    cipher2.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
                    return new String(
                        cipher.doFinal(Base64.getDecoder().decode(encrypted));
                    )
                }

                ...

            }
         ``` 
    - 주석
        - cipher 해석 : 암호

## 분리 연습2
 - 개선 전 예제
     - ```
        public class Rental {
            private Movie movie;
            private int daysRented;

            public int getFrequentRenterPoints () {
                if (movie.getPriceCode() == Movie.NEW_RELEASE && daysRented > 1) {
                    return 2;
                } else {
                    return 1;
                }
            }

            ...
        } 

        public class Movie {
            public static int REGULAR = 0;
            public static int NEW_RELEASE = 1;
            private int priceCode;

            public int getPriceCode() {
                return priceCode;
            }

            ...
        }
       ```
  - 개선 후 예제
      - ```
           public class Rental {
               private Movie movie;
               private int daysRented;

               public int getFrequentRenterPoints() {
                   return movie.getFrequentRenterPoints(daysRented);
               }

               ...
           } 

           public abstract class Movie {
               public abstract int getFrequentRenterPoints(
                   int daysRented);
                
               ...
           }

           public class NewReleaseMovie extends Movie {
               public int getFrequentRenterPoints(int daysRented) {
                   return daysRented > 1 ? return 2 : 1;
               }
           }

           public class RegularMovie extends Movie {
               public int getFrequentRenterPoints(int daysRented) {
                   return 1;
               }
           }
        ``` 
  - 주석
      -  Frequent 해석 : 잦은

## 분리 연습 3
 - 기능 : 회원 가입
     - 사용자는 이메일, 이름, 암호 입력
         -  모두 필수 값
     - 암호가 다음 규칙을 통과하지 않으면 다시 입력
         - 규칙1, 규칙2, 규칙3, ...
     - 같은 이메일로 가입한 회원이 있으면 다시 입력
     - 이메일 인증 위한 메일 발송
         - 유효성 검증 위해 암호화 된 토큰을 사용
     - 회원 가입 완료 
 - ![27.png](./img/27.png)
     - 분리에 대한 답은 없다.
         - 예시
             - 토큰 생성과 토큰 저장을 회원 가입 1 depth 레벨로 이동
 - ![28.png](./img/28.png)
    - RegistCommandValidator와 PasswordPolicy는 계산으로 분리한다.
    - 토큰 저장은 TokenStore 또는 TokenRepogitory
## 참고 
 - https://www.inflearn.com/course/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8/lecture/13437?tab=note&volume=0.20