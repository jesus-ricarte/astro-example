import { defineMiddleware } from "astro:middleware";

/** Match netlify.toml Netlify-CDN-Cache-Control TTLs (31536000s = 365d). */
const DOCUMENT_CACHE_CONTROL =
  "public, max-age=31536000, must-revalidate, s-maxage=31536000, stale-while-revalidate=31536000";

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const type = response.headers.get("content-type") ?? "";
  if (!response.ok || !type.includes("text/html")) {
    return response;
  }
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", DOCUMENT_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
