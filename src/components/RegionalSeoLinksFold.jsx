import { Link } from "react-router-dom";
import { SEO_REGION_PAGES, seoRegionPagePath } from "../data/seo/regions.js";

export function RegionalSeoLinksFold({ compact = false }) {
  return (
    <details className={`regional-seo-fold seo-fold ${compact ? "regional-seo-fold--compact" : ""}`}>
      <summary aria-label="전국 권역 분양 안내 펼치기">
        <span className="seo-toggle seo-toggle--sm" />
        {!compact ? <span className="regional-seo-fold__label">전국 강아지분양 안내</span> : null}
      </summary>
      <ul className="regional-seo-fold__list">
        {SEO_REGION_PAGES.map((page) => (
          <li key={page.id}>
            <Link to={seoRegionPagePath(page)}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
