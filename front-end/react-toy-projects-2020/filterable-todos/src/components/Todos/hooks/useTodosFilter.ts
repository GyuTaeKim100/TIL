import { useCallback, useReducer } from 'react'

import { fromJS, setIn } from 'immutable'

import {
  TTodo,
  TTodos,
  TTodosFilterOptions,
  TCheckTypeItem,
  THandleFilterProps,
} from '../types'

import { Priority, Status } from '../enums'

const useTodosFilter = (todos: TTodos) => {
  const optionsReducer = useReducer(reducer, initialTodosFilterOptions)
  const todosFilterOptions = {
    ...optionsReducer[0],
    dispatch: optionsReducer[1],
  }

  const handleFilter = useCallback((props: THandleFilterProps) => {
    todosFilterOptions.dispatch(props)
  }, [])

  const filteredTodos = (function filterTodos() {
    const { priorities, statuses } = todosFilterOptions

    const result = todos
      .filter(function filterByPriority(element: TTodo) {
        const { priority } = element
        const isActivePriority = (function checkPriority() {
          const has = priorities.some(
            (element: TCheckTypeItem) =>
              element.key === priority && element.active
          )
          return has
        })()
        return isActivePriority
      })
      .filter(function filterByStatus(element: TTodo) {
        const { status } = element
        const isActiveStatus = (function checkStatus() {
          const has = statuses.some(
            (element: TCheckTypeItem) =>
              element.key === status && element.active
          )
          return has
        })()

        return isActiveStatus
      })

    return result
  })()

  return {
    filteredTodos,
    todosFilterOptions,
    handleFilter,
  }
}

export default useTodosFilter

const initialTodosFilterOptions: TTodosFilterOptions = {
  priorities: [
    {
      key: Priority.VERY_IMPORTANT,
      content: '매우 중요',
      active: true,
    },
    {
      key: Priority.IMPORTANT,
      content: '중요',
      active: true,
    },
    {
      key: Priority.NORMAL,
      content: '보통',
      active: true,
    },
  ],
  statuses: [
    {
      key: Status.DONE,
      content: '완료',
      active: true,
    },
    {
      key: Status.PROGRESS,
      content: '진행',
      active: true,
    },
  ],
}

const reducer = (prevState: any, action: THandleFilterProps): any => {
  const { type, payload } = action
  const immultableState: any = fromJS(prevState) // TODO: fromJS에 대한 typescript type이 리서치 결과 없어 보여서 일단 any type으로 설정함

  switch (type) {
    case 'RESET': {
      const { filterOptionName } = payload

      const basePath = [filterOptionName]
      const items = immultableState.getIn(basePath).toJS()

      const finalItems = items.map((element: any) => {
        return {
          ...element,
          active: true,
        }
      })

      const nextState = setIn(prevState, [...basePath], finalItems)
      return nextState
    }

    case 'TOGGLE_ITEM': {
      const { filterOptionName, key } = payload
      const basePath = [filterOptionName]

      const items = immultableState.getIn(basePath).toJS()
      const itemIndex = items?.findIndex((item: any) => item.key === key)
      const item = items?.find((_: any, index: number) => index === itemIndex)

      const activeItems = items.filter((item: any) => item.active)
      const isAllActived = items.every((item: any) => item.active)

      if (isAllActived) {
        const nextItems = items.map((element: any) => {
          const active = key === element.key
          return {
            ...element,
            active,
          }
        })
        const nextState = setIn(prevState, basePath, nextItems)
        return nextState
      } else {
        const canToggle = activeItems.length > 1
        const active = item.active
        const nextActive = !(active && canToggle)

        const nextState = setIn(
          prevState,
          [...basePath, itemIndex, 'active'],
          nextActive
        )
        return nextState
      }
    }
  }
  return prevState
}
