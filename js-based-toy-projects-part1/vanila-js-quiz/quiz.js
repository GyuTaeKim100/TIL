const question_element = document.getElementById("question");
const choise_btn_elements = document.getElementsByClassName("btn");
const btns_div_element =document.getElementsByClassName("buttons")[0];
const progress_element = document.getElementById("progress");


/**
 * @brief 문제에 대한 정보를 담은 클래스.
 */
class Question{

    constructor(quiz_object){

        this._question = quiz_object._question;
        this._answer_id = quiz_object._answer_id;
        this._example = new Array();

        for(var i = 0 ; i < quiz_object._example.length ; i++){
            this._example.push( quiz_object._example[i] );
        }
    }
}

/**
 * @brief 퀴즈 시작, 퀴즈 종료, 퀴즈 통계 정보, 퀴즈 정답 여부 확인 등을 관리하는 클래스.
 */
class QuizManager{

    /**
     * @brief 해당 번호의 문제 페이지를 생성한다.
     */
    settingCurQuiz(){

        //문제 설정
        const question = this._quizs[this._quiz_idx]._question;
        question_element.innerHTML = question;

        //보기 설정
        for(var i =0 ; i < choise_btn_elements.length; i++){

            choise_btn_elements[i].innerHTML = this._quizs[this._quiz_idx]._example[i];
        }

        //진행 정보 설정
        const total_cnt_quiz = this._quizs.length;
        const idx_quiz = this._quiz_idx +1;

        progress_element.innerHTML = (idx_quiz)+ "/" + (total_cnt_quiz);
    }

    /**
     * @brief 퀴즈를 시작한다.
     */
    startQuiz(){

        btns_div_element.style.display = "block";
        this._quiz_idx = 0;
        this._cnt_answer = 0;
        this.settingCurQuiz();
    }

    /**
     * @brief 퀴즈를 종료한다. 퀴즈 관련 통계 정보를 제공한다.
     */
    endQuiz(){

        const total_cnt_quiz = this._quizs.length;
        const cnt_answer = this._cnt_answer;

        const point_per_question = 100 / total_cnt_quiz;
        const user_total_point = cnt_answer * point_per_question;

        btns_div_element.style.display = "none";
   
        //결과 출력
        question_element.innerHTML="결과 <br>" +cnt_answer +"/" +total_cnt_quiz+"<br>당신의 점수:"+user_total_point;

        /* 타이머 실행 */
        var tmp = this;
        var loopTimer = window.setTimeout(function(){ 
            tmp.startQuiz()
        }, 5000);
    }

    /**
     * @brief 사용자 입력 여부가 정답인지 체크한다.
     * @param {} event 이벤트 오브젝트 
     */
    checkAnswer(event){

        const choise_id_from_user = event.getAttribute('id');
        const answer_id = this._quizs[this._quiz_idx]._answer_id;

        if( answer_id == choise_id_from_user){

            //정답입니다.
            alert( '정답입니다.' );
            this._cnt_answer++;
        }
        else{

            //틀렸습니다.
            alert( '틀렸습입니다.' );
        }

        //다음 문제 또는 채점 시작
        this._quiz_idx++;
        const total_cnt_quiz = this._quizs.length;
        const idx_quiz = this._quiz_idx +1;

        if( total_cnt_quiz+1 > idx_quiz){
                
            this.settingCurQuiz();
        }
        else{

            this.endQuiz();
            alert("채점 시작");
        }

    }

    /**
     * @brief 생성자
     */
    constructor(){

        this._quizs =[];
        this._quiz_idx= 0;
        this._cnt_answer = 0;
        
        //문제 1 생성
        const Question1 = new Object();
        Question1._answer_id = 1;
        Question1._question ="1번 문제"
        Question1._example = new Array();
        Question1._example.push("1번 보기");
        Question1._example.push("2번 보기");
        Question1._example.push("3번 보기");
        Question1._example.push("4번 보기");

        const tmp1 = new Question(Question1);
        this._quizs.push(tmp1);


        //문제 2 생성
        const Question2 = new Object();
        Question2._answer_id = 1;
        Question2._question ="2번 문제"
        Question2._example =  new Array();
        Question2._example.push("1번 보기");
        Question2._example.push("2번 보기");
        Question2._example.push("3번 보기");
        Question2._example.push("4번 보기");

        const tmp2 = new Question(Question2);
        this._quizs.push(tmp2);

        //문제 3 생성
        const Question3 = new Object();
        Question3._answer_id = 1;
        Question3._question ="3번 문제"
        Question3._example =  new Array();
        Question3._example.push("1번 보기");
        Question3._example.push("2번 보기");
        Question3._example.push("3번 보기");
        Question3._example.push("4번 보기");

        const tmp3 = new Question(Question3);
        this._quizs.push(tmp3);


        //문제 4 생성
        const Question4 = new Object();
        Question4._answer_id = 1;
        Question4._question ="4번 문제"
        Question4._example =  new Array();
        Question4._example.push("1번 보기");
        Question4._example.push("2번 보기");
        Question4._example.push("3번 보기");
        Question4._example.push("4번 보기");

        const tmp4 = new Question(Question4);
        this._quizs.push(tmp4);

        //버튼에 이벤트 등록
        for(var i = 0 ; i < choise_btn_elements.length; i++){

            const tmp = this;
            choise_btn_elements[i].addEventListener("click", function(){

                tmp.checkAnswer(this);
            });
        }
    }
}

const g_quiz_manager = new QuizManager();

function init(){

    g_quiz_manager.startQuiz();
}

window.onload = function(){

    init();
}