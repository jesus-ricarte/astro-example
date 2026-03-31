/** Match `trailingSlash: 'never'` in astro.config.ts */
export function canonicalPathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
