import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
// import Concurrent from "./pages/concurrent";
import Level from "./pages/level";

console.log(React.version);
const rootEl = document.querySelector("#root");

// ReactDOM.render(<App />, rootEl);

// ReactDOM.unstable_createRoot(rootEl).render(
//   <Concurrent />
// );

// 并发模式从 0 - 2 - 3
ReactDOM.unstable_createRoot(rootEl).render(<Level />);

// 同步模式从 0 - 1 - 3
// ReactDOM.render(<Level />, rootEl);

// 基础 Hook
//   useState
//   useEffect
//   useContext

// 额外的 Hook
//   useReducer
//   useCallback
//   useMemo
//   useRef
//   useImperativeHandle
//   useLayoutEffect
//   useDebugValue
