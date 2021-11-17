import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoInsert from './TodoInsert'

describe('<TodoInsert/>', ()=> {
    const setUp = (props = {}) => {
        const utils = render(<TodoInsert {...props} />)
        const {getByText, getByPlaceholderText} = utils

        const input = getByPlaceholderText('입력해 주세요')
        const addButton = getByText('ADD')

        return {
            utils,
            ...utils,
            input,
            addButton,       
        }
    }

    it('renders', () => {
        const {input, addButton} = setUp()

        expect(input).toBeTruthy()
        expect(addButton).toBeTruthy()
    })

    it('change input value', () => {
        const {input} = setUp()
        const testInputValue = 'test'

        fireEvent.change(input, {
            target:{
                value:testInputValue
            }
        })
        expect(input).toHaveAttribute('value', testInputValue)
    })

    it('click add button', () => {
        const onAdd = jest.fn()
        const {input, addButton} = setUp({onAdd})
        const testInputValue = 'test'

        fireEvent.change(input, {
            target:{
                value:testInputValue
            }
        })

        fireEvent.click(addButton)

        expect(onAdd).toBeCalledWith(testInputValue)

    })
})