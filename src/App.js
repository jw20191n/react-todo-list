import './App.css';
import React, { useState } from 'react';

const INIT_TODOS = [
  'learn React',
  'Meet friends for lunch',
  'Develop course project'
];

//div prints out all the todo items in INIT_TODOS array
function Todo ({ todo }){
  return (
    <div className="todo">{todo}</div>
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
    let newTodos = [newTask, ...todos];
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo}/>
        {
          todos.map( (item)=><Todo key={item} todo={item}/>)
        }
      </div>
    </div>
  );
}

export default App;
