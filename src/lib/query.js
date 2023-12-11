import { createMemo, createEffect, createSignal } from "solid-js";

const cache = {};
const listeners = {};
const handlers = {};

export const createQuery = ({ key, fn, refetch }) => {
  const hashedKey = createMemo(() => ({ hash: hashKey(key()), input: key() }));

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
