import { useState } from "react";
import Swal from "sweetalert2";

/**
 * Component for adding todos via a form.
 * @param {Function} addTodo - Function to add a todo item to the list.
 * @returns {JSX.Element} Rendered Formulario component.
 */
const Formulario = ({ addTodo }) => {
  // State to manage form inputs
  const [todo, setTodo] = useState({
    title: "todo 01",
    description: "Descripcion 01",
    state: "pendiente",
    priority: false,
  });

  const { title, description, priority, state } = todo;

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check for empty title or description
    if (title.trim() === "" || description.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo va mal...!",
      });
    }

    // Adding todo with updated state and assigning a unique ID
    addTodo({
      ...todo,
      id: Date.now(),
      state: state === "completada", // Assign boolean value based on state
    });

    console.log(`Enviando ${todo.title}, ${todo.description} y ${todo.state} al servidor...`);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Introduce nombre de la tarea"
          type="text"
          className="form-control mb-2"
          value={todo.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Introduce la descripcion"
          className="form-control mb-2"
          value={todo.description}
          onChange={handleChange}
        />
        <select
          name="state"
          className="form-control mb-2"
          value={todo.state}
          onChange={handleChange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>

        {/* Adding checkbox for priority */}
        <div className="form-checked mb-2">
          <input
            className="form-checked-input"
            type="checkbox"
            name="priority"
            id="inputchecked"
            checked={todo.priority}
            onChange={handleChange}
          />
          <label htmlFor="inputchecked" className="form-checked-label">
            Prioridad
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Añadir
        </button>
      </form>
    </div>
  );
};

export default Formulario;
