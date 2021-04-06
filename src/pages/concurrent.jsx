import React from "react";

function Concurrent() {
  return (
    <ul>
      {new Array(4500).fill(0).map((_, index) => {
        return <li key={index}>{index}</li>;
      })}
    </ul>
  );
}

export default Concurrent;
