import React, { useState } from 'react'
import './chips.css'
export interface IFilterChipsProps {
    children?: React.ReactNode[],
    onClick: (id: string | number) => void,
}

const Chips = ({ children, onClick }: IFilterChipsProps) => {
    return <div
        className="chips"
        data-testid='chips'>
        {children?.map((child, index) => {
            const key = index

            if (React.isValidElement(child)) {
                return <MemorizedChild key={key}>
                    {React.cloneElement(child, { onClick })}
                </MemorizedChild>
            } else {
                return null
            }
        })}
    </div>
}

export default Chips

export interface IMemorizedChildProps {
    children: React.ReactElement<any>,
}
const MemorizedChild = React.memo(({ children }: IMemorizedChildProps) => {
    return children
})
