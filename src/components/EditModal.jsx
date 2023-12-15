import React, { useState } from 'react';

const EditModal = ({ todo, editTodo, closeModal, showModal }) => {
  const [editedTodo, setEditedTodo] = useState({ ...todo });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = value
    if (type === 'checkbox') {
      newValue = checked;
    } else if (name === 'state') {
      newValue = value === 'completada';
    }

    setEditedTodo({
      ...editedTodo,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, editedTodo);
    closeModal();
  };

  return (
    <>
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Todo</h5>
                  <button type="button" className="close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    name="title"
                    placeholder="Introduce nombre de la tarea"
                    type="text"
                    className="form-control mb-2"
                    value={editedTodo.title}
                    onChange={handleChange}
                  />
                  <textarea
                    name="description"
                    placeholder="Introduce la descripcion"
                    className="form-control mb-2"
                    value={editedTodo.description}
                    onChange={handleChange}
                  />
                  <select
                    name="state"
                    className="form-control mb-2"
                    value={editedTodo.state ? 'completada' : 'pendiente'} // Use conditional value based on editedTodo.state
                    onChange={handleChange}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="completada">Completada</option>
                  </select>
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="priority"
                      id="inputchecked"
                      checked={editedTodo.priority}
                      onChange={handleChange}
                    />
                    <label htmlFor="inputchecked" className="form-check-label">
                      Prioridad
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
