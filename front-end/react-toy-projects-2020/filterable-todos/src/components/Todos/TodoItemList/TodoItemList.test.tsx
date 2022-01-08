import { render } from '@testing-library/react';
import TodoItemList, { ITodoItemListProps } from './TodoItemList'
import { Priority, Status } from '../enums'
import dayjs from 'dayjs';

const setUp = (props: ITodoItemListProps) => {
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
            status: Status.PROGRESS,
            content: '1',
            priority: Priority.VERY_IMPORTANT,
            updatedAt: dayjs(),
            createdAt: dayjs(),
        }]
        const onHandleUpdate = jest.fn()
        const { todoItemList, todoItems } = setUp({ todos: testingTodosData, onHandleUpdate })

        expect(todoItemList).toBeTruthy()
        expect(todoItems).toBeTruthy()
    })

    it('number of children is equal to todos.length', () => {
        const testingTodosData = [{
            id: 1,
            status: Status.DONE,
            content: '1',
            priority: Priority.VERY_IMPORTANT,
            updatedAt: dayjs(),
            createdAt: dayjs(),

        }, {
            id: 2,
            status: Status.PROGRESS,
            content: '2',
            priority: Priority.IMPORTANT,
            updatedAt: dayjs(),
            createdAt: dayjs(),
        }]

        const onHandleUpdate = jest.fn()
        const { todoItems } = setUp({ todos: testingTodosData, onHandleUpdate })

        expect(todoItems).toHaveLength(testingTodosData.length)
    })
})