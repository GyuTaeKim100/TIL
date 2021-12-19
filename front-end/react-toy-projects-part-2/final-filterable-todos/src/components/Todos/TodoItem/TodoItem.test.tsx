import { fireEvent, render } from '@testing-library/react';
import TodoItem, { ITodoItemProps } from './TodoItem'
import { Priority, Status } from '../enums'
import dayjs from 'dayjs';

const viewModeSetUp = (props: ITodoItemProps) => {
    const utils = render(<TodoItem {...props} />)
    const { getByTestId } = utils

    const todoItem = getByTestId('todo-item')
    const checkTodo = getByTestId('check-done')
    const todoInfos = getByTestId('detail-items')
    const priorityInfo = getByTestId('priority')
    const dateInfo = getByTestId('date')
    const content = getByTestId('content')

    return {
        utils,
        ...utils,
        todoItem,
        checkTodo,
        todoInfos,
        priorityInfo,
        dateInfo,
        content
    }
}

describe('<TodoItem/> with normal mode', () => {
    it('render', () => {
        const testingTodoData = {
            id: 1,
            status: Status.PROGRESS,
            content: '1',
            priority: Priority.VERY_IMPORTANT,
            updatedAt: dayjs(),
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const { todoItem,
            checkTodo,
            todoInfos,
            priorityInfo,
            dateInfo,
            content } = viewModeSetUp({ todo: testingTodoData, onHandleUpdate })

        expect(todoItem).toBeTruthy()
        expect(checkTodo).toBeTruthy()
        expect(todoInfos).toBeTruthy()
        expect(priorityInfo).toBeTruthy()
        expect(dateInfo).toBeTruthy()
        expect(content).toBeTruthy()
    })

    it('item details', () => {
        const defaultContent = 'content'
        const defaultTodoStatus = Status.DONE
        const defaultPriority = Priority.VERY_IMPORTANT
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: defaultContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            checkTodo,
            priorityInfo,
            dateInfo,
            content } = viewModeSetUp({ todo: testingTodoData, onHandleUpdate })

        // TODO : input type checkbox의  as type으로 교체 필요
        expect((checkTodo as any).checked).toEqual(true)
        expect(content).toHaveTextContent(defaultContent)
        expect(priorityInfo).toHaveTextContent(defaultPriority)
        expect(dateInfo).toHaveTextContent(defaultUpsertDate.format('YYYY-MM-DD'))
    })

})

const editModeSetUp = (props: ITodoItemProps) => {
    const utils = render(<TodoItem {...props} />)
    const { getByTestId, getAllByTestId } = utils

    const todoInfos = getByTestId('detail-items')

    fireEvent.click(todoInfos)

    const checkTodo = getByTestId('check-done')
    const select = getByTestId('priority-select')
    const selectOption = getAllByTestId('priority-select-option')
    const input = getByTestId('content-input')
    const submitButton = getByTestId('submit-button')

    return {
        utils,
        ...utils,
        todoInfos,
        checkTodo,
        select,
        selectOption,
        input,
        submitButton
    }
}

describe('<TodoItem/> with edit mode', () => {
    it('render', () => {
        const testingTodoData = {
            id: 1,
            status: Status.PROGRESS,
            content: '1',
            priority: Priority.VERY_IMPORTANT,
            updatedAt: dayjs(),
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            checkTodo,
            select,
            selectOption,
            input,
            submitButton } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        expect(checkTodo).toBeTruthy()
        expect(select).toBeTruthy()
        expect(selectOption).toBeTruthy()
        expect(input).toBeTruthy()
        expect(submitButton).toBeTruthy()
    })

    it('item details', () => {
        const defaultContent = 'content'
        const defaultTodoStatus = Status.DONE
        const defaultPriority = Priority.NORMAL
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: defaultContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            checkTodo,
            selectOption,
            input
        } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        expect((checkTodo as any).checked).toEqual(true)
        expect((selectOption[0] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[1] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[2] as HTMLOptionElement).selected).toBeTruthy();
        expect(input).toHaveAttribute('value', defaultContent)
    })

    it('change select value', () => {
        const defaultContent = 'content'
        const defaultTodoStatus = Status.DONE
        const defaultPriority = Priority.NORMAL
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: defaultContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            select,
            selectOption,
        } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        const testingSelectValue = Priority.IMPORTANT
        fireEvent.change(select, {
            target: {
                value: testingSelectValue
            }
        })

        expect((selectOption[0] as HTMLOptionElement).selected).toBeFalsy();
        expect((selectOption[1] as HTMLOptionElement).selected).toBeTruthy();
        expect((selectOption[2] as HTMLOptionElement).selected).toBeFalsy();
    })

    it('change input value', () => {
        const defaultContent = 'content'
        const defaultTodoStatus = Status.DONE
        const defaultPriority = Priority.NORMAL
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: defaultContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            input,
        } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        const testingInputValue = defaultContent + defaultContent

        fireEvent.change(input, {
            target: {
                value: testingInputValue
            }
        })
        expect(input).toHaveAttribute('value', testingInputValue)
    })

    it('click submit button with empty input value', () => {
        const defaultContent = ''
        const defaultTodoStatus = Status.DONE
        const defaultPriority = Priority.NORMAL
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: defaultContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            submitButton,
            getByTestId
        } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        fireEvent.click(submitButton)
        expect(getByTestId('edit-todo-form')).toBeInTheDocument()
    })

    it('click submit button with valid input value', () => {
        const testingContent = 'valid value'
        const defaultPriority = Priority.NORMAL
        const defaultTodoStatus = Status.DONE
        const defaultUpsertDate = dayjs()
        const testingTodoData = {
            id: 1,
            status: defaultTodoStatus,
            content: testingContent,
            priority: defaultPriority,
            updatedAt: defaultUpsertDate,
            createdAt: dayjs(),
        }

        const onHandleUpdate = jest.fn()
        const {
            submitButton,
            getByTestId
        } = editModeSetUp({ todo: testingTodoData, onHandleUpdate })

        fireEvent.click(submitButton)
        const testingSubmitFormFieldValues = {
            ...testingTodoData,
            content: testingContent,
            priority: defaultPriority
        }
        expect(onHandleUpdate).toBeCalledWith(testingSubmitFormFieldValues)
        expect(getByTestId('detail-items')).toBeInTheDocument()
    })
})