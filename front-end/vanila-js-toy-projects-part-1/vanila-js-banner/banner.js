const banner_wrap_element = document.getElementById("banner_wrap");
const background_of_banner_element = document.getElementById('banner');
const balloons_elements = document.getElementsByTagName("img");
const banner_toggle_btn_element = document.getElementById("toggle");
const sound_btn_element = document.getElementById("sound_btn");

let balloons = [];  //<발룬 객체 저장 배열

/**
 * @brief 배너 내 애니메이션 동작하는 풍선 객체 클래스
 */
class Balloon{

    /**
     * @param init_object 풍선 객체에 대한 초기 설정 값이 들어있다. 
     */
    constructor(init_object){

        this._x = init_object._x;
        this._y = init_object._y;
        this._speed = init_object._speed;

        this._balloon_height = init_object._balloon_height;
        this._banner_height = init_object._banner_height;

        this._balloon_element = init_object._ballon_element;
        this._balloon_element.style.top =  this._y + 'px';
        this._balloon_element.style.left =  this._x + 'px';
    }

    /**
     * @brief 풍선이 설정값에 따라 이동한다.
     */
    moveBalloon(){

        this._y -= this._speed;

        if(this._y  <  -this._balloon_height ){

            this.resetBalloon();
        }
        this._balloon_element.style.top = this._y + 'px';
    }

    /**
     * @brief 풍선이 배너 밖으로 나간 경우 초기화 한다.
     */
    resetBalloon(){

        this._y = this._banner_height;
    }
}

/**
 * @brief 배너 열기/닫기 버튼 누를 시 토글 핸들러
 */
function toggleBanner(){

    const now_banner_state = background_of_banner_element.getAttribute('class');

    if( "active" ==  now_banner_state){

        background_of_banner_element.removeAttribute('class');
        banner_toggle_btn_element.innerHTML ="배너 열기";
        return false;
    }
    else{

        background_of_banner_element.setAttribute('class', 'active');
        banner_toggle_btn_element.innerHTML ="배너 닫기";
        return false;
    }

}

/**
 * @brief 소리 이미지 버튼 누를 시 토글 핸들러
 */
function ToggleSound(){

    const sound_state  = sound_btn_element.getAttribute("class");

    if( "active" ==sound_state){

        sound_btn_element.removeAttribute("class");
        sound_btn_element.setAttribute("src", 'images/sound_off.png');
    }
    else{

        
        sound_btn_element.setAttribute("class", "active");
        sound_btn_element.setAttribute("src", 'images/sound_on.png');

    }
}

/**
 * @brief 배너내 모든 풍선을 이동시킨다.
 */
function lotateBalloon(){

    //인터벌 등록
    for(var i = 0 ; i <balloons.length ; ++i){

        balloons[i].moveBalloon();
    }
}

function init(){

    const banner_info = background_of_banner_element.getBoundingClientRect();
    const banner_height = banner_info.height;
    const banner_width = banner_info.width; 

    const balloon_info = balloons_elements[0].getBoundingClientRect();
    const balloon_height = balloon_info.height;
    const balloon_width = balloon_info.width;

    //풍선 설정
    for(var i = 0 ; i < balloons_elements.length ; i++){

        let init_object = new Object();
        init_object._x =  balloon_width* i;
        init_object._y = 30 * i + 10;
        init_object._speed = 10;
        init_object._ballon_element = balloons_elements[i];
        init_object._banner_height =banner_height;
        init_object._balloon_height = balloon_height;
        const newBalloon = new Balloon(init_object);
        balloons.push(newBalloon);
    }


    //인터벌 설정
    setInterval( function(){ lotateBalloon() }, 100);

    //토글 이벤트 등록
    banner_toggle_btn_element.addEventListener( "click", function() { toggleBanner() });

    //사운드 이벤트 등록
    sound_btn_element.addEventListener( "click", function(){ ToggleSound() });
}

window.onload = function() { 

    init();
}

