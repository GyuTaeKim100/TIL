
import React, { useState, useRef, useCallback } from 'react';

import TodoTemplate from './components/TodoTemplate';

function App() {
  console.count('App')
  const [todos, setTodos] = useState([])
  const refNextId = useRef(1)
  const handleAddTodoItem= useCallback((text)=> {
    const nextId = refNextId.current
    refNextId.current++

    setTodos(todos =>[...todos , {
      id:nextId,
      text: text,
      done: false
    }])
  }, [])

  const handleDeleteTodoItem= useCallback((id)=> {
    setTodos(todos => todos.filter((todo)=> todo.id !== id))
  },[])

  const handleToggleTodoItem = useCallback((id) => {
    setTodos( todos=> todos.map((todo)=>{
      if(todo.id === id) {
        return {
          ...todo,
          done: !todo.done
        }
      }

      return todo
    }))
  }, [])

  const handleModifyTodoItem = useCallback(({id, text}) => {
    
    setTodos(todos=>todos.map((todo)=>{
      if(todo.id === id) {
        return {
          ...todo,
          text: text
        }
      }

      return todo
    }))
  }, [])

  return (
    <div className="App">
      <TodoTemplate todos={todos} onAdd={handleAddTodoItem} onDelete={handleDeleteTodoItem} onToggle={handleToggleTodoItem} onModify={handleModifyTodoItem}/>
    </div>
  );
}

export default App;
