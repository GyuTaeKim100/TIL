import React from 'react'
import './card.css'

export interface IPanelProps {
    as?: string
    header?: React.ReactNode[] | React.ReactNode,
    children?: React.ReactNode[] | React.ReactNode,
    bordered?: boolean
}
const Card = ({ as, header, children, bordered }: IPanelProps) => {

    return <CardTemplate
        bordered={bordered}
        as={as}>
        <div className="card-header">{header}</div>
        <div className="card-body">{children}</div>
    </CardTemplate>
}

export interface CardTemplate {
    as?: string
    children?: React.ReactNode[] | React.ReactNode,
    bordered?: boolean
}
const CardTemplate = ({ as, children, bordered }: CardTemplate) => {
    const cardClassName = createCardClassName({ bordered })
    const finalAs = as ?? 'div'

    return React.createElement(
        `${finalAs}`, { className: cardClassName }, children,
    )
}

export default Card
interface ICreateCardClassNameProps {
    bordered?: boolean
}
const createCardClassName = ({ bordered }: ICreateCardClassNameProps) => {
    const baseClassName = 'card'

    const borderedClassName = bordered ? 'borderd' : ''

    return `${baseClassName} ${borderedClassName} `
}