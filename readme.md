# TIL
- test commit


## 3월 5주차  질문 리스트

## webpack
  - 부트스트랩 매커니즘
  - 테스크 러너
  - 테스크 러너와 모듈 번들러 차이
  - 테스크 러너와 Build automation 차이
  - gulp와 webpack 의 차이
  - roll up?
  - roll up과 webpack 차이
  - parser?
  - parser과 webpack 차이
  - gulp browserfy 및 webpack-stream으로 webpack 대체?
  - 청크? 런타임 청크?
  - SDK?
  - 일반 로더? 프리 로더? 포스트 로더?
  - 웹팩은 ESM 불가?
  - Tree shaking에 ESM 필수?
  - Webpack resolve 상세?
  - enhanced-resolver?
  - snow pack?
  - 폴리필?
  - IIFE 방식?
  - 모듈 스펙 별 차이?
    - AMD
    - COMMON JS
    - UMD
    - ES2015 모듈
  - Data URI Scheme?
  - 바벨 처리 과정?
  - 바벨 폴리필?
  - use strict?
  - builtins?
  - 바벨 useBuiltIns?
  - Webpack Mock API Plugin?
  - CORS?
  - Webpack external을 통한 최적화?
  - code split
  - bundle과 chunk 차이?
  - bundle analysys?
  - config.context?
  - requiredVersion?
  - learna와 webpack의 차이?
  - learna와 webpack fedoration의 차이?
  - webpack fodoration의 개별 모듈은 개별 포트 할당?
  - 쿠버네티스 컨테이너와 웹팩 fedoration의 차이?
  - fedoration expose를 일일이 직접 타이핑 해야 하는가?
  - fedoration shared를 일일이 직접 타이핑 해야 하는가?
  - fedoration으로 다른 프레임워크의 컴포넌트간 통신 가능한 방법은? (전역 상태? redux로?)
  - fedoration a/b test 예제
  - update manifast도 별도 서버?
  - HMR 업데이트 핸들러가 js의 stopPropagation 역할도 동시에 해서 업데이트 요청에 대한 버블링을 멈추는가?
  - shimming, polyfill 차이
  - shim, polyfill 둘의 진행 우선순위는 상관 없는가?
  - webpack.config.ts도 자체적으로 지원?
  - publicPath
  - on-demand loading
  - 디펜던시 그래프의 역할?
  - webpack configuration multiple target의 목적? 언제?
  - 원격 컨테이너는 웹팩 내에서 호출하는 것 외에 다른 브라우저에서 URL로 호출 가능?
  - module fedration, packageName? requiredVersion?
  - 원격 형제 컨테이너간 참조하지 못하는 이유는 정책상 이유?
  - config.context?
  - manifest 애셋?
  - dependency graph 보는법?
  - 에셋 모듈? 모듈과 차이점?
  - css loader와 style loader 차이점?
  - webpack fallback?
  - index.html 자동 생성? htmlWebpackPlugin
  - manifest 데이터 보는 방법? 
  - webpack-manifest-plugin
    - assethook?
  - manifest file description?
  - source map 목적?
  - webpack watch 모드, dev-server 차이점
  - dev middleware 목적?
  - npx?
  - webpack.common.js?
  - splitChunkPlugin?
  - orphan module? 왜 생김?
  - webpack product 시 console.log 제거 가능? (바벨 등 써서?)

## 네트워크
  - 청크
  - 대용량 용량을 청크로 나누는 네트워크와 관련된 이유
  - JSON과 JSONP 차이
  - SOP정책 (Same Orign Policy)
  - 크로스 도메인 문제
  - XHR?
  - Non Credental
  - 라운드 트립?
  - zero config network? -bongjour?

