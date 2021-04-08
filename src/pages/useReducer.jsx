// import { useReducer } from "../CONST";
import { useState } from "../CONST";

// 你应该注意到了，这是一个自定义的钩子
function useReducer(reduce, initData) {
  // 接受一个函数
  const [state, setState] = useState(() => initData);
  function dispatch(action) {
    if (typeof action === "function") {
      setState((preState) => reduce(preState, action(preState)));
    } else {
      setState(reduce(state, action));
    }
  }
  return [state, dispatch];
}

const initialState = {
  todos: ["todo1"],
  title: "Hello World!",
};

function reducer(state, action) {
  const len = state.todos.length;
  switch (action.type) {
    case "increment":
      return {
        ...state,
        todos: state.todos.concat(`todo${len + 1}`),
      };
    case "decrement":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo !== `todo${len}`),
      };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <p>Todos: {JSON.stringify(state.todos)}</p>
      <p>{state.title}</p>
      <div>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        &nbsp; &nbsp;
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      </div>
    </>
  );
}

export default Counter;
