import React, { useState } from 'react';
import { render, fireEvent, getByPlaceholderText, getByTestId } from '@testing-library/react';
import TodoApp from './App';

describe('<App/>', ()=> {
    const setUp = (props = {}) => {
        const utils = render(<TodoApp />)

        const {getByTestId} = utils

        const todoTemplate = getByTestId('todo-template')

        return {
            utils,
            ...utils,   
            todoTemplate
        }
    }

    const addTodos = ( count, utils ) => {
        const {  getByPlaceholderText, getByText } = utils


        for(let idx=0 ; idx< count; idx++) {
            const testInputValue = `todoText_${idx}`

            const todoInput = getByPlaceholderText('입력해 주세요')
            const todoAddButton = getByText('ADD')
    
            fireEvent.change(todoInput, {
                target: {
                    value: testInputValue
                }
            })
    
            fireEvent.click(todoAddButton)
    
            const todoText = getByText(testInputValue)
            expect(todoText).toBeTruthy()
        }
    }

    it('renders', () => {
        const { todoTemplate } = setUp()

        expect(todoTemplate).toBeTruthy()
    })

    it('add todo', () => {
        const { utils } = setUp()

        const testCount = 5

        addTodos(testCount, utils)
    })

    it('delete todo', ()=> {
        const { utils, getAllByText, queryByText } = setUp()

        const testCount = 5

        addTodos(testCount, utils)
        
        //delete todos
        for(let idx=0 ; idx< testCount; idx++) {
            const targetTodo = `todoText-${idx}`
            const deleteButton = getAllByText('DELETE')[0]

            fireEvent.click(deleteButton)

            const todoText = queryByText(targetTodo)
            expect(todoText).not.toBeTruthy()
        }
    })

    it('toggle todo', () => {
        const { utils, getByText } = setUp()

        const testCount = 5

        addTodos(testCount, utils)

        //toggle todos
        for(let idx=0 ; idx< testCount; idx++) {
            const target = `todoText_${idx}`
            const todoText = getByText(target)

            expect(todoText).not.toHaveStyle('text-decoration: line-through')

            fireEvent.click(todoText)
            expect(todoText).toHaveStyle('text-decoration: line-through')

            fireEvent.click(todoText)
            expect(todoText).not.toHaveStyle('text-decoration: line-through')
        }        
    })

    it('successly modify todo', ()=> {
        const { utils, getByText, getAllByText, getByTestId } = setUp()

        const testCount = 5

        addTodos(testCount, utils)

        for(let idx = 0 ; idx< testCount; idx++) {
            const ModifyButton = getAllByText('MODIFY')[idx]
            fireEvent.click(ModifyButton)

            const testTodoText = `modifiedText_${idx}`

            const input = getByTestId('todo-item_input')
            fireEvent.change(input, {
                target: {
                    value: testTodoText
                }
            })

            const okButton = getByTestId('todo-item_ok-button')
            fireEvent.click(okButton)

            const changedTodoText = getByText(testTodoText)
            expect(changedTodoText).toBeTruthy()
        }
    })
})