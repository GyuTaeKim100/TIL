import React, { Fragment } from 'react';
import TodoItem from '../TodoItem'
import TodoItemList from '../TodoItemList';
import TodoInsert from '../TodoInsert'

const TodoTemplate = ({todos, onToggle, onModify, onDelete, onAdd}) => {
    console.count('todoTemplate')
    return <div data-testid={'todo-template'}>
        <TodoItemList todos={todos} onToggle={onToggle} onModify={onModify} onDelete={onDelete} />
        <TodoInsert onAdd={onAdd}/>
    </div> 
};

export default TodoTemplate;