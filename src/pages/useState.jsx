import { useState } from "../CONST";

function TodoList() {
  const [state, setState] = useState({
    todos: ["todo1"],
    title: "Hello World!",
  });
  function addTodo() {
    setState((prevState) => {
      const len = prevState.todos.length + 1;
      return {
        ...prevState,
        todos: [...prevState.todos.concat(`todo${len}`)],
      };
    });
  }
  function delTodo() {
    setState((prevState) => {
      const len = prevState.todos.length;
      return {
        ...prevState,
        todos: [...prevState.todos.filter((todo) => todo !== `todo${len}`)],
      };
    });
  }
  return (
    <>
      <p>Todos: {JSON.stringify(state.todos)}</p>
      <p>{state.title}</p>
      <div>
        <button onClick={addTodo}>+</button>
        &nbsp;&nbsp;
        <button onClick={delTodo}>-</button>
      </div>
    </>
  );
}

export default TodoList;
