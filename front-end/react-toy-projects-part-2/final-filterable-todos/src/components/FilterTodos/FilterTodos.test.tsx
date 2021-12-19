import { fireEvent, render } from '@testing-library/react';
import FilterTodos, { IProps } from './FilterTodos'
import { todoPriorityEnum, todoStatusEnum } from '../Todos/enums'
import { TFilterTodosRules } from '../Todos/types'

const prioritySet = new Set([todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT, todoPriorityEnum.NORMAL])
const statusSet = new Set([todoStatusEnum.DONE, todoStatusEnum.PROGRESS])
const allPriority = Array.from(prioritySet)

const setUp = (props: IProps) => {
    const utils = render(<FilterTodos {...props} />)
    const { getAllByTestId } = utils

    const multiSelectChips = getAllByTestId('multi-select-chips')
    const priorityMultiSelectChips = multiSelectChips[0]
    const statusMultiSelectChips = multiSelectChips[1]

    return {
        utils,
        ...utils,
        multiSelectChips,
        priorityMultiSelectChips,
        statusMultiSelectChips

    }
}

describe('<FilterTodos/> ', () => {
    it('renders', () => {
        const onHandleFilter = jest.fn()
        const defaultFilterTodosSetupDatas: TFilterTodosRules = {
            prioritySet: prioritySet,
            statusSet: statusSet
        }

        const { priorityMultiSelectChips, statusMultiSelectChips } = setUp({ filterTodosRules: defaultFilterTodosSetupDatas, onHandleFilter })

        expect(priorityMultiSelectChips).toBeTruthy()
        expect(statusMultiSelectChips).toBeTruthy()
    })


    it('click normal chip if reset chip is active', () => {
        const defaultPrioritySet = prioritySet
        const defaultStatusSet = statusSet

        const onHandleFilter = jest.fn()
        const testingFilterTodosSetupDatas: TFilterTodosRules = {
            prioritySet: defaultPrioritySet,
            statusSet: defaultStatusSet
        }

        const { priorityMultiSelectChips } = setUp({ filterTodosRules: testingFilterTodosSetupDatas, onHandleFilter })

        const childIndex = 1
        const setIndex = childIndex - 1
        fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

        const testingPrioritySet = new Set([allPriority[setIndex]])

        expect(onHandleFilter).toBeCalledWith({
            prioritySet: testingPrioritySet,
            statusSet: defaultStatusSet
        })
    })

    it('click all normal chips except the reset button', () => {
        const defaultPrioritySet = new Set([todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT])
        const defaultStatusSet = statusSet

        const onHandleFilter = jest.fn()
        const testingFilterTodosSetupDatas: TFilterTodosRules = {
            prioritySet: defaultPrioritySet,
            statusSet: defaultStatusSet
        }

        const { priorityMultiSelectChips } = setUp({ filterTodosRules: testingFilterTodosSetupDatas, onHandleFilter })

        const childIndex = defaultPrioritySet.size + 1
        const setIndex = childIndex - 1
        fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

        const testingPrioritySet = new Set([todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT, allPriority[setIndex]])

        expect(onHandleFilter).toBeCalledWith({
            prioritySet: testingPrioritySet,
            statusSet: defaultStatusSet
        })
    })

    it('click active chip if active chip count is more then one ', () => {
        const defaultPrioritySet = new Set([todoPriorityEnum.VERY_IMPORTANT, todoPriorityEnum.IMPORTANT])
        const defaultStatusSet = statusSet

        const onHandleFilter = jest.fn()
        const testingFilterTodosSetupDatas: TFilterTodosRules = {
            prioritySet: defaultPrioritySet,
            statusSet: defaultStatusSet
        }

        const { priorityMultiSelectChips } = setUp({ filterTodosRules: testingFilterTodosSetupDatas, onHandleFilter })

        const childIndex = defaultPrioritySet.size
        const setIndex = childIndex - 1
        fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

        const testingPrioritySet = new Set([todoPriorityEnum.VERY_IMPORTANT])

        expect(onHandleFilter).toBeCalledWith({
            prioritySet: testingPrioritySet,
            statusSet: defaultStatusSet
        })
    })

})

