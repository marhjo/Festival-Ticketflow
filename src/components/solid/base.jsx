import { button } from "@/styles/button";
import { card } from "@/styles/card";
import { createMemo, createEffect } from "solid-js";
import { Dynamic } from "solid-js/web";

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
