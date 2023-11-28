import { createSignal } from "solid-js";

export const Counter = () => {
  const [count, setCount] = createSignal(0);

  return (
    <button
      type="button"
      class="p-2 bg-purple-500 text-white rounded-md"
      on:click={() => setCount(count() + 1)}
    >
      Count: {count()}
    </button>
  );
};
