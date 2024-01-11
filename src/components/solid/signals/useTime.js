import { createSignal, onCleanup } from "solid-js";

// Signal that updates every 1000 / 15 ms
export const useTime = () => {
  const [time, setTime] = createSignal(Date.now());

  const interval = setInterval(() => setTime(Date.now()), 1000 / 15);

  onCleanup(() => clearInterval(interval));

  return time;
};
