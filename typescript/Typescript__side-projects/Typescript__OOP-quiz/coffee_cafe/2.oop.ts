/**
 * 객체지향으로 커피 가게 만들기
 */

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    coffeeBeans: number = 0; // instance(obeject) level

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffe beans!");
      }

      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots: shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMaker(32);
  console.log(maker);

  const maker2 = new CoffeeMaker(32);
  console.log(maker2);

  const maker3 = CoffeeMaker.makeMachine(3);
  console.log(maker3);

  // 개선이 필요한 점
  //
  // 캡슐화 적용이 필요하다.
  // 근거는 maker4에서 coffeeeBeans를 통해 인스턴스 내부의 coffeeBeans에 접근 중이다.
  // 특히 접근 시 -50은 invalid 한 값이다.
  const maker4 = new CoffeeMaker(48);
  maker4.coffeeBeans = 3;
  maker4.coffeeBeans = -50; // invalid
}

/**
 * static의 실제 예시
 *
 * Math.abs
 * Math.PI
 *
 * Math를 프로그래머가 별도로 생성하지 않았으나, abs, PI는 이미 생성된 Math Class의 메서드 이다.
 */
