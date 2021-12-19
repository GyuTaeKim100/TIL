import './filterTodos.css'

import { useCallback } from 'react'
import { TTodosFilterOptions, TCheckTypeItems, TCheckTypeItem, THandleFilterProps } from '../types'

import Chips from '../../common/Chips'
import Chip from '../../common/Chip'
import Card from '../../common/Card'
export interface IFilterTodosProps {
    todosFilterOptions: TTodosFilterOptions
    onHandleFilter: (props: THandleFilterProps) => void
}

const FilterTodos = ({ todosFilterOptions, onHandleFilter }: IFilterTodosProps) => {
    const { priorities, statuses } = todosFilterOptions

    return <div
        className="filter-todos"
        data-testid="filter-todos">
        <FilterChips
            filterOptionName="priorities"
            dataSource={priorities}
            onHandleFilter={onHandleFilter}
        />
        <FilterChips
            filterOptionName="statuses"
            dataSource={statuses}
            onHandleFilter={onHandleFilter}
        />

    </div>
}

export default FilterTodos

export interface IFilterChipsProps {
    filterOptionName: string
    dataSource: TCheckTypeItems
    onHandleFilter: (props: THandleFilterProps) => void
}

const FilterChips = ({ filterOptionName, dataSource, onHandleFilter }: IFilterChipsProps) => {
    if (!dataSource) {
        return null
    }

    const handleClick = useCallback((key: string | number) => {
        onHandleFilter({
            type: 'TOGGLE_ITEM', payload: {
                filterOptionName,
                key
            }
        })
    }, [])

    const handleReset = useCallback(() => {
        onHandleFilter({
            type: 'RESET', payload: {
                filterOptionName,
            }
        })
    }, [])

    const isAllActive = dataSource?.every((element: any) => element.active)

    return <div className="card-wrapper mb-10px"><Card>
        <div className='col'>
            <OptionChips
                allActive={isAllActive}
                onHandleReset={handleReset} />
            <Chips
                onClick={handleClick}
            >
                {dataSource?.map((element: TCheckTypeItem) => {
                    const { key, content, active } = element
                    const nextActive = !isAllActive && active

                    return <Chip
                        key={key}
                        id={key}
                        active={nextActive}>
                        {content}
                    </Chip>
                })}
            </Chips>
        </div>
    </Card>
    </div>
}

interface IOptionChipsProps {
    allActive: boolean
    onHandleReset: () => void
}

const OptionChips = ({ onHandleReset, allActive }: IOptionChipsProps) => {
    return <div className="chips opiton-chips">
        <ResetChip
            allActive={allActive}
            onHandleReset={onHandleReset} />
    </div>
}

interface IResetChipProps {
    allActive: boolean
    onHandleReset: () => void
}
const ResetChip = ({ onHandleReset, allActive }: IResetChipProps) => {
    const handleClick = useCallback(() => {
        onHandleReset()
    }, [])

    return <Chip
        active={allActive}
        onClick={handleClick}>
        {'모두'}
    </Chip>
}