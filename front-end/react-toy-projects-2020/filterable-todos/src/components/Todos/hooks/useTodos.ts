import useTodosBase from './useTodosBase'
import useTodosFilter from './useTodosFilter'

const uesTodos = () => {
  const { todos, handleUpdate, handleInsert } = useTodosBase()
  const { filteredTodos, todosFilterOptions, handleFilter } =
    useTodosFilter(todos)

  return {
    todos,
    todosFilterOptions,
    filteredTodos,
    handleUpdate,
    handleInsert,
    handleFilter,
  }
}

export default uesTodos
