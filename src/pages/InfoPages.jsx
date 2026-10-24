import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BUSINESS, PHONE, PHONE_TEL, REGIONS, content, filterPets, getPet } from "../data/index.js";
import { BannerSlot, ConsultBand, PageHero, SectionNav } from "../components/Bits.jsx";
import { PetCard } from "../components/PetCard.jsx";
import { PhilosophyProse } from "../components/PhilosophyProse.jsx";
import { usePageTitle } from "../usePageTitle.js";
import { PhoneLink, TextWithPhone } from "../components/PhoneLink.jsx";
import { pickRandomReviews } from "../utils/pickReviews.js";

function ReviewsGrid() {
  const pool = content.adoptionReviews?.length ? content.adoptionReviews : content.stories;
  const [reviews] = useState(() => pickRandomReviews(pool, pool.length));
  return (
    <div className="story-grid story-grid--reviews">
      {reviews.map((review) => (
        <article key={`${review.title}-${review.meta || ""}`} className="review-card">
          <h2>{review.title}</h2>
          <p>{review.body}</p>
          {review.meta ? <p className="review-card__meta">{review.meta}</p> : null}
        </article>
      ))}
    </div>
  );
}

export function ContentPage({ id }) {
  const page = content.pages[id];
  usePageTitle(page?.title || "안내");
  if (!page) {
    return <PageHero kicker="404" title="페이지를 찾지 못했습니다" />;
  }
  return (
    <article className="page">
      <PageHero kicker={page.kicker} title={page.title} lead={page.lead} />
      <SectionNav />
      {page.banner ? <BannerSlot {...page.banner} /> : null}
      {page.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="prose">
          <TextWithPhone text={paragraph} />
        </p>
      ))}
      {page.cards ? (
        <div className="info-grid">
          {page.cards.map((card) => (
            <article key={card.title}>
              <h2>{card.title}</h2>
              <p>
                <TextWithPhone text={card.body} />
              </p>
            </article>
          ))}
        </div>
      ) : null}
      {page.steps ? (
        <ol className="steps">
          {page.steps.map((step) => (
            <li key={step.title}>
              <h2>{step.title}</h2>
              <p>
                <TextWithPhone text={step.body} />
              </p>
            </li>
          ))}
        </ol>
      ) : null}
      <ConsultBand />
    </article>
  );
}

export function GuideIndex() {
  usePageTitle("반려지식");
  return (
    <section className="page">
      <PageHero kicker="GUIDE" title="데려오기 전에 읽는 글" lead="진료를 대신하지 않는, 첫 생활 안내입니다." />
      <div className="link-list">
        {content.guides.map((guide) => (
          <Link key={guide.slug} to={`/guide/${guide.slug}`}>
            <strong>{guide.title}</strong>
            <span>{guide.summary}</span>
          </Link>
        ))}
      </div>
      <BannerSlot id="guide-index" label="지식 배너" note="이후 배너로 교체" />
    </section>
  );
}

export function GuideDetail() {
  const { slug } = useParams();
  const guide = content.guides.find((item) => item.slug === slug);
  usePageTitle(guide?.title || "반려지식");
  if (!guide) return <PageHero kicker="GUIDE" title="글을 찾지 못했습니다" />;
  return (
    <article className="page">
      <PageHero kicker="GUIDE" title={guide.title} lead={guide.summary} />
      {guide.body.map((paragraph) => <p key={paragraph} className="prose">{paragraph}</p>)}
      <BannerSlot id={`guide-${guide.slug}`} label="글 상단 배너" note="이후 배너로 교체" />
      <Link className="text-link" to="/guide">목록으로</Link>
    </article>
  );
}

export function PhilosophyDetail() {
  const { slug } = useParams();
  const item = content.philosophy.find((entry) => entry.slug === slug);
  usePageTitle(item?.title || "분양 안내");
  if (!item) {
    return (
      <article className="page">
        <PageHero kicker="PHILOSOPHY" title="안내를 찾지 못했습니다" />
        <Link className="text-link" to="/">홈으로</Link>
      </article>
    );
  }
  return (
    <article className="page">
      <PageHero kicker="PHILOSOPHY" title={item.title} lead={item.summary} />
      <PhilosophyProse paragraphs={item.body} />
      <div className="philosophy-more">
        <p className="kicker">OTHER</p>
        <div className="link-list">
          {content.philosophy.filter((entry) => entry.slug !== slug).map((entry) => (
            <Link key={entry.slug} to={`/philosophy/${entry.slug}`}>
              <strong>{entry.title}</strong>
              <span>{entry.summary}</span>
            </Link>
          ))}
        </div>
      </div>
      <Link className="text-link" to="/">홈으로</Link>
    </article>
  );
}

