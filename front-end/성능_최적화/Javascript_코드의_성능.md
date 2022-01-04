# 자바스크립트 코드의 성능

## 자원 소모 
 - 리소스
   -  종류
      - CPU 점유율
        - 무한 루프만 아니면 문제가 없다.
        - 전력 소모량에 미미함. 
        - 프로그래머가 할수 있는 부분이 적다.
      - 전력 소비량
        - 프로그래머가 할수 있는 부분이 적다.
      - 스토리지 용량
        - 신경 쓸 필요가 거의 없다.
      - 메모리 사용량
        - 메모리 누수 Memory leak 
            > 프로그램이 필요하지 않은 메모리를 계속 점유하는 현상, 자바스크립트는 엔진이 참조 카운팅을 통해서 추정 후 해제(GC:Garbage Collection)
            - 메모리 생명 주기 Memory life cycle
              1. 할당 Allocate Memor환
                 - 사용 할 메모리 확보
              2. 사용 Use Memory
                 - 메모리 사용(읽기, 쓰기)
              3. 해제 Release Memory
                 - 불필요한 메모리 반환
            - 참조 카운팅 예시
                ```
                  var x = {
                      a: {
                          b: 2
                      }
                      // 두 객체가 생성된다. 
                      // 변수 x에 객체가 참조되고, 이 객체는 a 프로퍼티에 다른 객체를 참조한다.
                      // 두 객체 모두 참조되어 있으므로 가비지 컬렉션 되지 않는다.
                      // x가 참조하는 객체를 o1, a 프로퍼티가 참조하는 객체를 o2라고 부르자.


                      var y = x; // 변수 y도 o1 객체를 참조한다.
                      x = 1; // 변수 x는 이제 o1 객체를 참조하지 않는다. 이제 o1 객체를 참조하는 변수는 y가 유일하다.

                      var z = y.a; // o1 객체의 a 프로퍼티에 저장된 o2 객체를 변수 z가 참조한다.
                      y ='mozilla' // 이제 변수 y는 o1객체를 참조하지 않지만 z 변수가 o1 객체의 a 프로퍼티, 즉 o2 객체를 참조하므로 o1 객체는 제거되지 않는다.

                      z = null; // 이제 o1 및  o2는 아무 곳에서도 참조가 되지 않아 가비지 컬렉션이 된다. -> 주석 처리 시 o2는 순환 참조 처리가 된다.
                  }  
                ```  
            - 순환 참조
                - 객체끼리 참조가 맞물려서 가비지 컬렉션이 동작하지 않는 문제 -> 마크 스위프(mark-and-sweep) 알고리즘 적용으로 고민 해결
                    > 단 명백한 경우만 해당
            - 순환 참조가 되지 않는 예시
                ```
                    // case 1 : 큰 전역 변수는 계속 메모리에 존재한다. // 가능하면 module 및 함수로 분리하는 게 좋다.
                    const bigData = { ... /* big data */}

                    // case 2 : 클로저는 생성된 실행 컨텍스트의 변수를 해제하지 못한다.
                    function factory () {
                        const largeData = {
                            ... /* big data */

                            return () => {
                                ...
                            }
                        }
                    }
                    const fn = factory()
                    fn()
                    // fn을 실행한 후에도 여전히 largeData는 메모리에 존재
                    // 의문 fn = null 시 가비지 컬렉터 처리 될까?

                    // case 3 : 큰 데이터가 다른 변수에서 참조되면 큰 데이터를 해제되지 않는다.
                    const data1 = { linkTo : bigData }
                    const data2 = { anotherName : bigData }
                ``` 
                  - 블록 범위 최소 활용을 통해 예방 가능. 
            - 순환 참조 처리 예시
                ```
                    // case 1 : 큰 전역 변수는 계속 메모리에 존재한다. // 대처는 module 및 함수로 빼는 게 옳다.
                    const bigData = { ... /* big data */}

                    // case 2 : 클로저는 생성된 실행 컨텍스트의 변수를 해제하지 못한다.
                    function factory () {
                        const largeData = {
                            ... /* big data */

                            return () => {
                                ...
                            }
                        }
                    }
                    {
                        const fn = factory();
                        fn();
                        // fn은 실행 후 현재의 Lexical Environment와 함께 해제되고 largeData도 함께 해제됨.
                        // 가능하면 다른 함수나 모듈로 분리하는 게 좋다.
                    }

                    // case 3 : 큰 데이터가 다른 변수에서 참조되면 큰 데이터를 해제되지 않는다.
                    const data1 = { linkTo : bigData }
                    const data2 = { anotherName : bigData }         
                ``` 
      - 네트워크 트래픽
        > 브라우저로 전달되는 트래픽 최소화
         - 파일 용량을 줄이거나 필요할 때만 불러와서 트래픽 낭비를 줄인다.
         - 방법
            1. 최소화(minified)한 JS, CSS 파일 사용
               - 최소화 및 GZIP 적용 
            2. 프레임워크는 한 개 이하만 사용
               - 예) React + JQuery 사용 
            3. 파일 주소의 파라미터는 주의해서 사용, 의도하지 않은 캐시 버스터 cache buster가 될 수 있다.
                > cache buster : 파일을 불러올 떄 뒤에 랜덤한 숫자 또는 hash 스트링을 추가해서 다시 캐시시킨다. paramater를 넣어서 cache를 부순다. 원래는 버전이나 파일의 내용이 바뀔 때 브라우저는 전체 URL을 기준으로 파일을 캐시하는 데, 가끔은 똑같은 주소라면 브라우저가 콘텐츠 변경을 인식 못하는 경우가 많을 때 cache buster 처리를 한다. cache buster를 의도치 않게 쓰면 쓸대없이 같은 콘텐츠도 캐쉬를 하지 않고 여러 번 불러오는 경우가 발생할 수 있다. 
      - 이미지, 미디어는 필요할 때 불러오는 게으른 로딩 lazy loading 기법 사용