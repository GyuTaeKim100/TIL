
const result_screen_element = document.getElementsByName("result")[0];
const cal_btns_elements = document.querySelectorAll("input[type=button]");

/**
* @brief 계산기에 숫자 입력한다.
*/
function insertValueToDisplay(value){

    if(result_screen_element.value == 0 ){

        result_screen_element.value=value;
    }
    else{
        result_screen_element.value+=value;
    }
}

/**
 * @brief 계산을 시작한다.
 */
function beginCalculation(){

    try{
        
        result_screen_element.value = eval(result_screen_element.value);
    }
    catch{

        //정상적으로 계산이 이루어 지지 않는 경우 초기화한다.
        initCalculator();
    }
}

/**
 * @brief 계산기 초기화
 */
function initCalculator(){
 
    result_screen_element.value = "0";
}

/**
 * @brief 계산기 내 버튼을 눌렀을 때 처리하는 이벤트 핸들러.
 * @param {*} input_value 누른 버튼의 모양
 */
//입력 이벤트
function HandlePushAnyBtn(input_value){

    if( input_value == "clear"){

        //초기화 한다.
        initCalculator();
    }
    else if(input_value == '='){

        //계산을 시작한다.
        beginCalculation();
    }
    else{

        //계산기 디스플레이에 입력값을 추가한다.
        insertValueToDisplay(input_value);
    }
}


/**
 * @brief 계산기의 각 버튼마다 이벤트를 등록한다.
 */
function init(){

    //계산기 초기화
    initCalculator();

    //입력 이벤트 등록
    for(var i = 0; i < cal_btns_elements.length; i++){

        
        cal_btns_elements[i].addEventListener("click", function(){

            HandlePushAnyBtn(this.value);
        });
    }

}

init();
