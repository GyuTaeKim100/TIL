const prev_month_href_element = document.getElementById("prev");
const next_month_href_element = document.getElementById("next");

const year_span_element = document.getElementsByClassName("year")[0];
const month_span_element = document.getElementsByClassName("month")[0];

//초기 달력값 
let new_year= 2018; 
let new_month = 11;

/**
 * @brief 달력을 설정한다.
 */
function setCalendar(){

    var d = new Date(new_year, new_month, 1);

    //월별 일수 구하기
    var d_length = 32 - new Date(new_year, new_month, 32).getDate();

    var year = d.getFullYear();
    var month = (d.getMonth() +1);
    var day = d.getDay();

    //년, 월 출력
    year_span_element.innerHTML = year;
    month_span_element.innerHTML = month;

    const days_td_elements = document.querySelectorAll('tr td');

    //달력 숫자 비우기
    for(var i = 0 ; i <= day ; i++){

        days_td_elements[i].innerHTML = "&nbsp";
    }

    //달력 숫자 채우기

    for(var i = 1 ; i <= d_length ; i++){

        days_td_elements[day + i -1].innerHTML = i;
    }
}

/**
 * @brief 이전 달로 설정한다.
 */
function setPrevMonth(event){

    event.preventDefault();
    console.log("prev");
    //event.preventDefault();
    new_month = new_month -1;
    if(new_month == -1){

        new_month = 11;
        new_year--;
    }

    setCalendar();
}

/**
 * @brief 다음 달로 설정한다.
 */
function setNextMonth(event){

    event.preventDefault();
    console.log("next");

    new_month = new_month +1;
    if(new_month ==12){

        new_month = 0;
        new_year++;
    }

    setCalendar();
}

function init(){

    setCalendar();

    //prev 이벤트 등록
    prev_month_href_element.addEventListener("click", function(event){
      
        setPrevMonth(event);
    });

    next_month_href_element.addEventListener("click", function(event){
      
        setNextMonth(event);
    });
}

init();