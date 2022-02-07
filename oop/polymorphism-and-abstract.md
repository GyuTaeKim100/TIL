# 다형성과 추상화

## 다형성
 - 여러(poly) 모습(morph)을 갖는 것
 - 객체 지향에서는 한 객체가 여러 타입을 갖는 것
     - 즉 한 객체가 여러 타입의 기능을 제공
     - 타입 상속으로 다형성 구현
         - 하위 타입은 상위 타입의 슈퍼셋
 - **다형성은 추상화를 통해 공통된 성질, 특정 성질을 뽑아내는 것!**

## 다형성 예시
   - ```
      // 1 
      public class Timer {
          public void start() { ... }
          public void stop() { ... }
      } 

      public interfcae Rechargeable {
          void charge();
      }

      // 2
      public class IotTimer 
      extends Timer implements Rechargeable {
          public void charge() {
              ...
          }
      }

      // 3
      IotTimer it = new IotTimer();
      it.start();
      it.stop();

      Timer t = it;
      t.start();
      t.stop();

      Rechareable r = it;
      r.charge()
     ```

## 추상화 (Abstraction)
 - 데이터나 프로세스 등을 의미가 비슷한 개념(개념화)이나 의미 있는 표현(표현 도출)으로 정의하는 과정
 - 두 가지 방식의 추상화
     1. 특정한 성질
     2. 공통 성질(일반화)
 - 간단한 예
     - 특정할 성질 
         - DB의 USER 테이블 : 아이디, 이름, 이메일
         - Money 클래스 : 통화, 금액
     - 공통 성질
         - 프린터 : HP MXXX, 삼성 SL-M2XXX
         - GPU : 지포스, 라데온
 - 참고
     - 추상화는 인터페이스와 다르게 date 또한 가능! 

## 서로 다른 구현 추상화
 - ![8.png](./img/8.png)
   - SCP로 파일 업로드, HTTP로 데이터 전송, DB 테이블에 삽입, 3가지 동작이 모두 푸시 발송 요청을 위한 기능인 경우

## 타입 추상화
 - 여러 구현 클래스를 대표하는 (공통화 된)상위 타입 도출
   - 흔히 인터페이스 타입으로 추상화
   - 추상화 타입과 구현은 타입 상속으로 연결
 - ![9.png](./img/9.png) 

## 추상 타입 사용
 - 추상 타입을 이용한 프로그래밍
   -  ```
        Notifier notifier = getNotifier( ... ); // getNotifier가 어떤 type의 Notifier 인지는 알 수 없다.
        notifier.notifier(someNoti);  // 단 무언가 통제한다는 의도는 잘 들어남
      ```
 - 추상 타입은 구현을 감춤
   - 기능의 구현이 아닌 의도를 더 잘 드러냄 

## 추상 타입 사용에 따른 이점 : 유연함(변경 용이)
 - 콘크리트 클래스를 직접 사용하면
     - 요구사항 변경에 따라 주문 취소 코드(cancel 메서드 구현)도 함께 반영되는 중
         - cancel 메서드의 ... 주문 취소 처리는 바뀌지 않는 중
     - 단계 1 예제
         - ```
             private SmsSender smsSender;

             public void cancel(String ono) {
                 ... 주문 취소 처리

                 smsSender.sendSms(...);
             } 
           ```
     - 단계 2 예제
         - ```
            private SmsSender smsSender;
            private KakaoPush kakaoPush;

            public void cancel(String ono) {
                ...주문 취소 처리

                if(pushEnabled) {
                    KakaoPush.push(...); // Kakao Push를 통해 전달하는 기능 추가 된 경우
                } else {
                    smsSender.senderSms(...);
                }
            } 
           ```
     - 단계 3 예제
         - ```
            private SmsSender smsSender;
            private KakaoPush kakaoPush;

            public void cancel(String ono) {
                ...주문 취소 처리

                if(pushEnabled) {
                    KakaoPush.push(...);
                } else {
                    smsSender.senderSms(...);
                }
                mailSvc.sendMail(...); // email을 통해 취소 사실을 보내야 하는 경우
            }      
           ```  
  - 공통점을 도출하면
      - SMS 전송, 카카오톡 보냄, 이메일 발송은 추상화 시 통지가 된다.
  - 도출한 추상 타입 사용
      - 단계1 예제
          - ```
            public void cancel(String ono) {
                ...주문 취소 처리

                Notifier notifier = getNotifier(...); // 상황에 맞게 알맞은 getNotifier 생성
                notifier.notify(...);
            } 

            private Notifier getNotifier(...) {
                if(pushEnabled) {
                    return new KakaoNotifier();
                } else {
                    return new SmsNotifier();
                }
            }
            ```
     - 단계2 예제
       - 사용할 대상 접근도 추상화 (팩토리를 통한)
       - ```
           // 만약 새 notifier가 추가된 경우 cancel 코드는 수정 되지 않고 아래 DefaultNotifierFactory 코드에서만 기능 추가가 됨 
           public void cancel (String ono) {
               ... 주문 취소 처리
               Notifier notifier = NotifierFactory.instance().getNotifier(...);
               notifier.notify(...);
           } 

           public interface NotifierFactory {
               Notifier getNotifier(...);

               static NotifierFactory instance() {
                   return new DefaultNotifierFactory();
               }
           }

           public class DefaultNotifierFactory implements NotifierFactory {
               public Notifier getNotifier(...) {
                   if(pushEnabled) {
                       return new KakoNotifier();
                   } else {
                       return new SmsNotifier();
                   }

               }
           }
         ```
  - 추상화 결과: 사용 대상 변경 유연함
    - ![10.png](./img/10.png)  

