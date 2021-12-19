import { useState, useCallback } from 'react'

import dayjs from 'dayjs'

import { TTodo, THandleInsertProps, TTodos } from '../types'
import { Priority, Status } from '../enums'

import useNumbericId from '../../../hooks/useNumbericId'

const initialTodoId = 0
const defaultStatus = Status.PROGRESS

const useTodosBase = () => {
  const [todos, setTodos] = useState<TTodos>([])
  const { generateNumbericId } = useNumbericId(initialTodoId)

  const handleUpdate = useCallback((props: TTodo) => {
    const { id } = props
    setTodos(function updateTodoById(todos) {
      return todos.map((element) => {
        const isTarget = element.id === id
        if (isTarget) {
          const updatedAt = dayjs()
          return {
            ...element,
            ...props,
            updatedAt,
          }
        } else {
          return element
        }
      })
    })
  }, [])

  const handleInsert = useCallback((props: THandleInsertProps) => {
    setTodos(function insertTodo(prevState) {
      const priority = props.priority as Priority
      const createdAt = dayjs()
      const updatedAt = createdAt
      const status = defaultStatus

      const id = generateNumbericId()

      const newTodoData: TTodo = {
        ...props,
        id,
        status,
        priority,
        createdAt,
        updatedAt,
      }

      const nextState = [...prevState, newTodoData]
      return nextState
    })
  }, [])

  return {
    todos,
    handleUpdate,
    handleInsert,
  }
}

export default useTodosBase
