import { fireEvent, render } from '@testing-library/react';
import MultiSelectChips, { IProps } from './MultiSelectChips'
import { todoPriorityEnum, todoStatusEnum } from '../Todos/enums'

const TestingallKeys = [todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT, todoPriorityEnum.NORMAL]

const setUp = (props: IProps) => {
    const utils = render(<MultiSelectChips {...props} />)
    const { getAllByTestId } = utils

    const multiSelectChips = getAllByTestId('multi-select-chip')

    return {
        utils,
        ...utils,
        multiSelectChips,
    }
}

describe('<MultiSelectChips/> ', () => {
    it('renders', () => {
        const onChange = jest.fn()
        const onReset = jest.fn()
        const props: IProps = {
            allKeys: TestingallKeys,
            selectedKeys: [todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT, todoPriorityEnum.NORMAL],
            onChange,
            onReset
        }

        const { multiSelectChips } = setUp(props)

        expect(multiSelectChips).toBeTruthy()
    })


    it('selectedKeys have all keys', () => {
        const onChange = jest.fn()
        const onReset = jest.fn()
        const props: IProps = {
            allKeys: TestingallKeys,
            selectedKeys: [todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT, todoPriorityEnum.NORMAL],
            onChange,
            onReset
        }

        const { multiSelectChips } = setUp(props)

        expect(multiSelectChips[0]).toHaveClass('toggled')
        expect(multiSelectChips[1]).not.toHaveClass('toggled')
        expect(multiSelectChips[2]).not.toHaveClass('toggled')
    })

    it('selectedKeys have some keys', () => {
        const onChange = jest.fn()
        const onReset = jest.fn()
        const props: IProps = {
            allKeys: TestingallKeys,
            selectedKeys: [todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.NORMAL],
            onChange,
            onReset
        }

        const { multiSelectChips } = setUp(props)

        expect(multiSelectChips[0]).not.toHaveClass('toggled')
        expect(multiSelectChips[1]).toHaveClass('toggled')
        expect(multiSelectChips[2]).not.toHaveClass('toggled')
        expect(multiSelectChips[3]).toHaveClass('toggled')
    })
})
