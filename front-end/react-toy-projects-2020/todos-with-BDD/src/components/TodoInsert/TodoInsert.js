import React, { Fragment, useCallback, useState, memo, useEffect } from 'react';

const TodoInsert = ({onAdd}) => {
    console.count('TOdoInsert')
    const [inputValue, setInputValue] = useState('')

    const handleClick = useCallback((e) => {
        const eventFrom = e.target.className

        switch(eventFrom) {
            case 'add-button':
                setInputValue('')
                onAdd(inputValue)
                return
        }
    },[inputValue, onAdd])

    const handleChange = useCallback((e) => {
        const eventFrom = e.target.className
        const value = e.target.value

        switch(eventFrom) {
            case 'todo-insert':
                setInputValue(value)
                return
        }
    }, [])

    return <div data-testid='todo-insert'>
        <input value={inputValue} className={'todo-insert'} placeholder={'입력해 주세요'} onChange={handleChange} />
        <button className={'add-button'} onClick={handleClick}>ADD</button>
    </div>
};

export default memo(TodoInsert);
