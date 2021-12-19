import React, { useState, useEffect } from 'react'
import { TTodoData } from '../Todos/types'
import { todoStatusEnum, todoPriorityEnum } from '../Todos/enums'
import './todoItem.css'

const inputPlaceholder = '할 일을 입력하세요. 값을 입력하지 않은 경우 수정이 완료되지 않습니다'

export interface IProps {
    todoData: TTodoData
    onHandleUpdateTodoItem: (values: TTodoData) => void
}

const TodoItem = ({ todoData, onHandleUpdateTodoItem }: IProps) => {
    const { todoStatus, upsertDate } = todoData
    const [isEditMode, setIsEdmitMode] = useState(false)

    const [content, setContent] = useState(todoData.content)
    const [priority, setPriority] = useState(todoData.priority)

    const upsertDateAsFormmatedText = upsertDate.format('YYYY-MM-DD')
    const isDone = todoStatusEnum.DONE === todoStatus

    useEffect(() => {
        (function updateStates() {
            const { content, priority } = todoData
            setContent(content)
            setPriority(priority)
        })()
    }, [todoData])

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value as todoPriorityEnum)
    }

    const handleToggleCheckBox = () => {
        const nextDoneStatus = isDone ? todoStatusEnum.PROGRESS : todoStatusEnum.DONE
        const updateTodoData = {
            ...todoData,
            todoStatus: nextDoneStatus
        }
        onHandleUpdateTodoItem(updateTodoData)
    }

    const handleToggleMode = () => {
        setIsEdmitMode((isEditMode) => !isEditMode)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const isFieldValidating = (function getIsFieldValidating() {
            if (content === '') {
                return false
            }
            return true
        })()

        if (!isFieldValidating) {
            return
        }

        const updateTodoData = {
            ...todoData,
            content,
            priority
        }

        onHandleUpdateTodoItem(updateTodoData)
        handleToggleMode()
    }

    const extraContentClassName = (function getExtraContentClassName() {
        return isDone ? 'todo-done' : ''
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
                        className='form-field-item priority-select mb-10'
                        data-testid='priority-select'
                        placeholder='중요도'
                        value={priority}
                        onChange={handleChangePriority}>
                        {
                            Object.values(todoPriorityEnum).map((value, index) => {
                                return <option
                                    data-testid='priority-select-option'
                                    key={index}
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
                        <label className='detail-label' >추가일 :</label>
                        <em
                            className='detail-content'
                            data-testid='date'>{upsertDateAsFormmatedText}</em>
                    </div>

                    <div className="detail-item">
                        <h5
                            className={`detail-content ${extraContentClassName}`}
                            data-testid='content'>{content}</h5>
                    </div>
                </article>
        }
    </li>
}

export default React.memo(TodoItem)