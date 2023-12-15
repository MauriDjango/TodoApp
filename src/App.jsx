import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario.jsx'
import TodoList from './components/TodoList.jsx'
import EditModal from './components/EditModal.jsx'

const initialState = [
  {
    id:1,
    title:"todo 01",
    description:"Descripcion 01",
    priority:false,
    state:true // Cambiamos a un booleano para manejarlo mejor. true = completed
  },
  {
    id:2,
    title:"todo 02",
    description:"Descripcion 02",
    priority:false,
    state:true
  }
]

const App = () => {

  // Estado - Lista de componentes
  const [todos, setTodos] = useState(initialState)

  // Funcion añadir tarea
  const addTodo = todo => {
    setTodos([...todos,todo])
  }

  // Función deleteTodo
  const deleteTodo = id => {
    const newArray = todos.filter(todo => todo.id !== id)
    setTodos(newArray)
  }

  // Función updateTodo
// Función updateTodo
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

  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    console.log('showModal value changed:', showModal);
  }, [showModal]);

  const openModal = todo => {
    setSelectedTodo(todo); // Pass the entire todo object
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? updatedTodo : todo));
    setTodos(updatedTodos);
  };
  
  return (
    <div className='container'>
      <h1>Formularios</h1>
      < Formulario addTodo = {addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} openModal={openModal} />
      {showModal && (
        <EditModal
          todo={selectedTodo}
          editTodo={editTodo}
          closeModal={closeModal}
          showModal={showModal}// Pass down closeModal function
        />
      )}
    </div>
  )
}

export default App