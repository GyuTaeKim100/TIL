import './insertTodo.css'

import { useState } from 'react'
import { TInsertFormFieldsValue } from '../Todos/types'
import { todoPriorityEnum } from '../Todos/enums'

const inputPlaceholder = '할 일을 입력하세요. 값이 없는 경우 추가가 되지 않습니다'
const defaultPeriority = todoPriorityEnum.VERY_IMPORTANT

const defaultContent = ''

export interface IProps {
    onInsert: (formFieldsValue: TInsertFormFieldsValue) => void
}

const TodoForm = ({ onInsert }: IProps) => {
    const [content, setContent] = useState(defaultContent)
    const [priority, handleSetPriority] = useState<todoPriorityEnum>(defaultPeriority)

    const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value)
    }

    const handleChangePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const priority = e.target.value as todoPriorityEnum
        handleSetPriority(priority)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const fieldsValue: TInsertFormFieldsValue = {
            content, priority
        }

        const isFieldValidating = (function getIsFieldValidating() {
            if (content === defaultContent) {
                return false
            } else {
                return true
            }
        })()


        if (!isFieldValidating) {
            return
        } else {
            onInsert(fieldsValue)
        }

        (function resetFormFields() {
            setContent(defaultContent)
            handleSetPriority(defaultPeriority)
        })()
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
                                Object.values(todoPriorityEnum).map((value, index) => {
                                    return <option
                                        key={index}
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

export default TodoForm