import React from 'react'
import './chip.css'

export interface IChipProps {
    id?: string | number,
    active: boolean,
    onClick?: (id: string | number) => void
    children: React.ReactNode | string,
}

const Chip = ({ id, active, children, onClick }: IChipProps) => {
    const className = createChipClassName({ active })

    const handleClick = () => {
        onClick && onClick(id ?? -1)
    }

    return <button
        className={className}
        data-testid='chip'
        onClick={handleClick}>{children}</button>
}

const MemorizedChip = React.memo(Chip)
export default MemorizedChip

interface ICreateClassNameProps {
    active: boolean
}

const createChipClassName = ({ active }: ICreateClassNameProps) => {
    const baseClassName = 'chip'
    const statusClassName = `${active ? 'active' : ''}`

    return `${baseClassName} ${statusClassName}`
}

