// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://jesusricarte.netlify.app/",
  adapter: netlify(),
  image: {
    domains: ["i.imgur.com"],
  },
  i18n: {
    defaultLocale: "en-us",
    locales: ["en-us", "es-es", "ca-es"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
