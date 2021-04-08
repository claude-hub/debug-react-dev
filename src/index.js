// import React from "react";
// import ReactDOM from "react-dom";
import React from "./react/react";
import ReactDom from "./react/react-dom";
import "./index.css";
// import App from "./App";
// import Concurrent from "./pages/concurrent";
// import Level from "./pages/level";

const rootEl = document.querySelector("#root");

ReactDom.render(
  React.createElement(
    "div",
    null,
    React.createElement("strong", null, "Hello"),
    React.createElement("span", null, "World!")
  ),
  rootEl
);

// ReactDOM.render(<App />, rootEl);

// ReactDOM.unstable_createRoot(rootEl).render(
//   <Concurrent />
// );

// 并发模式从 0 - 2 - 3
// ReactDOM.unstable_createRoot(rootEl).render(<Level />);

// 同步模式从 0 - 1 - 3
// ReactDOM.render(<Level />, rootEl);
