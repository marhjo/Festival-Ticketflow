import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solid from "@astrojs/solid-js";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    solid({
      include: ["**/solid/**/*"],
    }),
    react({
      include: ["**/react/**/*"],
    }),
  ],
});
