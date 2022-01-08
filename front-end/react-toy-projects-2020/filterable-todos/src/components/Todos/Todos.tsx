import useTodos from './hooks/useTodos'

import TodosTeplate from "./TodosTemplate"
import InsertTodo from './InsertTodo'
import FilterTodos from './FilterTodos'
import TodoItemList from './TodoItemList'

const Todos = () => {
    const { filteredTodos, todosFilterOptions, handleUpdate, handleInsert, handleFilter } = useTodos()

    return <article className='todos'>
        <h1 className="article-heading">todos</h1>
        <TodosTeplate
            form={<InsertTodo
                onInsert={handleInsert}
            />}
            filter={<FilterTodos
                todosFilterOptions={todosFilterOptions}
                onHandleFilter={handleFilter}
            />}
        >
            <TodoItemList
                todos={filteredTodos}
                onHandleUpdate={handleUpdate}
            />
        </TodosTeplate>
    </article>
}

export default Todos

