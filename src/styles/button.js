import { tv } from "tailwind-variants";

export const button = tv({
  base: "flex items-center justify-center gap-2 rounded-md font-medium",
  variants: {
    color: {
      primary: "bg-peach text-white",
      secondary: "bg-blue-500 text-white",
      error: "bg-red-400 text-white",
      disabled: "cursor-default bg-gray-500 text-white",
    },
    size: {
      md: "px-3 py-2",
      sm: "px-1",
    },
    square: {},
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
  compoundVariants: [
    {
      size: "md",
      square: true,
      class: "h-10 w-10",
    },
    {
      size: "sm",
      square: true,
      class: "h-6 w-6",
    },
  ],
});
