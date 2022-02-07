# java oop basic

## 선수 지식
 - private
 - public
 - 다형성 (폴리모피즘)
     - 예
        1. 객체가 한 개 이상의 자료형 타입을 갖게 되는 경우
            - 구현체 (예: 육식동물은 Tiger, Lion, Crocodile, ...)는 무수히 많지만 인터페이스(Predator)는 하나만 존재
 - 추상
     - 실체 간 공통되는 특성을 추출함
 - 실체 클래스
     - 객체를 직접 생성할 수 있는 클래스
 - 클래스
     - 실체 클래스
 - 추상 클래스
     - 정의
         - 하나 이상의 추상 메서드를 포함하는 클래스
         - IS - A 관계, "~이다."
     - 제약
         - new 연산자를 사용한 객체 생성 불가
             - 실체성과 구체성이 없음
         - 생성자 필수
             - 자식 객체가 생성 시, super 호출을 통해 추상 클래스 객체를 생성
     - 인터페이스와 차이
         - 인터페이스와 다르게 일반 클래스처럼 객체변수, 생성자, private 등을 가질 수 있다.
     - 목적
         - 구현과 설계의 분리
             - 비용(시간, 코드 량, 코드 러닝 커브 절약, 효율성, 사이드 이펙트 감소 등등) 절약
             - 구현은 아키텍트 몫, 구현은 코더(?) 몫
         - 실체 클래스들의 규격화
             - 실체 클래스들의 공통된 필드와 메소드의 이름을 통일
                 - 만약 여러 사람이 사전에 규약 없이 실체 클래스를 설계 시, 각각의 실체 클래스마다 필드와 메소드 명이 다를 확률이 매우 높다.
     - 구현
         - abstract 키워드를 클래스 앞에 배치
         - ```
            public abstract class 클래스명 {
                // 필드
                // 생성자
                // 메서드
                // 추상 메서드
            }
           ```
     - 주석
         - 추상 클래스를 상속 받을 때, 추상 메서드를 구현하지 않은 경우 해당 클래스도 추상 클래스가 된다.
 - 인터페이스
     - 목적
         - 공통 규격을 통한 호환성 향상
         - (동일한 목적에 대해서) 다형성 극대화
         - 유지보수성 향상
           - 객체 간 독립성 부여 (자세한 건 구현 예시 결론 참고) 
         - HAS A, "~을 할 수 있는"
     - 제약
         - 인터페이스는 규칙이므로 메소드의 이름과 입출력에 대한 정의만 존재한다.
         - interface 구현체는 인터페이스의 메소드를 구현하지 않는 경우, 컴파일 오류 발생.
         - 인터페이스의 메소드는 항상 public으로 구현
     - 지향
         - 인터페이스 당 1개의 단독 파일(exampleInterface.java)로 관리
     - 구현
         - 선언시 interface 키워드
         - 구현 시 일반 클래스에서 implement 키워드를 통해 interface 구현
         - interface 적용 전
             -  sample.java
                 - ```
                    class Animal {
                         string name;

                         void setName(string name) {
                             this.name = name;
                         }
                     } 

                     class Tiger extends Animal {

                     }

                     class Lion extends Animal {

                     }

                     class ZooKeeper {

                         // 호랑이가 오면 사과를 제공
                         void feed(Tiger tiger) {
                             System.out.println("feed apple");
                         }

                         // 사자가 오면 바나를 제공
                         void feed(Lion lion) {
                             System.out.println("feed banana");
                         }
                     }

                     public class Sample {
                         public static void main(String[] args) {
                             ZooKeeper zooKeeper = new ZooKeeper();
                             Tiger tiger = new Tiger();
                             Lion lion = new Lion();
                             zookeeper.feed(tiger); // feed apple 출력
                             zooKeeper.feed(lion); // feed banana 출력
                         }
                     }
                   ```
                      - feed를 메소드 오버로딩 처리
                      - 코드의 문제점
                        - 동물의 갯수가 많다면 feed 메소드를 각 동물 별 오버로딩 처리가 필요
            - Predator 인터페이스 추가
                - ```
                    // predator 의미는 육식동물
                    interface Predator {
                        String getFood();
                    }

                    class Animal {
                        String name;

                        void setName(String name) {
                            this.name = name;
                        }
                    }

                    ... (생략) ...
                  ```
                    - 인터페이스의 메소드는 이름과 입출력에 대한 규칙만 존재
                    - 참고
                      - interface는 Predator.java와 같은 단독 파일로 저장하는 것이 일반적인 방법
            - Tiger, Lion 클래스는 작성한 인터페이스를 구현
                -  ```
                      class Tiger extends Animal implement Predator {
                            public String get Food() {
                                return "apple";
                            }
                      } 

                      class Lion extends Animal implement Predator {
                            public String getFood() {
                                return "banana";
                            }
                      }

                      class ZooKeeper {
                          void feed(Predator predator) {
                              const food = predator.getFood()
                              System.out.println("feed " + food);
                          }
                      }
                   ``` 
                     - tiger, lion은 각각 Tiger, Lion 객체이면서 동시에 Predator 인터페이스의 객체이므로, Predator 자료형의 타입으로 feed의 인자로 사용 가능
                     - 즉, 상속 관계인 IS-A 관계가 인터페이스에도 마찬가지로 적용됨
                     - 객체가 한 개 이상의 자료형 타입을 갖게 되는 특성을 다형성(폴리모피즘)이라고 부름
             - 결론
               -  ZooKeeper 클래스가 동물들의 종류에 의존적인 클래스에서 동물들의 종류와 상관 없는 *독립적인 클래스*가 되었다. (인터페이스의 핵심)
               -  물리적 세계 | 자바 세계
                  - 컴퓨터 | Zookeeper
                  - USB 포트 | Predator
                  - 하드 디스크, 디지털 카메라, ... | Tiger, Lion, Crocodile, ...
               - **(매우 중요)** Predator 인터페이스 대신 Animal 클래스에 getFood 메소드를 추가하고 Tiger, Lion 등에서 getFood 메소드를 오버라이딩한 후 Zookeeper의 feed 메소드가 Predator 대신 Animal을 입력 자료형으로 사용해도 동일한 효과를 발생시키지만, 상속은 자식 클래스가 부모 클래스의 메소드를 오버라이딩 하지 않고 사용할 수 있으므로 해당 메소드를 반드시 구현해야 한다는 **강제성**을 부여하지 못한다. 하지만 인터페이스는 메소드를 반드시 구현해야 하는 **강제성**을 부여한다.
 - 추상 메서드
     - 정의
         - 선언만 있고 정의되지 않은(본체가 없는) 함수
     - 목적
         - 구현의 강제화
              - 추상 클래스를 상속한 실체 클래스들은 반드시 추상 메서드를 재정의(오버라이딩) 해야한다. 만족 못 시킨 경우 컴파일 에러 발생
          - 클래스 다형성 제공
     - 제약
         - private 사용 불가
             - 자식 클래스에서 추상 클래스를 구현이 필수이다.
     - 구현
         - Animal.java 
            ```
              package ABSTRACTCLASS;

              public abstract class Animal {
                  public String kind;

                  public void breath() {
                      System.out.println("숨 쉰다.");
                  }

                  //추상 메서드
                  public abstract void sound() // 구체적인 행위 정의 안됨
              }  
            ```
         - Dog.java
            ```
                package ABSTRACLASS;

                public class Dog extends Animal {
                    public Dog() {
                        this.kind = "포유류"
                    }

                    @override
                    public void sound() {
                        // TODO Auto-generated method stub
                        System.out.println('왈왈')
                    }

                }
            ```   
         - Cat.java
            ```
                package ABSTRACLASS;

                public class Cat extends Animal {
                    public Cat() {
                        this.kind = "포유류"
                    }

                    @override
                    public void sound() {
                        // TODO Auto-generated method stub
                        System.out.println('야옹')
                    }

                }
            ```   
 - 상속 (extends, implements)
 - 오버라이딩 (재정의)


## 주석
 - 자바를 처음 배운게 8년 전이고, 그것도 겉핥기 정도.
 - 강의 수강 목적은 OOP 기본 개념 습득
 - 강의 완강을 위해서는 java 기본 OOP 지식 필수
 - 복습 중
 - 이제는 이해가 된다!
## 참고
 - https://www.inflearn.com/course/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8/lecture/13426?tab=curriculum&volume=0.20  인프런-객체 지향 프로그래밍 입문
 - 수많은 블로그 (링크 기록하는거 깜빡함)