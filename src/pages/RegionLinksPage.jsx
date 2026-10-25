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
        <p className="local-places-page__intro">
          50개 권역 안내입니다. 동·읍·면별 세부 페이지 전체는{" "}
          <Link to="/local-places">세부 지역 전체 목록</Link>에서 검색·필터로 볼 수 있습니다.
        </p>
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
