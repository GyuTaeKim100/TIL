import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItemList from './TodoItemList';

describe('<TodoItemList/>', ()=> {
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
        const utils = render(<TodoItemList {...initialProps} {...props} />)

        return {
            utils,
            ...utils,        
        }
    }

    it('renders', ()=> {
        const { getByText} = setUp()
        
        sampleTodos.forEach((element)=> {
            const todoText = getByText(element.text)
            expect(todoText).toBeTruthy()
        })
    })

    it('calls onToggle', ()=> {
        const onToggle = jest.fn()
        const { getByText } = setUp({onToggle})
        
        sampleTodos.forEach((element)=> {
            const todoText = getByText(element.text)
            fireEvent.click(todoText)
            expect(onToggle).toBeCalledWith(element.id)
        })
    })

    it('calls onDelete', ()=> {
        const onDelete = jest.fn()
        const { getAllByText } = setUp({onDelete})
        
        sampleTodos.forEach((element, index)=> {
            const currentDeleteButton = getAllByText('DELETE')[index]
            fireEvent.click(currentDeleteButton)
            expect(onDelete).toBeCalledWith(element.id)
        })
    })


    it('calls onModify', ()=> {
        const onModify = jest.fn()
        const utils = render(<TodoItemList onModify={onModify} todos={sampleTodos} />)

        sampleTodos.forEach((element, index)=> {
            const modifyButton = utils.getAllByText('MODIFY')[index]
            fireEvent.click(modifyButton)

            const okButton = utils.getByText('OK')
            fireEvent.click(okButton)
            expect(onModify).toBeCalledWith({id: element.id, text:element.text})
        })
    }) 
})