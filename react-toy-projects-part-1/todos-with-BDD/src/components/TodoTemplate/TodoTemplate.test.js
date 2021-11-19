import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoTemplate from './TodoTemplate';

describe('<TodoTemplate/>', ()=> {
    const sampleTodos = [
        {
            id: 1,
            text:'1',
            done:false
        },
        {
            id: 2,
            text:'2',
            done:false
        },
        {
            id: 3,
            text:'3',
            done:false
        }
    ]

    const setUp = (props = {}) => {
        const initialProps = {todos: sampleTodos}
        const utils = render(<TodoTemplate {...initialProps} {...props} />)

        const {getByTestId} = utils

        const todoItemList = getByTestId('todo-item-list')
        const todoInsert = getByTestId('todo-insert')

        return {
            utils,
            ...utils,   
            todoItemList,
            todoInsert 
        }
    }

    it('renders', () => {
        const { todoItemList, todoInsert } = setUp()

        expect(todoItemList).toBeTruthy()
        expect(todoInsert).toBeTruthy() 
    })
})