import TodoItem from '../TodoItem'
import { TTodo } from '../types'
import './todoItemList.css'

export interface ITodoItemListProps {
    todos: Array<TTodo>
    onHandleUpdate: (values: TTodo) => void
}

const TodoItemList = ({ todos, onHandleUpdate }: ITodoItemListProps) => {
    return <ul
        className='todo-item-list'
        data-testid='todo-item-list'>
        {
            todos.map((todo) => {
                const { id } = todo
                return <TodoItem
                    key={id}
                    todo={todo}
                    onHandleUpdate={onHandleUpdate} />
            })
        }
    </ul>
}

export default TodoItemList