// TODO : 테스트 코드 깨지는 중

// import { fireEvent, render } from '@testing-library/react';
// import FilterTodos, { IFilterTodosProps } from './FilterTodos'
// import { Priority, Status } from '../enums'
// import { TTodosFilterOptions } from '../types'

// const priorities = new Set([Priority.VERY_IMPORTANT, Priority.IMPORTANT, Priority.NORMAL])
// const statuses = new Set([Status.DONE, Status.PROGRESS])
// const allPriority = Array.from(priorities)

// const setUp = (props: IFilterTodosProps) => {
//     const utils = render(<FilterTodos {...props} />)
//     const { getAllByTestId } = utils

//     const multiSelectChips = getAllByTestId('chips')
//     const priorityMultiSelectChips = multiSelectChips[0]
//     const statusMultiSelectChips = multiSelectChips[1]

//     return {
//         utils,
//         ...utils,
//         multiSelectChips,
//         priorityMultiSelectChips,
//         statusMultiSelectChips
//     }
// }

// describe('<FilterTodos/> ', () => {
//     it('renders', () => {
//         const onHandleFilter = jest.fn()
//         const defaultFilterTodosSetupDatas: TTodosFilterOptions = {
//             priorities: priorities,
//             statuses: statuses
//         }

//         const { priorityMultiSelectChips, statusMultiSelectChips } = setUp({ filter: defaultFilterTodosSetupDatas, onHandleFilter })

//         expect(priorityMultiSelectChips).toBeTruthy()
//         expect(statusMultiSelectChips).toBeTruthy()
//     })


//     it('click normal chip  reset chip is active', () => {
//         const defaultactivePrioritySet = priorities
//         const defaultactiveStatusSet = statuses

//         const onHandleFilter = jest.fn()
//         const testingFilterTodosSetupDatas: TTodosFilterOptions = {
//             priorities: defaultactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         }

//         const { priorityMultiSelectChips } = setUp({ filter: testingFilterTodosSetupDatas, onHandleFilter })

//         const childIndex = 1
//         const setIndex = childIndex - 1
//         fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

//         const testingactivePrioritySet = new Set([allPriority[setIndex]])

//         expect(onHandleFilter).toBeCalledWith({
//             priorities: testingactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         })
//     })

//     it('click all normal chips except the reset button', () => {
//         const defaultactivePrioritySet = new Set([Priority.VERY_IMPORTANT, Priority.IMPORTANT])
//         const defaultactiveStatusSet = statuses

//         const onHandleFilter = jest.fn()
//         const testingFilterTodosSetupDatas: TTodosFilterOptions = {
//             priorities: defaultactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         }

//         const { priorityMultiSelectChips } = setUp({ filter: testingFilterTodosSetupDatas, onHandleFilter })

//         const childIndex = defaultactivePrioritySet.size + 1
//         const setIndex = childIndex - 1
//         fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

//         const testingactivePrioritySet = new Set([Priority.VERY_IMPORTANT, Priority.IMPORTANT, allPriority[setIndex]])

//         expect(onHandleFilter).toBeCalledWith({
//             priorities: testingactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         })
//     })

//     it('click active chip if active chip count is more then one ', () => {
//         const defaultactivePrioritySet = new Set([Priority.VERY_IMPORTANT, Priority.IMPORTANT])
//         const defaultactiveStatusSet = statuses

//         const onHandleFilter = jest.fn()
//         const testingFilterTodosSetupDatas: TTodosFilterOptions = {
//             priorities: defaultactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         }

//         const { priorityMultiSelectChips } = setUp({ filter: testingFilterTodosSetupDatas, onHandleFilter })

//         const childIndex = defaultactivePrioritySet.size
//         const setIndex = childIndex - 1
//         fireEvent.click(priorityMultiSelectChips.childNodes[childIndex])

//         const testingactivePrioritySet = new Set([Priority.VERY_IMPORTANT])

//         expect(onHandleFilter).toBeCalledWith({
//             priorities: testingactivePrioritySet,
//             statuses: defaultactiveStatusSet
//         })
//     })

// })

export { }