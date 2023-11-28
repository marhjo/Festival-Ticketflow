import { useState } from "react";

export const Counter2 = () => {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      className="p-2 bg-mauve text-white rounded-md"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Count: {count}
    </button>
  );
};
