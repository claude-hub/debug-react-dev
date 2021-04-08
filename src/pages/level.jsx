import React, { useEffect, useState, useRef } from "react";

function Level() {
  const buttonRef = useRef(null);
  const [count, updateCount] = useState(0);

  const onClick = () => {
    updateCount((count) => count + 2);
  };

  useEffect(() => {
    const button = buttonRef.current;
    setTimeout(() => updateCount(1), 1000);
    setTimeout(() => button.click(), 1020);

    // 同步模式是 0 -> 1 -> 3

    // 并发模式是 0 -> 2 -> 3
    // 因为更新被高优先级的中断，执行完高优先级的任务后，继续执行本任务，但是这个时候的count变为2了，所以+1就是3
  }, []);

  return (
    <div>
      <button ref={buttonRef} onClick={onClick}>
        增加2
      </button>
      <div>
        {Array.from(new Array(4500)).map((v, index) => (
          <span key={index}>{count}</span>
        ))}
      </div>
    </div>
  );
}

export default Level;
