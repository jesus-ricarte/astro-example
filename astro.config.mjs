// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://venerable-bavarois-9373ed.netlify.app/",
  adapter: netlify(),
  image: {
    domains: ["i.imgur.com"],
  },
  i18n: {
    // Must match a locale `path` (not only a `codes` entry) when using custom paths.
    defaultLocale: "en-US",
    locales: [
      { path: "en-us", codes: ["en-US"] },
      { path: "es-es", codes: ["es-ES"] },
      { path: "ca-es", codes: ["ca-ES"] },
    ],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
