export type LocalePath = "en-us" | "es-es" | "ca-es";

export type LocaleCode = "en-US" | "es-ES" | "ca-ES";

export type SemanticRouteId = "products";

type LocaleRoutes = Record<SemanticRouteId, { segment: string; label: string }>;

export const LOCALES = [
  {
    path: "en-us" as const,
    code: "en-US" as const,
    lang: "en",
    label: "United States (English)",
    routes: {
      products: { segment: "products", label: "Products" },
    } satisfies LocaleRoutes,
  },
  {
    path: "es-es" as const,
    code: "es-ES" as const,
    lang: "es",
    label: "España (Español)",
    routes: {
      products: { segment: "productos", label: "Productos" },
    } satisfies LocaleRoutes,
  },
  {
    path: "ca-es" as const,
    code: "ca-ES" as const,
    lang: "ca",
    label: "Espanya (Català)",
    routes: {
      products: { segment: "productes", label: "Productes" },
    } satisfies LocaleRoutes,
  },
] as const;

export function getLocaleEntryByPath(path: string) {
  return LOCALES.find((l) => l.path === path);
}

export function getLocaleHubStaticPaths() {
  return LOCALES.map((loc) => ({ params: { locale: loc.path } }));
}

export function getProductStaticPaths() {
  return LOCALES.map((loc) => ({
    params: { locale: loc.path, slug: loc.routes.products.segment },
  }));
}

export function resolvePageRoute(
  localePath: string,
  slug: string,
): {
  routeId: SemanticRouteId;
  code: LocaleCode;
  lang: string;
  label: string;
} | null {
  const entry = getLocaleEntryByPath(localePath);
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
