import React, { useEffect, useState } from 'react';
import Formulario from './components/Formulario.jsx';
import TodoList from './components/TodoList.jsx';
import EditModal from './components/EditModal.jsx';

// Initial state for todos
const initialState = [
  {
    id: 1,
    title: "todo 01",
    description: "Descripcion 01",
    priority: false,
    state: true // Boolean to manage completion status (true = completed)
  },
  {
    id: 2,
    title: "todo 02",
    description: "Descripcion 02",
    priority: false,
    state: true
  }
]

/**
 * Main application component managing todo functionalities.
 * @returns {JSX.Element} Rendered App component.
 */
const App = () => {
  // State - List of todos
  const [todos, setTodos] = useState(initialState);

  // Function to add a todo
  const addTodo = todo => {
    setTodos([...todos, todo]);
  }

  // Function to delete a todo
  const deleteTodo = id => {
    const newArray = todos.filter(todo => todo.id !== id);
    setTodos(newArray);
  }

  // Function to update a todo's completion status
  const updateTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          state: !todo.state // Update the state property immutably
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Function to sort todos based on completion and priority
  const sortTodos = () => {
    const pendingPriorityTasks = todos.filter(todo => !todo.state && todo.priority);
    const pendingNonPriorityTasks = todos.filter(todo => !todo.state && !todo.priority);
    const completedTasks = todos.filter(todo => todo.state);

    const sorted = [...pendingPriorityTasks, ...pendingNonPriorityTasks, ...completedTasks];

    // Check if the sorted array is different from the current todos state
    if (!arraysAreEqual(sorted, todos)) {
      setTodos([...sorted]); // Update state triggering re-render
    }
  };

  // Function to check if two arrays are equal
  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  // Automatically sort on load or when there's a change in 'todos'
  useEffect(() => {
    sortTodos();
  }, [todos]);

  // State for managing the modal visibility and the selected todo
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // Log changes in 'showModal'
  useEffect(() => {
    console.log('showModal value changed:', showModal);
  }, [showModal]);

  // Function to open the edit modal for a todo
  const openModal = todo => {
    setSelectedTodo(todo); // Pass the entire todo object
    setShowModal(true);
  };

  // Function to close the edit modal
  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  // Function to edit a todo
  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
    setTodos(updatedTodos);
  };

  return (
    <div className='container'>
      <h1>Formularios</h1>
      <Formulario addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} openModal={openModal} />
      {showModal && (
        <EditModal
          todo={selectedTodo}
          editTodo={editTodo}
          closeModal={closeModal}
          showModal={showModal} // Pass down showModal state
        />
      )}
    </div>
  )
}

export default App;
