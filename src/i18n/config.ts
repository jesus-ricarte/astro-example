/** URL segment + Astro i18n locale id (lowercase, matches Netlify). */
export type LocaleCode = "en-us" | "es-es" | "ca-es";

export type SemanticRouteId = "products";

type LocaleRoutes = Record<SemanticRouteId, { segment: string; label: string }>;

export const LOCALES = [
  {
    code: "en-us" as const,
    lang: "en",
    label: "United States (English)",
    routes: {
      products: { segment: "products", label: "Products" },
    } satisfies LocaleRoutes,
  },
  {
    code: "es-es" as const,
    lang: "es",
    label: "España (Español)",
    routes: {
      products: { segment: "productos", label: "Productos" },
    } satisfies LocaleRoutes,
  },
  {
    code: "ca-es" as const,
    lang: "ca",
    label: "Espanya (Català)",
    routes: {
      products: { segment: "productes", label: "Productes" },
    } satisfies LocaleRoutes,
  },
] as const;

export function getLocaleEntry(localeSegment: string) {
  return LOCALES.find((l) => l.code === localeSegment);
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