## 추상화 타이밍
 - 추상화는 의존 대상이 변경하는 시점에 진행
 - 추상화 -> 추상 타입 증가 -> 복잡도 증가
 - 아직 존재하지 않는 기능에 대한 이른 추상화는 주의 
     - 잘못 된 추상화 가능성
     - 복잡도만 증가
 - 실제 변경 및 확장이 발생할 때 추상화 시도
 - 예시
     - 예시 1단계
         - ```
             public class OrderService {
                 private MailSender sender;

                 public void order(...) {
                     ...
                     sender.sender(message);
                 }
             } 
           ```
     - 예시 2단계
         - ```
             public class OrderService {
                 private MailSender sender;
                 private SmsService smsService;

                 public void order(...) {
                     ...
                     sender.send(meesage);

                     ...
                     smsService.send(smsMsg);
                 }
             } 
           ```
      - 예시 3단계
          - ```
              public class OrderService {
                  private Notifier notifier;

                  public void order(...) {
                      ...
                      notifier.notify(noti);
                  }
              } 
            ```

## 추상화를 잘 하려면 
  - 추상화를 구현을 한 이유가 무엇 때문인지 생각해야 함
  - ![11.png](./img/11.png)
      - 공통점이 무엇인가?
      - 공통점은 Notifier 또는 Messenger

## 질문
 1. ```
    다른 사람 질문
    주소: https://www.inflearn.com/course/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8/lecture/13432?tab=community&volume=0.20
    제목: 콘크리트 클래스를 직접 사용하는 경우 & NotifierFactory 관련 질문드립니다

    내용 = {
        안녕하세요 강의 듣던중 궁금한게 생겨서 질문드립니다.

        Q1. 9분 9초 경 요구사항이 변경되면서
            if(pushable){
            kakao.send();
            }else{
            sms.send();
            }

            mail.send()
        이렇게 pushable 하면 카카오알림, 불가능하면 문자알림 을 한 후에
        무조건 메일을 통해 push를 한번 더 하고있는데요..

        이를 추상화해서 notify 라는 인터페이스를 만들고, 3개(카카오,문자,메일)의 콘크리트 클래스를 구현하면

        Notify notify = getNotify(...) // 여기서 카카오 or 문자 or 이메일 결정
        notify.send()
        이렇게 구현이 될거라고 생각이 들었습니다.

        근데 만약 notify가 카카오알림이였다면.. 이메일을 통한 send는 못하게 되지 않나요? 아니면 다른 구현 방법이 있을까요

        
        Q2. 강의 11분 50초 쯤 추상화를 한번 더 진행해주셨는데요..

        이전 질문글을 읽어봐도 NotifierFactory 의 역할이 사실 잘 와닿지가 않습니다

        그냥 DefaultNotifierFactory 만 구현하면 될 것 같다는 생각이 사라지지가 않는 것 같은데 혹시 더 설명해주실 수 있으신가요?

        감사합니다.
    }

    답변 (최범균) = {
        1번 답변.

        여러 푸시 메시지를 발송할 수 있는 CompositeNotify를 만들어서 해결해 볼 수 있을 것 같습니다.

        public class CompositeNotify implements Notify {
            private List<Notify> notifiers;

            // 생성자
            ...

            public void send() {
                notifiers.forEach(n -> n.notify());
            }
        }
        getNotify() 메서드는 파라미터로 받은 값에 따라 여러 Notify를 가진 CompositeNotify를 생성하구요.

        private Notify getNotify(...) {
            List<Notify> list = new ArrayList<>();
            if (조건) {
                list.add(kakaoNotify);
            } else {
                list.add(smsNotify);
            }
            list.add(emailNotify);
            return new CompositeNotify(list);
        }
        

        2번 답변.

        가입 코드가 아래와 같다고 할 때,

        public class PlaceOrderService {

            public void order(OrderRequest orderReq) {
                ... 주문 처리
                Notify notify = getNotify(...);
                notify.send();
            }

            private Notify getNotify(...) {
                ... 실제 구현을 사용하는 Notify를 리턴
            }
        }

        우선 발송 방식은 주문 프로세스 자체와 상관이 없는데 발송 방식이 바뀌면 주문 서비스의 코드가 바뀌게 되는데 이는 책임이 섞여 있음을 의미합니다.

        Notify를 제공하는 역할을 별도 팩토리로 분리하면 주문 프로세스 처리와 발송 방식 선택 로직이 명확하게 구분되어 책임이 잘 나눠지게 됩니다.

        또한 주문 서비스에 대한 단위 테스트도 수월해지는 이점이 있습니다.
    }
   ```
 2. ```
        다른 사람 질문
        주소: https://www.inflearn.com/course/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8/lecture/13432?tab=community&volume=1.00&q=381353

        질문 제목: NotifierFactory 를 또 추상화 한 이유가 궁금합니다

        질문 내용 : {
            어떠한 이점으로 NotifierFactory을 또 추상화 작업 한 것인가요?
        }

        답변 (최범균) : {
            사실 팩토리는 상황에 따라 다른 객체를 생성할 수 있는 이점이 있다고 생각합니다. 물론 팩토리가 매번 동일한 객체를 생성하고 그 객체가 항상 같게 동작한다면 팩토리가 아닌 뒤에서 설명하는 의존 주입을 사용하면 될 겁니다. 
        }
   ```

## 중요
- 팩토리 패턴과 DIP, DP의 트레이드 오프
    - 답변
        - 사실 팩토리는 상황에 따라 다른 객체를 생성할 수 있는 이점이 있다고 생각합니다. 물론 팩토리가 매번 동일한 객체를 생성하고 그 객체가 항상 같게 동작한다면 팩토리가 아닌 뒤에서 설명하는 의존 주입을 사용하면 될 겁니다.  

 ## 참고 
  - https://www.inflearn.com/course/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8/lecture/13432?tab=note&volume=0.20