## 클라우드
  - 프로비저닝
  - 오케스트레이션 계층
  - 오케스트레이터
  - 컨테이너 기반과 마이크로 서비스의 연관성
  - 컨테이너 오케스트레이션 동작 방식
  - 컨테이너 가용성?
  - 가용성?
  - 컨테이너 인스턴스 수를 조절하는 효과적인 기준은?
  - 워크로드?
  - 온 프레미스, 가상화된 배포, 컨테이너 배포의 트레이드 오프
  - CloudFront? 온 디맨드 이미지 리사이징?
  - 애샛?
  - 온 디멘드 청크와 원격 모듈 청크의 관계?
  - shared 청크도 여러 청크로 나눌 수 있을까?
  - splitchunk.hidepathinfo 의 목적?
  - splitchunk.enforceSizeThreshold 왜 존재?
  - splitchunk cache group은 왜 존재?
  - splitchunk.minRemainingSize는 왜 존재?
    - 크기가 0인 모듈이 존재? 어떤 상황에 존재?
  - webpack splitchunk 플러그인은 클라이언트별로 청크 분할이 다르게 될 수 있을까?

## 데이터 베이스
  - 이중화?

## 크롬
  - lighthouse 상세
  - performance
  - frame chart

## js
  - requestIdleCallback?
  - ESM?
  - IIFEs? Immediately invoke function expressions
  - 프리패칭?
  - `<script defer="defer" >` 용도?
  - threshold? 임계값?

## 프론트엔드
 - stylelint?

## 리액트
 - Hoc?
 - 고차 컴포넌트?

## 컴퓨터 공학
  - 디코딩?
  - 인코딩?
## 프로그래밍 언어
 - 함수형과 OOP 조화?
 - 보일러 플레이트?
 - 사상 매핑?
 - 순환 의존성
 - 러스트 언어
 - 병렬형 언어
 - LLVM
 - 러스트 소유권 개념 
 - 정규 표현식

## 자바스크립트 기반 함수형 프로그래밍
 - 함수형 iterator를 통한 lazy 처리?
 - for 문은 관심사 분리 필요?
 - typescript readonly?
 - ADT 대수 자료구조?
 - type 가드? isSome?
 - if문의 트레이드오프
 - 함수형 고수준 모듈과 저수준 모듈의 차이점?
 - 고수준 모듈은 비즈니스 로직 단위간 공유 최소화? 또는 안함?
 - 합성이 고수준일 수록 함수 사용 표기가 더 단순?
 - fuction의 map 구조를 분해?
 - fuctor? 구조를 분해하는 자료 구조?
 - functor 제약?
 - try, generate, observable? fuctor의 일종?

## 노드 라이브러리
 - lerna
 - node 패키지 만드는 방법
 - npm audit fix?
 
## node
 - 모듈의 순환의존성 처리 방법

## 개발론
 - 하드 코딩 장점?

## 개발 기타
 - 인터리빙?
 - 최적의 인터리빙율
## 전공 자격증
 - SQLP
 - SQLD

## 교양 
 - 트레바리로 독서토론 참석
 - 경매 참석

## 차후 목적
 - 영어로 질문올리기!
 - mdn 으로 웹 공부

## 의학 팁
 - 위암과 대장암 검사는 수면으로 동시에 진행 가능

## 금융 질문 리스트
 - 금리?
 - 주식?
 - 채권?
 - IPO?
 - 채권 트레이더?
 - 유상 증자?
 - 무상 증자?

## 진행 중인 금융 공부
 - 멘큐의 경제학 스터디 결성!
## 음악
 - 음악 미싱 전 미싱 후 차이점 느껴보기
 - 음악 공부 목적?
   - 편협한 음악 듣기
   - 그냥 유행따라 듣는 느낌
   - 음악에 대한 이해도를 바탕으로 나의 음악적 취향 찾기
 - 로우파이 장르?
 - 로우파이 재즈?
 - 로우파이 장르는 장르가 아니고, 다른 장르와 믹스할 수 있는 요소?
 - 블루스?
 - 파생장르?
 - EDM?
 - 드럼스텝?
 - 서브베이스?
 - 드럼앤 베이스?
 - 그로울베이스?
 - 워블베이스?
 - 덥스텝?
 - 하프타임?
 - 하프타임 드럼앤 베이스?
 - DNB?


## 개발 구루 사이트
 - www.martinfouler.com