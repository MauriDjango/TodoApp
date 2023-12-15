import React from 'react'
import { Todo } from './Todo.jsx'

const TodoList = ({todos, deleteTodo, updateTodo}) => {
  return (
    <div className='mt-2'>
    <h1 className='text-center'>Lista de tareas</h1>
      <ul>
        {
          todos.map(todo=> (
            < Todo key={todo.id} todo = {todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
          ))
        }
      </ul>
    </div>

  )
}

export default TodoList