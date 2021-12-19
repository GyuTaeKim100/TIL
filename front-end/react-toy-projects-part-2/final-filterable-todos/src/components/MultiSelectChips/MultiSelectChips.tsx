import './multiSelectChips.css'

export interface IProps {
    allKeys: Array<string>
    selectedKeys: Array<string>
    onChange: (nextSlectedKeysAsSet: Array<string>) => void
    onReset: () => void
}

const MultiSelectChips = ({ allKeys, selectedKeys, onChange, onReset }: IProps) => {
    const isToggledAllOn = allKeys.length === selectedKeys.length

    const ResetChip = () => {
        const handleClick = () => {
            onReset()
        }

        const className = getChipClassNameBy(isToggledAllOn)

        return <button
            className={className}
            data-testid='multi-select-chip'
            onClick={handleClick}>모두</button>

    }

    const Chips = () => {
        return allKeys.map((value, index) => {
            const isActiveState = new Set(selectedKeys).has(value)
            const isFinalActiveState = !isToggledAllOn && isActiveState
            const className = getChipClassNameBy(isFinalActiveState)

            return <button
                className={className}
                key={index}
                data-testid='multi-select-chip'
                onClick={() => {
                    const eventTargetValue = value
                    const prevSelectedKeysAsSet = new Set(selectedKeys)
                    const nextSlectedKeysAsSet = new Set(prevSelectedKeysAsSet)

                    if (isToggledAllOn) {
                        nextSlectedKeysAsSet.clear()
                        nextSlectedKeysAsSet.add(eventTargetValue)
                    } else {
                        const isToggledOn = prevSelectedKeysAsSet.has(eventTargetValue)
                        const canSwitchToggle = prevSelectedKeysAsSet.size > 1

                        if (isToggledOn && canSwitchToggle) {
                            nextSlectedKeysAsSet.delete(eventTargetValue)
                        } else {
                            nextSlectedKeysAsSet.add(eventTargetValue)
                        }
                    }

                    const result = Array.from(nextSlectedKeysAsSet)
                    onChange(result)
                }}
            >{value} </button>
        })
    }

    return <div
        className="multi-select-chips"
        data-testid='multi-select-chips'>
        {ResetChip()}
        {Chips()}
    </div>
}

export default MultiSelectChips

const getChipClassNameBy = (isActiveState: boolean) => {
    const baseClassName = 'chip'

    return `${baseClassName} ${isActiveState ? 'toggled' : ''}`
}