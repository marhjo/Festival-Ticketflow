import { createSignal, onCleanup } from "solid-js";

export const useTime = () => {
  const [time, setTime] = createSignal(Date.now());

  const interval = setInterval(() => setTime(Date.now()), 1000 / 15);

  onCleanup(() => clearInterval(interval));

  return time;
};
