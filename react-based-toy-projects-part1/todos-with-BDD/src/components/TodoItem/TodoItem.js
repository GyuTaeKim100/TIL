import React, { Fragment, useCallback, useState, memo, useEffect } from 'react';

const TodoItem = ({todo, onToggle, onModify, onDelete}) => {
    console.count('todoItem')
    const {id, text, done} = todo
    const [isEditMode, setIsEditMode] = useState(false)
    const [inputValue, setInputValue] =useState('')

    const handleClick = useCallback((e) => {
        console.count('handleClick')
        const eventFrom = e.target.className

        switch(eventFrom) {
            case 'ok-button':
                setIsEditMode(false)
                onModify({id:id, text:inputValue})
                return
            case 'cancel-button': 
                setIsEditMode(false)
                return
            case 'todo-text':
                onToggle(id)
                return
            case 'delete-button':
                onDelete(id)
                return
            case 'modify-button':
                setInputValue(text)
                setIsEditMode(true)
                return
        }
    },[id, inputValue, onDelete, onModify, onToggle])

    const handleChange = useCallback((e) => {
        const eventFrom = e.target.className
        const value = e.target.value

        switch(eventFrom) {
            case 'todo-input':
                setInputValue(value)
                return
        }
    }, [])

    if(isEditMode) {
        return <div data-testid="edit-container">
        <input  className={'todo-input'} data-testid="todo-item_input" placeholder={'입력해 주세요'} value={inputValue} onChange={handleChange}/>
        <button className={'ok-button'} data-testid="todo-item_ok-button" onClick={handleClick}>OK</button>
        <button className={'cancel-button'} onClick={handleClick}>CANCEL</button>
    </div>;
    }

  return <div data-testid="default-container">
      <span className={'todo-text'} onClick={handleClick}
        style={{
            textDecoration: done ? 'line-through' : 'none'
        }}
      >{text}</span>
      <button className={'delete-button'} onClick={handleClick}>DELETE</button>
      <button className={'modify-button'} onClick={handleClick}>MODIFY</button>
  </div>;
};

export default memo(TodoItem);
