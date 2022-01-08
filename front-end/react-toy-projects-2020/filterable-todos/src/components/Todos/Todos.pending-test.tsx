// TODO : 미완

import { render } from '@testing-library/react';
import Todos from './Todos'
import { Priority, Status } from './enums'
import dayjs from 'dayjs';

const setUp = () => {
    const utils = render(<Todos />)
    const { getByTestId } = utils

    const insertTodo = getByTestId('insert-todo')
    const todoItemList = getByTestId('todo-item-list')

    return {
        utils,
        ...utils,
        insertTodo,
        todoItemList,
    }
}

describe('<Todos/>', () => {
    it('renders', () => {
        const { insertTodo,
            todoItemList, } = setUp()

        expect(insertTodo).toBeTruthy()
        expect(todoItemList).toBeTruthy()
    })
})