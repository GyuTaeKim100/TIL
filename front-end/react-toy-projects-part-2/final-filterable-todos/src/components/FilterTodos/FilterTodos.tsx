import './filterTodos.css'

import { todoPriorityEnum, todoStatusEnum } from '../Todos/enums'
import { TFilterTodosRules } from '../Todos/types'
import MultiSelectChips from '../MultiSelectChips'

export interface IProps {
    filterTodosRules: TFilterTodosRules
    onHandleFilter: (nextFilterTodosRules: TFilterTodosRules) => void
}

const FilterTodos = ({ filterTodosRules, onHandleFilter }: IProps) => {
    const { prioritySet, statusSet } = filterTodosRules

    const handleFilterRulesBy = ({ keyBasedRule, selectedKeys }: any) => {
        const nextFilterTodosRules: TFilterTodosRules = Object.assign(filterTodosRules, {
            [keyBasedRule]: new Set(selectedKeys)
        })
        onHandleFilter(nextFilterTodosRules)
    }

    const renderPriortyChips = () => {
        const keyBasedRule = 'prioritySet'

        const handleChange = (selectedKeys: any) => {
            handleFilterRulesBy({
                keyBasedRule,
                selectedKeys
            })
        }

        const handleReset = () => {
            const selectedKeys = [...Object.values(todoPriorityEnum).map(value => value)]
            handleFilterRulesBy({
                keyBasedRule,
                selectedKeys
            })
        }

        const allKeys = Array.from(Object.values(todoPriorityEnum))
        const selectedKeys = Array.from(prioritySet)

        return <MultiSelectChips
            allKeys={allKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onReset={handleReset}
        />
    }

    const renderTodoStatusChips = () => {
        const keyBasedRule = 'statusSet'
        const handleChange = (selectedKeys: any) => {
            handleFilterRulesBy({
                keyBasedRule,
                selectedKeys
            })
        }

        const handleReset = () => {
            const selectedKeys = [...Object.values(todoStatusEnum).map(value => value)]
            handleFilterRulesBy({
                keyBasedRule,
                selectedKeys
            })
        }

        const allKeys = Array.from(Object.values(todoStatusEnum))
        const selectedKeys = Array.from(statusSet)

        return <MultiSelectChips
            allKeys={allKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onReset={handleReset}
        />
    }

    return <div
        className="filter-todos"
        data-testid="filter-todos">
        {renderPriortyChips()}
        {renderTodoStatusChips()}
    </div>
}

export default FilterTodos
