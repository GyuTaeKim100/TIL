import './todosTemplate.css'

// filter, form은 Todo list 기능 다형성(form 없는 readonly todos 또는 filter 없는 todos 등) 을 위해 필수값은 아니다 
interface IProps {
    form: React.ReactNode | undefined | null,
    filter: React.ReactNode | undefined | null,
    children: React.ReactNode
}

const TodosTemplate = ({ form, filter, children }: IProps) => {
    return <div className="todos-template">
        <header className="fixible-todos-header">
            {form}
        </header>
        <div className="scrollable-todos-body">
            {filter}
            {children}
        </div>
    </div>
}

export default TodosTemplate

