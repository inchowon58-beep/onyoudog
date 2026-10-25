import { Navigate, useParams } from "react-router-dom";
import { ConsultBand } from "../components/Bits.jsx";
import { HomeMainContent } from "../components/HomeMainContent.jsx";
import { SeoGuideBody } from "../components/SeoGuideBody.jsx";
import { SeoPhotoStrip } from "../components/SeoPhotoStrip.jsx";
import { seoFaqs, seoParagraphs, seoSections } from "../data/seo/content.js";
import { keywordMetaForSeoPage } from "../data/seo/keywords.js";
import { findSeoPage, seoRegionPagePath } from "../data/seo/regions.js";
import { seoLocalPagePath } from "../data/seo/local-pages.js";
import { SITE_URL } from "../data/site.js";
import { useSeoDocument } from "../hooks/useSeoDocument.js";
import { pickSeoBreeds } from "../utils/seoBreedPick.js";

export function SeoLanding() {
  const { keyword, city: scope } = useParams();
  const page = findSeoPage(keyword || "", scope || "");
  if (!page) return <Navigate to="/" replace />;

  const keywordMeta = keywordMetaForSeoPage(page);
  const paragraphs = seoParagraphs(page, keywordMeta);
  const sections = seoSections(page);
  const faqs = seoFaqs(page, keywordMeta);
  const path = page.kind === "local" ? seoLocalPagePath(page) : seoRegionPagePath(page);
  const url = `${SITE_URL}${path}`;
  const title = `${page.title} | 온유독`;
  const description =
    page.kind === "local"
      ? `${page.regionGroup} ${page.placeLabel} ${keywordMeta.label} 상담. ${paragraphs[0]?.slice(0, 100) || ""}…`
      : `${page.coverage}. ${page.title} 상담 안내. ${paragraphs[0]?.slice(0, 100) || ""}…`;

  const breeds = pickSeoBreeds(page.id, keywordMeta.petType, 5);
  const ogImages = breeds.map((b) => b.cover);

  useSeoDocument({ title, description, url, faqs, images: ogImages });

  return (
    <div className="seo-page">
      <section className="seo-lead">
        <div className="wrap">
          <p className="kicker">REGIONAL GUIDE</p>
          <h1>{page.title}</h1>
          <details className="seo-fold seo-fold--lead">
            <summary aria-label="상단 안내·사진 펼치기">
              <span className="seo-toggle" />
            </summary>
            <div className="seo-lead__body">
              <p>{paragraphs[0]}</p>
              <SeoPhotoStrip breeds={breeds} />
            </div>
          </details>
        </div>
      </section>

      <HomeMainContent embedded />

      <ConsultBand />

      <section className="section seo-blog">
        <div className="wrap">
          <details className="seo-fold seo-fold--inline seo-fold--bottom">
            <summary aria-label="지역·견종·묘종 상세 안내 펼치기">
              <span className="seo-toggle" />
            </summary>
            <SeoGuideBody
              page={page}
              keywordMeta={keywordMeta}
              sections={sections}
              paragraphs={paragraphs}
              faqs={faqs}
              currentPath={path}
            />
          </details>
        </div>
      </section>
    </div>
  );
}
