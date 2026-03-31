export type LocaleCode = "en-US" | "es-ES" | "ca-ES";

export type SemanticRouteId = "products";

type LocaleRoutes = Record<SemanticRouteId, { segment: string; label: string }>;

export const LOCALES = [
  {
    code: "en-US" as const,
    lang: "en",
    label: "United States (English)",
    routes: {
      products: { segment: "products", label: "Products" },
    } satisfies LocaleRoutes,
  },
  {
    code: "es-ES" as const,
    lang: "es",
    label: "España (Español)",
    routes: {
      products: { segment: "productos", label: "Productos" },
    } satisfies LocaleRoutes,
  },
  {
    code: "ca-ES" as const,
    lang: "ca",
    label: "Espanya (Català)",
    routes: {
      products: { segment: "productes", label: "Productes" },
    } satisfies LocaleRoutes,
  },
] as const;

/** Lowercase path prefix; Astro `i18n.locales` must use this shape. */
export function localePathSegment(code: LocaleCode): string {
  return code.toLowerCase();
}

export function getLocaleEntry(locale: string) {
  const key = locale.toLowerCase();
  return LOCALES.find((l) => l.code.toLowerCase() === key);
}

export function resolvePageRoute(
  locale: string,
  slug: string,
): {
  routeId: SemanticRouteId;
  code: LocaleCode;
  lang: string;
  label: string;
} | null {
  const entry = getLocaleEntry(locale);
  if (!entry) return null;

  for (const routeId of Object.keys(entry.routes) as SemanticRouteId[]) {
    const route = entry.routes[routeId];
    if (route.segment === slug) {
      return {
        routeId,
        code: entry.code,
        lang: entry.lang,
        label: route.label,
      };
    }
  }

  return null;
}
