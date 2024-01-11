{
  /*Denne del af koden gik jeg på SolidJS Discord server for at få hjælp og spørge til råds til. 
Jeg har en generel forståelse af selve koden, men har ikke selv skrevet den og har ikke styr på alle dele af den*/
}

// Import necessary SolidJS functions.
import { createMemo, createEffect, createSignal } from "solid-js";

// Initialize cache, listeners and handlers.
const cache = {};
const listeners = {};
const handlers = {};

// Defines the createQuery function.
export const createQuery = ({ key, fn, refetch }) => {
  const hashedKey = createMemo(() => ({ hash: hashKey(key()), input: key() }));

  // Creates a signal and sets the value to the cached value or a loading state.
  const [value, setValue] = createSignal(
    cache[hashedKey().hash] || { loading: true },
  );

  createEffect((prev) => {
    if (prev) prev();

    setValue(cache[hashedKey().hash] || { loading: true });

    const { hash, input } = hashedKey();

    listeners[hash] ??= [];

    const handler = (val) => setValue(val);

    listeners[hash].push(handler);

    if (!handlers[hash]) {
      const get = async () => {
        let val;

        try {
          val = { value: await fn(input) };
        } catch (error) {
          val = { error };
        }

        cache[hash] = val;
        listeners[hash].forEach((fn) => fn(val));
      };

      if (refetch) {
        (async () => {
          while (listeners[hash].length > 0) {
            await get();
            await new Promise((resolve) => setTimeout(resolve, refetch()));
          }

          delete handlers[hash];
        })();
      } else {
        get();
      }
    }

    return () => {
      listeners[hash] = listeners[hash].filter(
        (listener) => listener !== handler,
      );
    };
  });

  return value;
};

const hashKey = (key) => {
  if (Array.isArray(key))
    return `[${key.reduce((acc, val, i) => `${acc}${i}${hashKey(val)}`, "")}]`;

  return String(key);
};
