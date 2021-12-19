import './insertTodo.css'

import { useState } from 'react'
import { THandleInsertProps } from '../types'
import { Priority } from '../enums'

const inputPlaceholder = '할 일을 입력하세요. 값이 없는 경우 추가가 되지 않습니다'
const defaultPeriority = Priority.VERY_IMPORTANT
const defaultContent = ''
export interface IInsertTodoProps {
    onInsert: (formFieldsValue: THandleInsertProps) => void
}

const InsertTodo = ({ onInsert }: IInsertTodoProps) => {
    const [content, setContent] = useState(defaultContent)
    const [priority, handleSetPriority] = useState<Priority>(defaultPeriority)

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const priority = e.target.value as Priority
        handleSetPriority(priority)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const fieldsValue: THandleInsertProps = {
            content, priority
        }

        const enableSubmit = (function checkFieldsValue() {
            if (content === defaultContent) {
                return false
            } else {
                return true
            }
        })()

        if (!enableSubmit) {
            return
        }

        (function resetFormFields() {
            setContent(defaultContent)
            handleSetPriority(defaultPeriority)
        })()

        onInsert(fieldsValue)
    }

    return <div
        className="add-todo-form-container"
        data-testid='insert-todo'
    >
        <form
            className='add-todo-form'
            onSubmit={handleSubmit}>
            <div className="form-field-items-container">
                <div className='col center'>
                    <div className='row center'>
                        <select
                            className='form-field-item priority-select ml-10'
                            data-testid="priority-select"
                            placeholder='중요도'
                            value={priority}
                            onChange={handleChangePriority}
                        >
                            {
                                Object.values(Priority).map((value) => {
                                    return <option
                                        key={value}
                                        data-testid="priority-select-option"
                                        value={value}
                                    >
                                        {value}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <input
                        className='form-field-item content-input border-none'
                        data-testid="content-input"
                        placeholder={inputPlaceholder}
                        value={content}
                        onChange={handleChangeContent}
                    />
                    <button
                        className='form-field-item submit-button'
                        data-testid="submit-button"
                        type="submit">추가</button>
                </div>
            </div>
        </form>
    </div>
}

export default InsertTodo