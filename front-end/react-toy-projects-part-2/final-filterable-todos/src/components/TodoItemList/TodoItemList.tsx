import TodoItem from '../TodoItem'
import { TTodoData } from '../Todos/types'
import './todoItemList.css'

export interface IProps {
    todosData: Array<TTodoData>
    onHandleUpdateTodoItem: (values: TTodoData) => void
}

const TodoItemList = ({ todosData, onHandleUpdateTodoItem }: IProps) => {
    return <ul
        className='todo-item-list'
        data-testid='todo-item-list'>
        {
            todosData.map((todoData, index) => {
                return <TodoItem
                    key={index}
                    todoData={todoData}
                    onHandleUpdateTodoItem={onHandleUpdateTodoItem} />
            })
        }
    </ul>
}

export default TodoItemList