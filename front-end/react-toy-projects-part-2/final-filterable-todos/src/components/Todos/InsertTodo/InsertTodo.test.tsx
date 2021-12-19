import { fireEvent, render } from '@testing-library/react';
import InsertTodo, { IInsertTodoProps } from './InsertTodo'
import { Priority } from '../enums'

const setUp = (props: IInsertTodoProps) => {
    const utils = render(<InsertTodo {...props} />)
    const { getByTestId, getAllByTestId } = utils

    const select = getByTestId('priority-select')
    const selectOption = getAllByTestId('priority-select-option')
    const input = getByTestId('content-input')
    const submitButton = getByTestId('submit-button')

    return {
        utils,
        ...utils,
        select,
        selectOption,
        input,
        submitButton,
    }
}

describe('<InsertTodo/>', () => {
    it('renders', () => {
        const onInsert = jest.fn()
        const { select, selectOption, input, submitButton } = setUp({ onInsert })

        expect(select).toBeTruthy()
        expect(selectOption).toBeTruthy()
        expect(input).toBeTruthy()
        expect(submitButton).toBeTruthy()
    })

    it('change input value', () => {
        const onInsert = jest.fn()
        const { input } = setUp({ onInsert })

        const testingValue = 'testing'

        fireEvent.change(input, {
            target: {
                value: testingValue
            }
        })

        expect(input).toHaveAttribute('value', testingValue)
    })

    it('change select value', () => {
        const onInsert = jest.fn()
        const { select, selectOption } = setUp({ onInsert })

        const testingValue = Priority.NORMAL

        fireEvent.change(select, {
            target: {
                value: testingValue
            }
        })

        expect((selectOption[0] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[1] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[2] as HTMLOptionElement).selected).toBeTruthy();
    })

    it('click submit button with invalid input value', () => {
        const onInsert = jest.fn()
        const { input, select, selectOption, submitButton } = setUp({ onInsert })

        const testingInputValue = ''
        expect(input).toHaveAttribute('value', testingInputValue)

        const testingSelectValue = Priority.NORMAL

        fireEvent.change(select, {
            target: {
                value: testingSelectValue
            }
        })

        fireEvent.click(submitButton)

        expect((selectOption[0] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[0] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[2] as HTMLOptionElement).selected).toBeTruthy();
    })

    it('click submit button with valid input value', () => {
        const onInsert = jest.fn()
        const { input, select, selectOption, submitButton } = setUp({ onInsert })

        const testingInputValue = 'test'
        fireEvent.change(input, {
            target: {
                value: testingInputValue
            }
        })

        const testingSelectValue = Priority.NORMAL
        fireEvent.change(select, {
            target: {
                value: testingSelectValue
            }
        })

        fireEvent.click(submitButton)

        const testingSubmitFormFieldValues = {
            content: testingInputValue,
            priority: testingSelectValue
        }
        expect(onInsert).toBeCalledWith(testingSubmitFormFieldValues)

        expect(input).toHaveAttribute('value', '')
        expect((selectOption[0] as HTMLOptionElement).selected).toBeTruthy();
        expect((selectOption[1] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[2] as HTMLOptionElement).selected).toBeFalsy();
    })
})