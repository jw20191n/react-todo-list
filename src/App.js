import './App.css';

const INIT_TODOS = [
  'learn React',
  'Meet friends for lunch',
  'Develop course project'
];

function Todo ({ todo }){
  return (
    <div className="todo">{todo}</div>
  )
}

function App() {
  return (
    <div className="app">
      <div className="todo-list">
      <input className="input" />
      {
        INIT_TODOS.map( (item)=><Todo key={item} todo={item}/>)
      }
      </div>
    </div>
  );
}

export default App;
