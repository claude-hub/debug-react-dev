import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

console.log(React.version);

ReactDOM.render(<App />, document.getElementById("root"));

// ReactDOM.unstable_createRoot(document.getElementById("root")).render(<App />);
