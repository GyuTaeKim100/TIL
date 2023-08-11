
// // 전역 변수
// var shopping_cart = []; // 장바구니 목록
// var shopping_cart_total = 0; // 장바구니 목록 금액 합계

// // 장바구니에 제품을 담기 위해 cart 배열에 레코드를 추가한다.
// function add_item_to_cart(name, price) {
//     shopping_cart.push({
//         name: name,
//         price:price
//     })
//     // 장바구니 제품이 바뀌었기 때문에 금액 합계를 업데이트한다.
//     calc_cart_total();
// }

// // 장바구니 제품의 총합을 갱신한다.
// function calc_cart_total() {
//     shoping_cart_total = 0;
//     for (var i = 0; i <shopping_cart.length ; i++) {
//         var item = shopping_cart[i];
//         shopping_cart_total +=item.price;
//     }

//     // 금액 합계를 반영하기 위해 DOM 업데이트한다.
//     set_cart_total_dom();
// }

// var 장바구니 = []
// var 장바구니_총액 = 0

// 화면.관찰자_등록하기("클릭한 경우", (클릭_이벤트_정보) =>{
//     var 선택한_상품 = 상품_카탈로그[클릭_이벤트_정보.순서]
//     장바구니에_상품_추가하기(선택한_상품)    
// })

// function 장비구니에_제품_추가하기 (선택한_상품) {
//     장바구니.추가하기(선택한_상품)
//     장바구니_총액_계산하기()
// }

// function 장바구니_총액_계산하기() {
//     for(var 순서 ; 순서 < 장바구니.갯수 ; 순서++) {
//         장바구니_총액 += 장바구니[순서].가격
//     }

//     화면에_장바구니_총액_그리기(장바구니_총액)
// }

// import {fromEvent} from 'rxjs'
// import {zip_연산자, map_연산자, reduce_연산자} from 'rxjs/연산자'

// fromEvent(화면,'클릭한 경우')
//     .pipe(
//         zip_연산자(상품_목록, 클릭_이벤트_정보),
//         map_연산자(상품_선택하기),
//         tap_연산자(장바구니에_상품_추가하기),
//         reduce_연산자(장바구니_총액_계산하기),
//     ).subscribe({
//         다음: (장바구니_총액) => {

//             화면에_장바구니_총액_그리기(장바구니_총액)
//         }
//     })

// function 상품_선택하기(상품_목록, 클릭_이벤트_정보) {
//     return 상품_목록[클릭_이벤트_정보.순서]
// }


// // RxJS 라이브러리를 불러온다.
// const { fromEvent } = rxjs
// const { scan, map, startWith } = rxjs.operators

// // 초기값으로 빈 장바구니와 총액을 스트림으로 생성한다.
// const 장바구니$ = fromEvent(화면, '클릭한 경우').pipe(
//   map((클릭_이벤트_정보) => 상품_카탈로그[클릭_이벤트_정보.순서]),
//   scan((장바구니, 선택한_상품) => [...장바구니, 선택한_상품], []),
// )

// // 초기값으로 장바구니 총액은 0이다.
// const 장바구니_총액$ = 장바구니$.pipe(
//   map((장바구니) => 장바구니.reduce((누적_가격, 상품) => 누적_가격 + 상품.가격, 0)),
//   startWith(0),
// )

// // 장바구니 총액을 구독한다.
// 장바구니_총액$.subscribe((장바구니_총액) => {
//   화면에_장바구니_총액_그리기(장바구니_총액)
// })


// var 데이터_생산자 = new 데이터_생산자()
// var 데이터_소비자 = new 데이터_소비자(데이터_생산자)

// // false
// if(데이터_소비자.데이터_생성자가_데이터_생성여부_확인하기())
// {
//     데이터_소비자.새_데이터_사용하기() 
// }

// var 새_데이터 = '발생 시점은 생산자가 결정합니다.'
// 데이터_생산자.데이터_생성하기(새_데이터)

// // true
// if(데이터_소비자.데이터_생성자가_데이터_생성여부_확인하기())
// {
//     데이터_소비자.새_데이터_사용하기() 
// }

var 데이터_소비자 = {
    데이터_생성자 : null, 
    constructor(데이터_생성자) {
        this.데이터_생성자 = 데이터_생성자
    },
    데이터_생성자가_데이터_생성여부_확인하기() {
        return this.데이터_생성자.새_데이터_가져오기() !== undefined
    }
}

