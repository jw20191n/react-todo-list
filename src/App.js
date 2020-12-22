import './App.css';
import React, { useEffect, useState } from 'react';

const INIT_TODOS = [
  {
    text: 'learn React',
    isComplete: false
  },
  {
    text: 'Meet friends for lunch',
    isComplete: false
  },
  {
    text: 'Develop course project',
    isComplete: false
  }
];

//div prints out all the todo items in INIT_TODOS array
function Todo ({ todo, removeFromTodo, completeTask, index }){

  return (
    <div 
      className="todo"
      onClick={() => completeTask(index)}>
      <div 
        className="task"
        style={{
          textDecoration: todo.isComplete ? 'line-through' : ''
        }}>
        {todo.isComplete ? 
          <i className="icon far fa-check-square"></i> 
          : 
        <i className="icon fal fa-square" ></i>}
        {todo.text}
      </div>
      <a href="#!" 
         className="removeIcon" 
         onClick={(e) => {
           removeFromTodo(e, index);
           }}>
        <i className="icon far fa-trash-alt"></i>
      </a>
  
    </div>
  )
}

//form component that handles the input 
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
        onChange={(e) => {
          console.log('before: ' + value);
          setValue(e.target.value);
          console.log('after: ' + value);
        }}
        />
    </form>
  );
}


function App() {
  //localStorage.getItem('todos') is a JSON string
  //JSON.parse will convert the item into 
  const[todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || INIT_TODOS);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  //addTodo function sends in a newTask
  //add it to the old 'todos' array and form a new array - newTodos
  //and finally setState set newTodos to replace the old todos
  const addTodo = (newTask) => {
    if(newTask === ''){
      return;
    }

    let newTodos = [{text: newTask, isComplete:false}, ...todos];
    setTodos(newTodos);
  }

  const completeTask = (index) => {
    console.log('complete:' + index);
    let newTodos = [...todos];
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  }

  const removeFromTodo = (event, index) => {
    event.preventDefault(); // prevent the page reload even we set path as "#!"
    event.stopPropagation();//prevent 向上传递,防止触发completeTask
    // console.log(index);
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo}/>
        {
          todos.map( (todo, index) =>
          <Todo 
            index={index}
            removeFromTodo={removeFromTodo} 
            completeTask={completeTask}
            key={todo.text} 
            todo={todo}
          />)
        }
      </div>
    </div>
  );
}

export default App;
