/**
 * 문제 요구사항
 * 1. calculate 함수 구현
 *
 * 실행
 * - ts-node calculator.ts
 */

/**
 * Let's make a calculator 🧮
 */
console.log(calculate("add", 1, 3)); // 4
console.log(calculate("substract", 3, 1)); // 2
console.log(calculate("multiply", 4, 2)); // 8
console.log(calculate("divide", 4, 2)); // 2
console.log(calculate("remainder", 5, 2)); // 1

type Command = "add" | "substract" | "multiply" | "divide" | "remainder";

function calculate(command: Command, a: number, b: number): number {
  switch (command) {
    case "add":
      return a + b;
    case "substract":
      return a - b;
    case "multiply":
      return a * b;
    case "remainder":
      return a % b;
    default:
      throw Error("unkonw command");
  }
}

/**
 * 참고
 * - https://academy.dream-coding.com/courses/take/typescript/lessons/20065401-3-3
 */
