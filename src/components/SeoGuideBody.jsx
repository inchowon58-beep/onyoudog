import { Link } from "react-router-dom";
import { breedsByType } from "../data/breeds.js";
import { puppySeoBreedEntries } from "../data/seo/extra-puppy-breeds.js";
import { TRADE_KEYWORDS } from "../data/seo/extra-keywords.js";
import { SEO_REGION_PAGES, seoRegionPagePath } from "../data/seo/regions.js";
import { PhoneLink, TextWithPhone } from "./PhoneLink.jsx";

const catalogPuppies = breedsByType("puppy");
const puppyEntries = puppySeoBreedEntries(catalogPuppies);
const kittens = breedsByType("kitten");

function BreedLinks({ breeds, type, entries }) {
  const base = type === "kitten" ? "/kittens/breed" : "/puppies/breed";
  if (entries?.length) {
    return (
      <p className="seo-guide__breed-line">
        {entries.map((item, index) => (
          <span key={`${item.ko}-${item.slug || "seo"}`}>
            {index > 0 ? ", " : null}
            {item.slug ? (
              <Link to={`${base}/${item.slug}`}>{item.ko}분양</Link>
            ) : (
              <span>{item.ko}분양</span>
            )}
          </span>
        ))}
      </p>
    );
  }
  return (
    <p className="seo-guide__breed-line">
      {breeds.map((breed, index) => (
        <span key={breed.slug}>
          {index > 0 ? ", " : null}
          <Link to={`${base}/${breed.slug}`}>{breed.ko}분양</Link>
        </span>
      ))}
    </p>
  );
}

export function SeoGuideBody({ page, keywordMeta, sections, paragraphs, faqs, currentPath }) {
  const isLocal = page.kind === "local";
  const subAreas = isLocal ? [] : page.subAreas || [];
  const regionName = isLocal
    ? `${page.placeLabel}(${page.regionGroup})`
    : page.regionPrefix || page.keyword.replace(/강아지분양$/, "");

  return (
    <article className="seo-blog__card seo-guide">
      <h2>
        {isLocal
          ? `${page.placeLabel} ${keywordMeta.label} · 온유독 상담`
          : `${regionName} ${keywordMeta.label} · 강아지입양·애견분양 상담 온유독`}
      </h2>
      <p className="seo-guide__lede">
        {paragraphs[0] ||
          (isLocal
            ? `${page.regionGroup} ${page.placeLabel}에서 ${keywordMeta.label}을 검색하실 때 견종·묘종 특성과 상담 일정을 함께 확인하는 것이 좋습니다.`
            : `${page.coverage} 권역에서 ${keywordMeta.label}을 알아보실 때 견종·묘종 특성과 상담 가능 일정을 함께 확인하는 것이 좋습니다.`)}
      </p>

      {sections.length
        ? sections.map((block) => (
            <div key={block.title} className="seo-guide__block">
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </div>
          ))
        : paragraphs.slice(1).map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="seo-guide__block">
              {paragraph}
            </p>
          ))}

      <div className="seo-guide__block">
        <h3>분양 가능한 강아지종류 안내</h3>
        <p>
          {regionName}에서 강아지분양·애견분양·애완견분양을 검색하신다면 아래 견종별 안내 페이지에서 특성과 분양 상담
          흐름을 먼저 확인해 보세요. 사진은 품종 이해용이며, 만날 수 있는 개체는 상담 시 현재 기준으로 안내됩니다.
        </p>
        <BreedLinks breeds={catalogPuppies} type="puppy" entries={puppyEntries} />
      </div>

      <div className="seo-guide__block">
        <h3>분양 가능한 고양이종류 안내</h3>
        <p>
          고양이분양·고양이입양·반려묘분양을 함께 알아보시는 경우에도 묘종별 성격·털 관리·적응 속도를 비교한 뒤 상담하시면
          좋습니다.
        </p>
        <BreedLinks breeds={kittens} type="kitten" />
      </div>

      {subAreas.length ? (
        <div className="seo-guide__block">
          <h3>상담·배송 연계가 가능한 주요 지역</h3>
          <p>
            {page.coverage} 범위에서 아래 생활권·동·읍·면을 중심으로 상담 문의가 이어지고 있습니다. 지역명은 검색
            안내용이며, 해당 지역에 별도 매장이 있다는 뜻은 아닙니다. 실제 상담·방문은 인천 부평 본점 기준으로
            예약 안내합니다.
          </p>
          <p className="seo-guide__area-names">{subAreas.join(" · ")}</p>
        </div>
      ) : null}

      <div className="seo-guide__block">
        <h3>애견샵·펫샵·입양 관련 검색어 안내</h3>
        <p>
          {TRADE_KEYWORDS.slice(0, 6).join(", ")} 등을 비교하실 때는 가격만 보기보다 건강·접종·성격·인계 조건을 함께
          확인하는 편이 좋습니다. {TRADE_KEYWORDS.slice(6).join(", ")} 문의도 동일 상담 번호로 연결됩니다.
        </p>
      </div>

      <h3>자주 묻는 질문</h3>
      <div className="seo-faq">
        {faqs.map(([question, answer]) => (
          <div key={question}>
            <strong>{question}</strong>
            <p>
              <TextWithPhone text={answer} />
            </p>
          </div>
        ))}
      </div>

      {isLocal ? (
        <div className="seo-guide__block">
          <p className="seo-region-picker__hint">
            <Link to="/local-links">전국 강아지분양 안내(50권역)</Link>
            {" · "}
            <Link to="/local-places">세부 지역 전체 목록</Link>
          </p>
        </div>
      ) : (
        <div className="seo-guide__block">
          <h3>전국 권역 강아지분양 안내</h3>
          <p className="seo-region-picker__hint">
            아래 50개 권역 페이지에서 지역별 안내 글을 확인할 수 있습니다. 현재 페이지:{" "}
            <Link to={currentPath}>{page.title}</Link>
          </p>
          <ul className="regional-seo-fold__list regional-seo-fold__list--in-guide">
            {SEO_REGION_PAGES.map((item) => (
              <li key={item.id}>
                <Link to={seoRegionPagePath(item)} className={item.id === page.id ? "is-current" : undefined}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="seo-bottom__note">
        {page.title} 문의는 온유독 상담으로 연결됩니다. 전화 <PhoneLink />
      </p>
      <p className="seo-blog__cta">
        <Link to="/puppies">강아지 분양 목록</Link>
        {" · "}
        <Link to="/kittens">고양이 분양 목록</Link>
        {" · "}
        <Link to="/local-links">권역 목록</Link>
      </p>
    </article>
  );
}
