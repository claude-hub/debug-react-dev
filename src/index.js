// import React from "react";
// import ReactDOM from "react-dom";
import React from "./react/react";
import ReactDOM from "./react/react-dom";
import "./index.css";

const rootEl = document.querySelector("#root");

const updateValue = (e) => {
  reRender(e.target.value);
};

/** jsx
<div>
  <input onInput={updateValue} value={value} />
  <h2>Hello {value}</h2>
</div>
*/
const reRender = (value) => {
  ReactDOM.render(
    React.createElement(
      "div",
      null,
      React.createElement("input", {
        onInput: updateValue,
        value: value,
      }),
      React.createElement("h2", null, "Hello ", value)
    ),
    rootEl
  );
};

reRender("World");
