import { useState, useRef } from 'react'

import dayjs from 'dayjs'

import { TTodoData, TInsertFormFieldsValue, TFilterTodosRules } from './types'
import { todoPriorityEnum, todoStatusEnum } from './enums'

import TodosTeplate from "../TodosTemplate"
import InsertTodo from '../InsertTodo'
import FilterTodos from '../FilterTodos'
import TodoItemList from '../TodoItemList'

const DEFAULT_TODO_ID = 0

const defaultFilterTodosRules: TFilterTodosRules = {
    prioritySet: new Set([...Object.values(todoPriorityEnum).map(value => value)]), // 중요도 '모두' 초기화
    statusSet: new Set([...Object.values(todoStatusEnum).map(value => value)]) // 상태 '모두' 초기화
}

const Todos = () => {
    const [todosData, setTodosData] = useState<Array<TTodoData>>([])
    const [filterTodosRules, setFilterTodosRules] = useState<TFilterTodosRules>(defaultFilterTodosRules)
    const nextIdRef = useRef(DEFAULT_TODO_ID)

    const handleFilter = ({ statusSet, prioritySet }: TFilterTodosRules) => {
        const nextFilterTodosRules = {
            statusSet: statusSet,
            prioritySet: prioritySet
        }
        setFilterTodosRules(nextFilterTodosRules)
    }

    const handleUpdateTodoItem = ({ id, todoStatus, content, priority }: TTodoData) => {
        const nextTodosData = todosData.map((element) => {
            const isTarget = element.id === id
            if (isTarget) {
                const upsertDate = dayjs()
                return {
                    ...element,
                    todoStatus,
                    priority,
                    content,
                    upsertDate
                }
            } else {
                return { ...element }
            }
        })
        setTodosData(nextTodosData)
    }

    const handleInsert = (insertFormFieldsValue: TInsertFormFieldsValue) => {
        const content = insertFormFieldsValue.content
        const priority = insertFormFieldsValue.priority as todoPriorityEnum
        const upsertDate = dayjs()

        const id = (function getNextId() {
            const nextId = nextIdRef.current
            nextIdRef.current++
            return nextId
        })();

        const newTodoData: TTodoData = {
            id,
            todoStatus: todoStatusEnum.PROGRESS,
            content,
            priority,
            upsertDate,
        }
        const nextTodosData = [...todosData, newTodoData]
        setTodosData(nextTodosData)
    }

    const filteredTodosDatas = (function getFilterTodosDatas() {
        const { prioritySet, statusSet } = filterTodosRules

        const result = todosData.filter(function filterByPriorty(todoData) {
            const hasCurrentPriority = (function getHasCurrentPriority() {
                const { priority } = todoData

                const has = prioritySet.has(priority)
                return has
            })()

            return hasCurrentPriority
        }).filter(function filterByTodoStatus(todoData) {
            const hasCurrentTodoStatus = (function getHasCurrentTodoStatus() {
                const { todoStatus } = todoData

                const has = statusSet.has(todoStatus)
                return has
            })()

            return hasCurrentTodoStatus
        })

        return result
    })()

    return <article className='todos'>
        <h1 className="article-heading">todos</h1>
        <TodosTeplate
            form={<InsertTodo
                onInsert={handleInsert}
            />}
            filter={<FilterTodos
                filterTodosRules={filterTodosRules}
                onHandleFilter={handleFilter}
            />}
        >
            <TodoItemList
                todosData={filteredTodosDatas}
                onHandleUpdateTodoItem={handleUpdateTodoItem}
            />
        </TodosTeplate>
    </article>
}

export default Todos