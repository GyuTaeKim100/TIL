/**
 * 문제 요구사항
 * 1. move 함수 구현
 * 
 * 실행 
 * - ts-node game.ts
 */


/**
 * Let's make a game 🕹
 */
const position = {x:0, y:0};

type Move = 'up'| 'down'| 'left'| 'right';

function move(direction: Move): void {
    switch(direction) {
        case 'up':
            position.y +=1;
            break;
        case 'down':
            position.y-=1;
            break;
        case 'left':
            position.x-=1;
            break;
        case 'right':
            position.x+=1;
            break;
        default:
            throw new Error(`unkonw direction: ${direction}`);
}

console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}



/**
 * 참고
 * - https://academy.dream-coding.com/courses/take/typescript/lessons/20065407-3-4
 */