import { LOCAL_SEO_PAGES_RAW } from "./local-pages.raw.js";
import { SEO_KEYWORDS } from "./keywords.js";

export const LOCAL_SEO_PAGES = LOCAL_SEO_PAGES_RAW;

export function seoLocalPagePath(page) {
  return `/${encodeURIComponent(page.keyword)}/${encodeURIComponent(page.scope)}`;
}

export function findLocalSeoPage(keyword, scope) {
  const decodedKeyword = decodeURIComponent(keyword || "");
  const decodedScope = decodeURIComponent(scope || "");
  return LOCAL_SEO_PAGES.find(
    (row) => row.keyword === decodedKeyword && row.scope === decodedScope,
  );
}

export function isLocalKeywordSlug(keyword) {
  const decoded = decodeURIComponent(keyword || "");
  return SEO_KEYWORDS.some((item) => item.slug === decoded);
}
