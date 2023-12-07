import { tv } from "tailwind-variants";

export const toggle = tv({
  slots: {
    container: "relative inline-flex cursor-pointer items-center",
    input: "peer sr-only",
    ball: "peer h-5 w-9 rounded-full border-gray-600 bg-gray-700 after:absolute after:start-[2px] after:top-[2px]  after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-peach peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full",
  },
});
