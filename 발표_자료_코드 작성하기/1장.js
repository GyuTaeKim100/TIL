
// 특정 Button의 DOM Element를 불러온다. 
const $el = document.getElementById("some-button");

// 특정 Button의 내용을 DOM Element의 속성에 직접 접근해서 변경한다.
$el.textContent = "imperative programming";


const SomeButton = ({content}) => 
    <Button>
        {content}
    </Button>


import {fromEvent} from 'rx'

fromEvent(화면,'click'o)


import { Observable } from 'rxjs';

const 외부_부수효과_스트림 = new Observable((subscriber) => {
 
  외부_부수효과_입력_리스너.on(
    (외부_입력값)=> {
      try{
        subscriber.next(외부_입력값)
      } catch (에러) {
        subscriber.error(에러);

      }
    }
  )
});

const 소비자_A = new 외부_부수효과_스트림().pipe(
  // 소비자 목적에 알맞는 비동기 오퍼레이터를 합성한다.
).subscrib(
  // 소비자가 수신한 값을 목적에 알맞게 처리한다.
)

const 소비자_B = new 외부_부수효과_스트림().pipe(
  // 소비자 목적에 알맞는 비동기 오퍼레이터를 합성한다.
).subscrib(
    // 소비자가 수신한 값을 목적에 알맞게 처리한다.
)

// ... 생략