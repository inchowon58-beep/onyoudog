import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/Bits.jsx";
import { SEO_KEYWORDS } from "../data/seo/keywords.js";
import { LOCAL_SEO_PAGES, seoLocalPagePath } from "../data/seo/local-pages.js";
import { usePageTitle } from "../usePageTitle.js";

const PAGE_SIZE = 80;

function buildDirectory(pages) {
  const byRegion = new Map();
  for (const page of pages) {
    if (!byRegion.has(page.regionGroup)) {
      byRegion.set(page.regionGroup, new Map());
    }
    const places = byRegion.get(page.regionGroup);
    if (!places.has(page.placeLabel)) {
      places.set(page.placeLabel, {});
    }
    places.get(page.placeLabel)[page.keyword] = page;
  }
  return [...byRegion.entries()].map(([region, placeMap]) => ({
    region,
    places: [...placeMap.entries()].map(([placeLabel, byKeyword]) => ({
      placeLabel,
      byKeyword,
    })),
  }));
}

export function LocalPlacesPage() {
  usePageTitle("세부 지역 분양 안내 전체 목록 | 온유독");

  const directory = useMemo(() => buildDirectory(LOCAL_SEO_PAGES), []);
  const regions = useMemo(() => directory.map((d) => d.region), [directory]);

  const [region, setRegion] = useState("all");
  const [keyword, setKeyword] = useState("all");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const flatRows = useMemo(() => {
    const rows = [];
    for (const block of directory) {
      if (region !== "all" && block.region !== region) continue;
      for (const entry of block.places) {
        if (query.trim()) {
          const q = query.trim().toLowerCase();
          const hay = `${entry.placeLabel} ${block.region}`.toLowerCase();
          if (!hay.includes(q)) continue;
        }
        rows.push({ region: block.region, ...entry });
      }
    }
    return rows;
  }, [directory, region, query]);

  const totalPages = Math.max(1, Math.ceil(flatRows.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const slice = flatRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const keywordFilter = keyword === "all" ? SEO_KEYWORDS : SEO_KEYWORDS.filter((k) => k.slug === keyword);

  return (
    <article className="page region-links-page local-places-page">
      <PageHero kicker="LOCAL INDEX" title="세부 지역 분양 안내 전체 목록" />
      <div className="wrap region-links-page__body">
        <p className="local-places-page__intro">
          지역·동·읍·면별 {SEO_KEYWORDS.map((k) => k.label).join(" · ")} 안내 페이지입니다.{" "}
          <Link to="/local-links">50권역 목록</Link>과 함께 보실 수 있습니다.
        </p>

        <div className="local-places-page__filters">
          <label className="local-places-page__search">
            <span className="sr-only">지명 검색</span>
            <input
              type="search"
              placeholder="지명·권역 검색"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setPage(1);
            }}
            aria-label="권역 묶음"
          >
            <option value="all">전체 권역 ({regions.length})</option>
            {regions.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
            aria-label="키워드"
          >
            <option value="all">키워드 4종 모두</option>
            {SEO_KEYWORDS.map((k) => (
              <option key={k.slug} value={k.slug}>
                {k.label}
              </option>
            ))}
          </select>
        </div>

        <p className="region-links-page__meta">
          {flatRows.length.toLocaleString("ko-KR")}개 지명 · 페이지 {safePage}/{totalPages}
        </p>

        <ul className="local-places-page__list">
          {slice.map((row) => (
            <li key={`${row.region}-${row.placeLabel}`}>
              <div className="local-places-page__place">
                <strong>{row.placeLabel}</strong>
                <span className="local-places-page__region">{row.region}</span>
              </div>
              <div className="local-places-page__links">
                {keywordFilter.map((k) => {
                  const item = row.byKeyword[k.slug];
                  if (!item) return null;
                  return (
                    <Link key={k.slug} to={seoLocalPagePath(item)}>
                      {k.label}
                    </Link>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>

        {totalPages > 1 ? (
          <div className="pager local-places-page__pager">
            <button type="button" disabled={safePage <= 1} onClick={() => setPage((p) => p - 1)}>
              이전
            </button>
            <span>
              {safePage} / {totalPages}
            </span>
            <button type="button" disabled={safePage >= totalPages} onClick={() => setPage((p) => p + 1)}>
              다음
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}
