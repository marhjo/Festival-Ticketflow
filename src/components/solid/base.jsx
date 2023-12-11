import { createMemo, createEffect } from "solid-js";
import { Dynamic } from "solid-js/web";
import { button } from "@/styles/button";
import { card } from "@/styles/card";
import { input } from "@/styles/input";
import { toggle } from "@/styles/toggle";
import { spinner } from "@/styles/spinner";

const create =
  (comp, tvfn) =>
  ({ children, reactive, ...props }) => {
    props ??= {};

    const styleProps = createMemo(() => {
      const baseProps = { ...props };

      if (typeof reactive === "object") {
        for (const key of Object.keys(reactive)) {
          const fn = reactive[key];
          if (typeof fn !== "function") continue;
          baseProps[key] = fn();
        }
      }

      return tvfn(baseProps);
    });

    return (
      <Dynamic component={comp} {...props} class={styleProps()}>
        {children}
      </Dynamic>
    );
  };

export const Button = create("button", button);
export const Card = create("div", card);
export const Input = create("input", input);

export const Toggle = ({ children: _, state: [state, setState], ...props }) => {
  const styles = toggle(props);

  return (
    <label class={styles.container()}>
      <input
        type="checkbox"
        value=""
        checked={state()}
        onChange={() => setState(!state())}
        class={styles.input()}
      />
      <div class={styles.ball()}></div>
    </label>
  );
};

export const Spinner = ({ children: _, class: c, ...props }) => {
  const styles = spinner(props);

  return (
    <svg
      class={styles.base({ class: c })}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class={styles.circle()}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="3"
      ></circle>

      <path
        class={styles.path()}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
