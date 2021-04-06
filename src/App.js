import React from "react";
import UseStatePage from "./pages/useState";
// import Concurrent from "./pages/concurrent";

function App() {
  return (
    <div className="App">
      <UseStatePage />

      {/* concurrent模式，开启时间切片等 */}
      {/* <Concurrent /> */}
    </div>
  );
}

export default App;
