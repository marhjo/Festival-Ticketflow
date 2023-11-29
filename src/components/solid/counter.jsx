import { createSignal } from "solid-js";
import { Button } from "./base";

export const Counter = () => {
  const [count, setCount] = createSignal(0);

  return (
    <Button type="button" onClick={() => setCount(count() + 1)}>
      Count: {count()}
    </Button>
  );
};
