import { tv } from "tailwind-variants";

export const spinner = tv({
  slots: {
    base: "h-5 w-5 animate-spin",
    circle: "opacity-25",
    path: "opacity-75",
  },
});
