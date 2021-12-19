import { render } from '@testing-library/react';
import TodoItemList, { IProps } from './TodoItemList'
import { todoPriorityEnum, todoStatusEnum } from '../Todos/enums'
import dayjs from 'dayjs';

const setUp = (props: IProps) => {
    const utils = render(<TodoItemList {...props} />)
    const { getByTestId, getAllByTestId } = utils

    const todoItemList = getByTestId('todo-item-list')
    const todoItems = getAllByTestId('todo-item')

    return {
        utils,
        ...utils,
        todoItemList,
        todoItems,
    }
}

describe('<TodoItemList/>', () => {
    it('renders', () => {
        const testingTodosData = [{
            id: 1,
            todoStatus: todoStatusEnum.PROGRESS,
            content: '1',
            priority: todoPriorityEnum.VERY_IMPORTANT,
            upsertDate: dayjs(),
        }]
        const onHandleUpdateTodoItem = jest.fn()
        const { todoItemList, todoItems } = setUp({ todosData: testingTodosData, onHandleUpdateTodoItem })

        expect(todoItemList).toBeTruthy()
        expect(todoItems).toBeTruthy()
    })

    it('number of children is equal to todosData.length', () => {
        const testingTodosData = [{
            id: 1,
            todoStatus: todoStatusEnum.DONE,
            content: '1',
            priority: todoPriorityEnum.VERY_IMPORTANT,
            upsertDate: dayjs(),

        }, {
            id: 2,
            todoStatus: todoStatusEnum.PROGRESS,
            content: '2',
            priority: todoPriorityEnum.IMPORTANT,
            upsertDate: dayjs(),
        }]

        const onHandleUpdateTodoItem = jest.fn()
        const { todoItems } = setUp({ todosData: testingTodosData, onHandleUpdateTodoItem })

        expect(todoItems).toHaveLength(testingTodosData.length)
    })
})