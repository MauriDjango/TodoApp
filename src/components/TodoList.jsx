import React from 'react';
import { Todo } from './Todo.jsx';

/**
 * Component rendering a list of todo items.
 * @param {Array} todos - An array of todo objects.
 * @param {Function} deleteTodo - Function to delete a todo item.
 * @param {Function} updateTodo - Function to update the state of a todo.
 * @param {Function} openModal - Function to open the modal for editing a todo.
 * @returns {JSX.Element} Rendered TodoList component.
 */
const TodoList = ({ todos, deleteTodo, updateTodo, openModal }) => {
  return (
    <div className='mt-2'>
      <h1 className='text-center'>Lista de tareas</h1>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} openModal={openModal} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