var 데이터_생산자_A = new 데이터_생성자_A()
var 데이터_생산자_B = new 데이터_생성자_B()

var 데이터_소비자_A = new 데이터_소비자(데이터_생성자_A, 데이터_생성자_B)
var 데이터_소비자_B = new 데이터_소비자(데이터_생성자_A, 데이터_생성자_B)
var 데이터_소비자_C = new 데이터_소비자(데이터_생성자_A, 데이터_생성자_B)



// var 서브젝트 = {
//     옵저버_목록: [],
//     종료하기() {
//         for(옵저버 of 옵저버_목록) {
//             옵저버.notify('서브젝트가 종료합니다.')
//         } 
//     },
//     에러_발생시키기() {
//        try {
//          throw new Error('에러다!')
//        } catch (애러) {
//         for(옵저버 of 옵저버_목록) {
//             // 옵저버에게 에러 타입을 전달하는 게 아닌, 문자열을 전달
//             옵저버.notify('서브젝트에 에러가 발생했어요')
//         } 
//        }
//     }
// }

// var 옵저버 = {
//     notify (상태) {
//         if(상태 === '서브젝트가 종료합니다') {
//             // 단순 문자열만으로 종료인지 명시적으로 파악이 가능한가?
//         } else if(상태 === '서브젝트에 에러가 발생했어요'){
//             // 단순 문자열만으로 종료인지 명시적으로 파악이 가능한가?
//         }
//     }
// }










// import { Observable } from 'rxjs';

// const observable = new Observable(function subscribe(subscriber) {
//   try {
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.next(3);
//     subscriber.complete();
//   } catch (err) {
//     subscriber.error(err); 
//   }
// }).subscribe({
//   next: (value) => console.log('value ', value),
//   complete: () => console.log('complete'),
//   error: (err) => console.error('error', err),
// });


// import { Observable } from 'rxjs';

// const observable = new Observable(function subscribe(subscriber) {
//   try {
//     subscriber.next(1);
//     subscriber.next(2);
//     subscriber.next(3);
//     throw new Error('의도적으로 애러 발생시키기');
//     subscriber.complete();
//   } catch (err) {
//     subscriber.error(err);
//   }
// }).pipe(
//     map((value)=> value * 2),
//     filter((value) => value >= 4)
// ).subscribe({
//   next: (value) => console.log('value ', value),
//   complete: () => console.log('complete'),
//   error: (err) => console.error('error', err),
// });


var 구독 = fromEvent(화면, "클릭").pipe(
    map((클릭_이벤트_정보)=>{
        if(클릭_이벤트_정보.x_좌표 > 1000) {
            throw new Error('좌표가 한계치를 넘음!')
        } else {
            return 클릭_이벤트_정보
        }
    }),
    filter((클릭_이벤트_정보) => 클릭_이벤트_정보.x_좌표),
    map((x_좌표) => x_좌표 * 1000),
).subscribe({
    next:(x_좌표) => console.log('x_좌표', x_좌표),
    error: (err) => console.error('에러 정보', err)
})



// const observable = new Observable(function subscribe(subscriber) {
//     try {
//       subscriber.next(1);
//       subscriber.next(2);
//       subscriber.next(3);
//       throw new Error('의도적으로 애러 발생시키기');
//       subscriber.complete();
//     } catch (err) {
//       subscriber.error(err);
//     }
//   }).pipe(
//       map((value)=> value * 2),
//       filter((value) => value >= 4)
//   ).subscribe({
//     next: (value) => console.log('value ', value),
//     complete: () => console.log('complete'),
//     error: (err) => console.error('error', err),
//   });
  

const map = curry((옵저버블, map_콜백함수) => {
    if(옵저버블.상태 === 에러 | 옵저버블.상태 === 완료) {
        return 옵저버블
    }

    try {
        return new 옵저버블((구독하기)=> {
            구독하기.next(map_콜백함수(옵저버블.값))
        }) 
    } catch(err) {
        throw new 옵저버블((구독하기)=> {
            구독하기.error(err)
        }) 
    }
})

new Promise((이행하기, 거부하기)=> {

    if    

})



promise1()
  .then(() => promise2())
  .then(() => promise3())
  .then(() => promise4())
  .then(() => {
    console.log("All promises resolved!");
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });
