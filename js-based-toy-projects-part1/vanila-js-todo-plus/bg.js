// const body= document.querySelector('body');

// const IMG_NUMBER = 3; ///<총 이미지 갯수

// /**
//  * @brief 해당 이미지를 배경으로 설정한다.
//  * @param imgNumber : 이미지 번호
//  */
// function paintImage(imgNumber){

//     const image = new Image();
//     image.src = `images/${imgNumber +1}.jpg`;
//     image.classList.add('bgImage');
//     body.prepend(image);
// }

// /**
//  * @return 총 이미지 갯수 이내의 랜덤한 수를 반환한다.
//  */
// function genRandom(){

//     const number= Math.floor(Math.random() * IMG_NUMBER);
//     return number;
// }

// /**
//  * @brief 랜덤한 이미지를 배경으로 설정한다.
//  */
// function init(){
//     const randomNumber = genRandom();
//     paintImage(randomNumber);

// }


// init();