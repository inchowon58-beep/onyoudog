import { SEO_REGION_PAGES_RAW } from "./regions50.raw.js";
import { findLocalSeoPage, isLocalKeywordSlug } from "./local-pages.js";

export const SEO_REGION_PAGES = SEO_REGION_PAGES_RAW;

/** 50권역 또는 세부 지역(4키워드) 페이지 */
export function findSeoPage(keyword, scope) {
  const decodedKeyword = decodeURIComponent(keyword || "");
  const decodedScope = decodeURIComponent(scope || "");
  const region = SEO_REGION_PAGES.find(
    (row) => row.keyword === decodedKeyword && row.scope === decodedScope,
  );
  if (region) return { ...region, kind: "region" };
  if (isLocalKeywordSlug(decodedKeyword)) {
    const local = findLocalSeoPage(decodedKeyword, decodedScope);
    if (local) return local;
  }
  return null;
}

/** @deprecated — replaced by SEO_REGION_PAGES (50 editorial zones) */
export const SEO_REGIONS = SEO_REGION_PAGES;

export function seoRegionPagePath(page) {
  return `/${encodeURIComponent(page.keyword)}/${encodeURIComponent(page.scope)}`;
}

export function findSeoRegionPage(keyword, scope) {
  const decodedKeyword = decodeURIComponent(keyword || "");
  const decodedScope = decodeURIComponent(scope || "");
  return SEO_REGION_PAGES.find(
    (row) => row.keyword === decodedKeyword && row.scope === decodedScope,
  );
}

/** Legacy helper — no longer used for Incheon dong URLs */
export function findSeoRegion() {
  return null;
}

export function seoRegionPath(_keywordSlug, page) {
  if (page?.keyword && page?.scope) return seoRegionPagePath(page);
  return "/local-links";
}