export function Reviews({ overseas = false }) {
  usePageTitle(overseas ? "해외 상담" : "분양후기");
  if (overseas) {
    return (
      <section className="page">
        <PageHero
          kicker="OVERSEAS"
          title="해외 후기 대신, 확인 항목을 올립니다"
          lead="실제 해외 이동 후기는 아직 없습니다. 진행 전에 아래를 먼저 확인합니다."
        />
        <div className="info-grid">
          <article><h2>도착 국가</h2><p>검역, 대기 기간, 항공사 규정이 가능 여부를 결정합니다.</p></article>
          <article><h2>서류</h2><p>마이크로칩과 검사 항목은 국가마다 다릅니다. 없는 서류를 있는 것처럼 적지 않습니다.</p></article>
          <article><h2>일정</h2><p>검사 대기 때문에 국내 배송보다 길어질 수 있습니다.</p></article>
        </div>
        <BannerSlot id="overseas-review" label="해외 후기 사진 자리" note="실제 사례가 생기면 교체" />
        <ConsultBand />
      </section>
    );
  }
  return (
    <section className="page">
      <PageHero kicker="REVIEW" title="분양후기" lead="입양 가족의 후기입니다. 새로고침할 때마다 다른 후기가 보일 수 있습니다." />
      <ReviewsGrid />
      <div className="banner-row">
        <BannerSlot id="story-1" label="후기 사진 자리 1" ratio="4 / 3" />
        <BannerSlot id="story-2" label="후기 사진 자리 2" ratio="4 / 3" />
        <BannerSlot id="story-3" label="후기 사진 자리 3" ratio="4 / 3" />
      </div>
    </section>
  );
}

export function QnA() {
  const [open, setOpen] = useState(0);
  usePageTitle("질문");
  return (
    <section className="page">
      <PageHero kicker="Q&A" title="분양 전에 많이 묻는 질문" lead="목록에 없는 내용은 대표번호로 남겨 주세요." />
      <div className="qna">
        {content.qna.map((item, index) => (
          <article key={item.q}>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
            </button>
            {open === index ? (
              <p>
                <TextWithPhone text={item.a} />
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Place() {
  usePageTitle("전국 권역");
  return (
    <section className="page">
      <PageHero kicker="PLACE" title="전국분양, 여섯 권역" lead={BUSINESS.addressDetail} />
      <div className="info-grid">
        {REGIONS.map((region) => (
          <article key={region.name}>
            <h2>{region.name}</h2>
            <p>{region.area}</p>
            <p>{region.note}</p>
            <a href={PHONE_TEL}>{PHONE}</a>
          </article>
        ))}
      </div>
      <p className="prose">대표 {BUSINESS.owner}</p>
      <div className="section-gap">
        <BannerSlot id="place-map" label="전국 권역 지도" note="지도 이미지는 이후 제작" />
      </div>
      <ConsultBand />
    </section>
  );
}

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const pets = useMemo(() => filterPets({ query }), [query]);
  usePageTitle(query ? `${query} 검색` : "검색");
  return (
    <section className="page">
      <PageHero kicker="SEARCH" title={query ? `“${query}” 검색` : "품종과 이름으로 찾기"} lead="안내 카드의 품종, 이름, 색, 코드에서 찾습니다." />
      {query && pets.length === 0 ? <p className="empty">해당하는 안내 카드가 없습니다.</p> : null}
      <div className="pet-grid">
        {pets.slice(0, 24).map((pet) => <PetCard key={pet.id} pet={pet} />)}
      </div>
    </section>
  );
}

export function Consult() {
  const [params] = useSearchParams();
  const pet = getPet(params.get("pet"));
  const [sent, setSent] = useState(false);
  usePageTitle("상담");

  function onSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    const prev = JSON.parse(localStorage.getItem("onyudok-consults") || "[]");
    prev.unshift({ ...data, at: new Date().toISOString() });
    localStorage.setItem("onyudok-consults", JSON.stringify(prev.slice(0, 20)));
    setSent(true);
  }

  if (sent) {
    return (
      <section className="page">
        <PageHero
          kicker="CONSULT"
          title="상담 내용을 이 브라우저에 남겼습니다"
          lead={
            <>
              이 화면은 개발용 저장입니다. 실제 연결은 대표번호 <PhoneLink />로 해주세요.
            </>
          }
        />
      </section>
    );
  }

  return (
    <section className="page">
      <PageHero kicker="CONSULT" title="분양 상담 남기기" lead="필수 항목만 받습니다. 이 양식은 서버로 전송되지 않고, 지금 쓰는 브라우저에만 남습니다." />
      <form className="consult-form" onSubmit={onSubmit}>
        <label>이름<input name="name" required placeholder="홍길동" /></label>
        <label>연락처<input name="phone" required placeholder="010-0000-0000" /></label>
        <label>권역
          <select name="region" defaultValue="수도권">
            {REGIONS.map((region) => <option key={region.name}>{region.name}</option>)}
          </select>
        </label>
        <label>관심
          <select name="interest" defaultValue={pet?.type === "kitten" ? "고양이" : "강아지"}>
            <option>강아지</option>
            <option>고양이</option>
            <option>아직 모름</option>
          </select>
        </label>
        <label>품종 또는 코드<input name="breed" defaultValue={pet ? `${pet.breed} ${pet.code}` : ""} placeholder="예: 포메라니안" /></label>
        <label>하고 싶은 말<textarea name="message" rows="5" placeholder="외출 시간, 함께 사는 가족, 희망 시기를 적어 주세요." /></label>
        <button className="btn btn-dark" type="submit">브라우저에 남기기</button>
      </form>
    </section>
  );
}

export function NotFound() {
  usePageTitle("페이지 없음");
  return (
    <section className="page">
      <PageHero kicker="404" title="페이지를 찾지 못했습니다" lead="메뉴에서 다시 이동해 주세요." />
      <Link className="btn btn-dark" to="/">홈으로</Link>
    </section>
  );
}
