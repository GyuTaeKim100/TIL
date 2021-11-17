const toDoForm = document.querySelector('.js-todo');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-todo-list');

const g_TODO_LIST_LC = 'toDoList';    ///<로컬 스토리지 킷 값

let g_todo_list = [];                     ///<투두 리스트


/**
 * brief 클릭 된 todo리스트의 엘레먼트를 삭제한다.
 */
function removeToDoElement(event){

    const curBtn = event.target;
    const li = curBtn.parentNode;
    const ul = li.parentNode;
    const id = li._id;
    console.log(id);

    ul.removeChild(li);

    const newg_todo_list = g_todo_list.filter(function(todo){
        console.log(`todo._id = ${todo._id}`);
        console.log(`id = ${id}`);
        return parseInt(todo._id) !== parseInt(id);
    });

    g_todo_list= newg_todo_list;
    localStorage.setItem(g_TODO_LIST_LC, JSON.stringify(g_todo_list));
}

/**
 * brief todo todo리스트 목록 엘레멘트를 추가한다.
 */
function addToDoElement(text){

    const li= document.createElement('li');

    
    //삭제 버튼을 같이 추가한다.
    //삭제 버튼 이벤트를 등록한다.
    const delBtn = document.createElement('button');
    delBtn.addEventListener('click', removeToDoElement);

    const span = document.createElement('span');

    const id = g_todo_list.length +1;

    span.innerText = text;
    delBtn.innerText = 'X';

    li.appendChild(delBtn);
    li.appendChild(span);
    li._id = id;

    toDoList.appendChild(li);

    //리스트에 새 목록을 추가한다.
    const toDoObj = {
        _id : id,
        _text : text
    };
    g_todo_list.push(toDoObj);

    //로컬 스토리지에 저장한다.
    localStorage.setItem(g_TODO_LIST_LC, JSON.stringify(g_todo_list));
}

/**
 * brief todo 등록용 이벤트 핸들러
 */
function handleSubmit(event){

    event.preventDefault();
    const text = toDoInput.value;
    addToDoElement(text);
}

/**
 * brief 기존 todo목록을 LS에서 불러온다.
 */
function loadToDoList(){

    const todo = JSON.parse( localStorage.getItem(g_TODO_LIST_LC) );

    if( todo !==  null){
    todo.forEach(function(todoElement){

        addToDoElement(todoElement._text);
    });
    }
}

/**
 * brief todo 추가 이벤트를 등록하고 기존 todo목록을 LS에서 불러온다.
 */
function init(){

    toDoForm.addEventListener('submit', handleSubmit);
    loadToDoList();
}

init();