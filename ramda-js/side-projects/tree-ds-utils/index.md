### 주제

- 트리 형식의 자료 구조 다루기

### 목표

- ramdaJS 및 fantasy land Spec 숙지 및 활용
- (선택사항) 캔버스 등의 시각화 라이브러리 활용

### 단계 별

- 1단계
    - 트리 형식 자료구조를 가공 및 정제를 위한 공용 비즈니스 로직 라이브러리를 제작
        - 예시
            - 특정 트리 노드를 filter 처리하기
            - 특정 트리 노드의 prop의 값 변경하기
            - 단말 노드만 추출하기
    - (선택사항) Jest 또는 속성 단위 테스트 도입
- 2단계 (현실적인 목표 단계)
    - fantasy land Spec에 알맞게 1단계를 리팩토링
- 3단계 (희망적인 목표 단계)
    - 그래프를 통한 결과단계의 시각화
- 4단계 (퓨처)
    - 노드 추가, 제거 등의 이벤트 시 애니메이션으로 트랜지션 표현
- 4단계 (퓨처)
    - 여러 종류의 트리 자료구조 지원하기
        - 예시
            - 2진 트리
            - 레드 블랙 트리
            - B+ 트리

### 라이브러리 조사

- ramdaJS
    - 참고사항
        - 1주차 내에 전체 분량 학습 불가능.
        - 1주차에는 개요 및 핵심 학습에 집중하고, 이후는 필요 시 바로 학습 예정.
    - 공식 Docs 학습 (https://ramdajs.com/)
        - Goal
            - 라이브러리 목적 및 철학 파악
        - 내용
            - 공식 Docs에서 추천하는 Article 학습
                - [Introducing Ramda](http://buzzdecafe.github.io/code/2014/05/16/introducing-ramda) by Buzz de Cafe
                - [Why Ramda?](http://fr.umio.us/why-ramda/) by Scott Sauyet
                - [Favoring Curry](http://fr.umio.us/favoring-curry/) by Scott Sauyet
                - [Why Curry Helps](https://hughfdjackson.com/javascript/why-curry-helps/) by Hugh Jackson
                - [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA&app=desktop) by Brian Lonsdorf
                - [Thinking in Ramda](https://randycoulman.com/blog/categories/thinking-in-ramda) by Randy Coulman
            - 공식 Docs 내 소개글 학습
- fantasy land
    - 참고사항
        - 1주차 내에 전체 분량 학습 불가능.
        - 1주차에는 개요 및 핵심 학습에 집중하고, 이후는 필요 시 바로 학습 예정.
        - 학습 시 타입 표기법(?) 읽는 법도 학습이 필요해 보임.
    - 공식 Docs 학습 (https://github.com/fantasyland/fantasy-land)
        - Goal
            - 라이브러리 목적 및  철학 파악
        - 내용
            - readme 페이지 전체
- 구현체인 ramda fantasy land 학습 (https://github.com/ramda/ramda-fantasy)
    - 참고사항
        - 1주차 내에 전체 분량 학습 불가능.
        - 1주차에는 개요 및 핵심 학습에 집중하고, 이후는 필요 시 바로 학습 예정.
        - 구현체 각각의 레포지토리가 대체로 문서화가 잘 이루어져 있지 않음.
    - Goal
        - 주요 모나드 구현 스펙 학습
            - Maybe: [sanctuary-js/sanctuary-maybe](https://github.com/sanctuary-js/sanctuary-maybe)
            - Either: [sanctuary-js/sanctuary-either](https://github.com/sanctuary-js/sanctuary-either)
            - Future: [fluture-js/Fluture](https://github.com/fluture-js/Fluture)
            - State: [fantasyland/fantasy-states](https://github.com/fantasyland/fantasy-states)
            - Tuple: [fantasyland/fantasy-tuples](https://github.com/fantasyland/fantasy-tuples)
            - Reader: [fantasyland/fantasy-readers](https://github.com/fantasyland/fantasy-readers)
            - IO: [fantasyland/fantasy-io](https://github.com/fantasyland/fantasy-io)
            - Identity: [sanctuary-js/sanctuary-identity](https://github.com/sanctuary-js/sanctuary-identity)
- d3JS 또는 threeJS
    - 추후 필요한 경우 기재 예정

# 할 일

- [x]  ramdaJS - 공식 Docs 내 소개글 학습
    - **스토리 포인트 :** 1d (월)
- [x]  ramdaJS - 공식 Docs에서 추천하는 Article 학습 (1/2)
    - **스토리 포인트 :** 1d (화)
- [x]  ramdaJS - 공식 Docs에서 추천하는 Article 학습 (2/2)
    - **스토리 포인트 :** 1d (수→목)
- [x]  fantasy land - 공식 페이지 readme 학습 (1/3)
    - **스토리 포인트 :** 1d (목→금)
- [ ]  fantasy land - 공식 페이지 readme 학습(2/3)
    - **스토리 포인트 :** 1d (금→토)
- [ ]  fantasy land - 공식 페이지 readme 학습 (3/3)n
    - **스토리 포인트 :** 1d (토→토 또는 일)