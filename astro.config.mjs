// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://venerable-bavarois-9373ed.netlify.app/",
  adapter: netlify(),
  image: {
    domains: ["i.imgur.com"],
  },
  i18n: {
    defaultLocale: "en-US",
    locales: ["en-US", "es-ES", "ca-ES"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
