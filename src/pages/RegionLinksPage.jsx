import { Link } from "react-router-dom";
import { PageHero } from "../components/Bits.jsx";
import { SEO_REGION_PAGES, seoRegionPagePath } from "../data/seo/regions.js";
import { usePageTitle } from "../usePageTitle.js";

export function RegionLinksPage() {
  usePageTitle("전국 강아지분양 안내 | 온유독");

  return (
    <article className="page region-links-page">
      <PageHero kicker="LOCAL GUIDE" title="전국 강아지분양 안내" />
      <div className="wrap region-links-page__body">
        <ul className="region-links-page__list">
          {SEO_REGION_PAGES.map((page) => (
            <li key={page.id}>
              <Link to={seoRegionPagePath(page)}>{page.title}</Link>
              <span className="region-links-page__coverage">{page.coverage}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
