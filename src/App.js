import './App.css';
import React, { useState } from 'react';

const INIT_TODOS = [
  'learn React',
  'Meet friends for lunch',
  'Develop course project'
];

//div prints out all the todo items in INIT_TODOS array
function Todo ({ todo, removeFromTodo, index }){

  return (
    <div className="todo">
      {todo}
      <a href="#!" 
         className="removeIcon" onClick={(e) => removeFromTodo(e, index)}>
        <i className="far fa-trash-alt"></i>
      </a>
    </div>
  )
}

//form that handles the input 
function TodoForm( {addTodo} ) {
  const [value, setValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(value);
    console.log(value);
    setValue('');
  }
  return(
    <form onSubmit={handleSubmit}>
      <input 
        value={value}
        className="input" 
        onChange={(e) => {setValue(e.target.value)}}
        />
    </form>
  );
}


function App() {

  const[todos, setTodos] = useState(INIT_TODOS);

  //addTodo function sends in a newTask
  //add it to the old 'todos' array and form a new array - newTodos
  //and finally setState set newTodos to replace the old todos
  const addTodo = (newTask) => {
    if(newTask === ''){
      return;
    }

    let newTodos = [newTask, ...todos];
    setTodos(newTodos);
  }

  const removeFromTodo = (event, index) => {
    // prevent the page reload even we set path as "#!"
    event.preventDefault();
    // console.log(event.target);
    console.log(index);
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo}/>
        {
          todos.map( (item, index) =>
          <Todo 
            index={index}
            removeFromTodo={removeFromTodo} 
            key={item} 
            todo={item}
          />)
        }
      </div>
    </div>
  );
}

export default App;
