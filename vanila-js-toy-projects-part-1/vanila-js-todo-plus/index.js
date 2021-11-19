const title = document.querySelector('.js-greetings greeting');

const BASE_COLOR = '#34495e';
const OTHER_COLOR = '#7f8c8d';


/**
 * @brief 글자 색을 변경한다. 
 */
function handleClick(){

    const currentColor = title.style.color;
    if(currentColor === BASE_COLOR){

        title.style.color = OTHER_COLOR;
    }
}

function init(){

    title.style.color = BASE_COLOR;
    title.addEventListener('click', handleClick);

}

init();
