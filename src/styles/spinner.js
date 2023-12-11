import { tv } from "tailwind-variants";

export const spinner = tv({
  base: "h-5 w-5 animate-spin",
  slots: {
    circle: "opacity-25",
    path: "opacity-75",
  },
});
