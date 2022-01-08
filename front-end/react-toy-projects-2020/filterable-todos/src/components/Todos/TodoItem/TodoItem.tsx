import React, { useState, useEffect } from 'react'
import { TTodo } from '../types'
import { Status, Priority } from '../enums'
import './todoItem.css'

const inputPlaceholder = '할 일을 입력하세요. 값을 입력하지 않은 경우 수정이 완료되지 않습니다'

export interface ITodoItemProps {
    todo: TTodo
    onHandleUpdate: (values: TTodo) => void
}

const TodoItem = ({ todo, onHandleUpdate }: ITodoItemProps) => {
    const { status, updatedAt } = todo
    const [isEditMode, setIsEditMode] = useState(false)

    const [content, setContent] = useState(todo.content)
    const [priority, setPriority] = useState(todo.priority)

    const updatedAtAsFormmatedText = updatedAt.format('YYYY-MM-DD HH:mm')
    const isDone = Status.DONE === status

    useEffect(() => {
        (function updateFormFieldValuesByDerivedProps() {
            const { content, priority } = todo
            setContent(content)
            setPriority(priority)
        })()
    }, [todo])

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as Priority)
    }

    const handleToggleCheckBox = () => {
        const status = isDone ? Status.PROGRESS : Status.DONE
        const updateTodoData = {
            ...todo,
            status
        }
        onHandleUpdate(updateTodoData)
    }

    const handleToggleMode = () => {
        setIsEditMode((isEditMode) => !isEditMode)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const enableSubmit = (function checkFieldsValue() {
            if (content === '') {
                return false
            }
            return true
        })()

        if (!enableSubmit) {
            return
        }

        const updateTodoData = {
            ...todo,
            content,
            priority
        }

        // TODO : promise를 이용한 순차 처리 로직 추가 필요
        onHandleUpdate(updateTodoData)
        handleToggleMode()
    }

    const contentClassName = (function createContentClassName() {
        const baseClassName = 'detail-content '
        const statusClassNames = isDone ? 'todo-done' : ''
        const finalClassName = `${baseClassName} ${statusClassNames}`
        return finalClassName
    })()

    return <li
        className={`todo-item`}
        data-testid='todo-item'>
        <div className='check-done-wrapper' >
            <input
                className="check-done"
                data-testid='check-done'
                type='checkbox'
                checked={isDone}
                onChange={handleToggleCheckBox} />
        </div>
        {
            isEditMode ? <form
                className="edit-todo-form"
                data-testid='edit-todo-form'
                onSubmit={handleSubmit}>
                <div className="form-field-items-container">
                    <select
                        className='form-field-item priority-select mb-10px'
                        data-testid='priority-select'
                        placeholder='중요도'
                        value={priority}
                        onChange={handleChangePriority}>
                        {
                            Object.values(Priority).map((value) => {
                                return <option
                                    data-testid='priority-select-option'
                                    key={value}
                                    value={value}>{value}</option>
                            })
                        }
                    </select>

                    <div className='col'>
                        <input
                            className='form-field-item content-input'
                            data-testid='content-input'
                            placeholder={inputPlaceholder}
                            value={content}
                            onChange={handleChangeContent} />
                        <button
                            className='form-field-item submit-button'
                            data-testid='submit-button'
                            type='submit'>수정</button>
                    </div>
                </div>
            </form> :
                <article
                    className='detail-items'
                    data-testid='detail-items'
                    onClick={handleToggleMode}>
                    <div className="detail-item">
                        <label className='detail-label' >중요도 :</label>
                        <em
                            className='detail-content'
                            data-testid='priority'>{priority}</em>
                    </div>

                    <div className="detail-item">
                        <label className='detail-label' >수정일 :</label>
                        <em
                            className='detail-content'
                            data-testid='date'>{updatedAtAsFormmatedText}</em>
                    </div>

                    <div className="detail-item">
                        <h5
                            className={contentClassName}
                            data-testid='content'>{content}</h5>
                    </div>
                </article>
        }
    </li>
}

const MemoizedTodoItem = React.memo(TodoItem)
export default MemoizedTodoItem