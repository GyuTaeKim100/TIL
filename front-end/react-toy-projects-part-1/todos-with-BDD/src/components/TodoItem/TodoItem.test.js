import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('<TodoItem />', ()=> {
    const sampleTodo = {
        id: 1,
        text:'TODO TEST',
        done: false
    }

    const setUpDefaultMode = (props = {}) => {
        const initialProps = {todo: sampleTodo}
        const utils = render(<TodoItem {...initialProps} {...props} />)
        const {getByText} = utils
        const todo = props.todo || initialProps.todo
        const span = getByText(todo.text)
        const deleteButton = getByText('DELETE')
        const modifyButton = getByText('MODIFY')

        return {
            utils,
            ...utils,
            span,
            deleteButton,
            modifyButton,         
        }
    }

    const setUpEditMode = (props = {}) => {
        const onModify = jest.fn()

        const {utils, modifyButton, getByText, getByPlaceholderText } = setUpDefaultMode({onModify})

        fireEvent.click(modifyButton)

        const input = getByPlaceholderText('입력해 주세요')
        const okButton = getByText('OK')
        const cancelButton = getByText('CANCEL')

        return {
            utils,
            ...utils,
            input,
            okButton,
            cancelButton,
            onModify      
        }
    }

    /** 
     *  @brief for default mode 
    **/
    it('renders default mode', () => {
        const {span, deleteButton, modifyButton, queryByTestId } = setUpDefaultMode()

        expect(span).toBeTruthy()
        expect(deleteButton).toBeTruthy()
        expect(modifyButton).toBeTruthy()

        expect(queryByTestId('default-container')).toBeTruthy()
        expect(queryByTestId('edit-container')).not.toBeTruthy()
    })

    /** 
    *  @brief for default mode 
    **/
    it('toggle Todo Item', () => {
        const onToggle = jest.fn()
        const {span} = setUpDefaultMode({onToggle})

        fireEvent.click(span)
        expect(onToggle).toBeCalledWith(sampleTodo.id)
    })

    it('done is true', ()=> {
        const {span} = setUpDefaultMode({todo:{done:true, text:'test', id: null}})
        expect(span).toHaveStyle('text-decoration: line-through')
    })

    it('done is false', ()=> {
        const {span} = setUpDefaultMode({todo:{done:false, text:'test', id: null}})
        expect(span).not.toHaveStyle('text-decoration: line-through')
    })

    /** 
    *  @brief for default mode 
    **/
    it('click delete button', () => {
        const onDelete = jest.fn()
        const {deleteButton} = setUpDefaultMode({onDelete})

        fireEvent.click(deleteButton)
        expect(onDelete).toBeCalledWith(sampleTodo.id)
    })

    /** 
    *  @brief for default mode 
    **/
    it('click modify button', () => {
        const { queryByTestId, getByTestId} = setUpEditMode()

        // 없어진 여부 체크
        expect(queryByTestId('default-container')).toBeNull()

        const editMode = getByTestId('edit-container')
        expect(editMode).toBeTruthy()
    })

    /** 
    *  @brief for edit mode 
    **/
    it('renders edit mode', () => {
        const {input, okButton, cancelButton, queryByTestId } = setUpEditMode()

        expect(input).toBeTruthy()
        expect(okButton).toBeTruthy()
        expect(cancelButton).toBeTruthy()

        expect(input).toHaveAttribute('value', sampleTodo.text)

        expect(queryByTestId('edit-container')).toBeTruthy()
        expect(queryByTestId('default-container')).not.toBeTruthy()
    })

    /** 
    *  @brief for edit mode 
    **/
    it('change input value', () => {
        const {input} =setUpEditMode()
        const testInputValue = 'test'

        fireEvent.change(input, {
            target: {
                value: testInputValue
            }
        })
        expect(input).toHaveAttribute('value', testInputValue)
    })

    /** 
    *  @brief for edit mode 
    **/
   it('click okButton', () => {
    const {onModify,queryByTestId, okButton, input} =setUpEditMode()

    const testInputValue = 'test'

    fireEvent.change(input, {
        target: {
            value: testInputValue
        }
    })
    fireEvent.click(okButton)
    expect(queryByTestId('default-mode')).not.toBeTruthy()
    expect(onModify).toBeCalledWith({id: sampleTodo.id, text:testInputValue })
   })

    /** 
    *  @brief for edit mode 
    **/
   it('click cancelButton', () => {
    const {cancelButton, queryByTestId} = setUpEditMode()

    fireEvent.click(cancelButton)

    expect(queryByTestId('edit-container')).not.toBeTruthy()
    expect(queryByTestId('default-container')).toBeTruthy()
   })
})