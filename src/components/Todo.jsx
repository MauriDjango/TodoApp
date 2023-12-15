import React from 'react';

/**
 * Component representing a single todo item.
 * @param {Function} openModal - Function to open the modal for editing the todo.
 * @param {Object} todo - The todo object containing details like title, description, priority, and state.
 * @param {Function} deleteTodo - Function to delete the todo item.
 * @param {Function} updateTodo - Function to update the state of the todo.
 * @returns {JSX.Element} Rendered Todo component.
 */
export const Todo = ({ openModal, todo, deleteTodo, updateTodo }) => {
  const { id, title, description, priority, state } = todo;

  return (
    <li className='list-group-item'>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className={state ? 'completada' : ''}>
            {title}
          </h5>
          <p className={state ? 'completada' : ''}>{description}</p>
          <div className='d-flex'>
            <button onClick={() => deleteTodo(id)} className='btn btn-sm btn-danger mr-2'>Eliminar</button>
            <button onClick={() => openModal(todo)} className='btn btn-sm btn-warning mr-2'>Editar</button>
            <button onClick={() => updateTodo(id)} className='btn btn-sm btn-primary'>Actualizar Estado</button>
          </div>
        </div>
        <span className="badge badge-primary">
          {priority && "prioridad"}
        </span>
      </div>
    </li>
  );
};

export default Todo;
