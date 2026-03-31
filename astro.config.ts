import netlify from "@astrojs/netlify";
import { defineConfig } from "astro/config";

import { ASTRO_DEFAULT_LOCALE, ASTRO_I18N_LOCALES } from "./src/i18n/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://ricarte-shop.netlify.app/",
  adapter: netlify(),
  image: {
    domains: ["i.imgur.com"],
  },
  i18n: {
    defaultLocale: ASTRO_DEFAULT_LOCALE,
    locales: [...ASTRO_I18N_LOCALES],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
