const greetingForm = document.querySelector('.js-greeting-form');
const inputUserName = greetingForm.querySelector('input');
const greeting = document.querySelector('.js-greetings');

const USER_NAME_LS= 'currentUser'; ///<로컬 스토리지에 등록된 유저 이름의 키 값.

/**
 * @brief 유저 이름을 입력 받을 시 form 이벤트 핸들러
 */
function handleSubmit(event){

    event.preventDefault();
    const userName =  inputUserName.value;
    localStorage.setItem(USER_NAME_LS, userName);
    paintUserName(userName);
}

/**
 * @brief 유저 이름을 입력 받는다.
 */
function askUserName(){

    greetingForm.classList.add('showing');
    greeting.classList.remove('showing');

    greetingForm.addEventListener('submit', handleSubmit);
}

/**
 * @brief 유저 이름을 출력한다.
 */
function paintUserName(text){

    greetingForm.classList.remove('showing');
    greeting.classList.add('showing');
    greeting.innerHTML = `hello ${text}`;

}

/**
 * @brief 사용자 이름이 존재하는 경우 로드하고 아닌 경우 사용자 이름을 입력 받는다.
 */
function loadUserName(){

    const userName = localStorage.getItem(USER_NAME_LS);

    if( null === userName){

        askUserName();
    }
    else{

        paintUserName(userName);
    }
}

/**
 * @brief 사용자 이름이 존재하는 경우 로드하고 아닌 경우 사용자 이름을 입력 받는다.
 */
function init(){

    loadUserName();
}

init();