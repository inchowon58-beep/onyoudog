import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { breedsByType, content, filterPets, findBreed, getPet, imageUrl } from "../data/index.js";
import { ConsultBand, PageHero, Pager, ReactCounts, SafeImg, SectionNav, reactions } from "../components/Bits.jsx";
import { PetCard } from "../components/PetCard.jsx";
import { usePageTitle } from "../usePageTitle.js";

const PAGE_SIZE = 12;

const DETAIL_QUOTES = [
  ["작은 발걸음으로 찾아온 커다란 행복", "우리 가족의 시작 온유독"],
  ["당신의 평범한 하루가", "누군가의 온 세상이 됩니다"],
  ["아가처럼 소중한 너", "가족이라는 이름으로 만나는 온유독"],
  ["집으로 돌아갈 이유가", "하나 더 생겼습니다"],
  ["처음 만나는 설렘부터", "평생 함께할 약속까지"],
  ["당신을 만난 날부터", "이 아이의 세상은 당신입니다"],
];

function pickQuote() {
  return DETAIL_QUOTES[Math.floor(Math.random() * DETAIL_QUOTES.length)];
}

function pickOthers(current) {
  const pool = filterPets({ type: current.type }).filter((item) => item.id !== current.id);
  const copy = [...pool];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy.slice(0, 4);
}

function BreedIntro({ text }) {
  const lines = text.split(/(?<=\.)\s+/).filter(Boolean);
  return (
    <div className="detail-intro">
      {lines.map((line, index) => {
        const comma = line.indexOf(",");
        if (index > 0 && comma > 4 && comma < 40) {
          return (
            <p key={line}>
              <strong>{line.slice(0, comma + 1)}</strong>
              {line.slice(comma + 1)}
            </p>
          );
        }
        return <p key={line} className={index === 0 ? "is-lead" : undefined}>{line}</p>;
      })}
    </div>
  );
}

function listTitle({ type, premium, kind, breed }) {
  const animal = type === "kitten" ? "고양이" : "강아지";
  if (breed) return breed.ko;
  if (premium) return `${animal} 프리미엄`;
  if (kind) return `${animal} 착한분양`;
  return `${animal} 전체보기`;
}

export function PetList({ type, premium = false, kind = false }) {
  const { slug } = useParams();
  const breed = slug ? findBreed(slug) : null;
  const [page, setPage] = useState(1);
  const title = listTitle({ type, premium, kind, breed });
  usePageTitle(title);

  useEffect(() => {
    setPage(1);
  }, [type, premium, kind, slug]);

  const pets = useMemo(
    () => filterPets({ type, slug, premium, kind }),
    [type, slug, premium, kind],
  );
  const pages = Math.max(1, Math.ceil(pets.length / PAGE_SIZE));
  const view = pets.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const blurb = breed ? content.breedBlurbs?.[breed.slug] : "";

  if (slug && (!breed || breed.type !== type)) {
    return (
      <section className="page">
        <PageHero kicker="BREED" title="품종을 찾지 못했습니다" lead="목록에서 다시 골라 주세요." />
        <Link className="btn btn-dark" to={type === "kitten" ? "/kittens/breeds" : "/puppies/breeds"}>품종 목록</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <PageHero
        kicker={type === "kitten" ? "KITTENS" : "PUPPIES"}
        title={title}
        lead={blurb || undefined}
      />
      <SectionNav group={type === "kitten" ? "KITTENS" : "PUPPIES"} />
      <div className="filters">
        <span>{pets.length}마리 안내</span>
      </div>
      {view.length === 0 ? <p className="empty">이 조건의 안내 카드가 없습니다.</p> : null}
      <div className="pet-grid">
        {view.map((pet) => <PetCard key={pet.id} pet={pet} />)}
      </div>
      <Pager page={page} pages={pages} onPage={setPage} />
      <ConsultBand />
    </section>
  );
}

export function BreedIndex({ type }) {
  const title = type === "kitten" ? "묘종별 모아보기" : "견종별 모아보기";
  usePageTitle(title);
  const breeds = breedsByType(type);
  return (
    <section className="page">
      <PageHero kicker="BREEDS" title={title} lead="사진을 누르면 그 품종 안내만 모아서 봅니다." />
      <SectionNav group={type === "kitten" ? "KITTENS" : "PUPPIES"} />
      <div className="breed-index">
        {breeds.map((breed) => (
          <Link key={breed.slug} to={`${type === "kitten" ? "/kittens" : "/puppies"}/breed/${breed.slug}`}>
            <img src={imageUrl(breed.folder, 1, breed)} alt="" />
            <div>
              <strong>{breed.ko}</strong>
              <span>{breed.en}</span>
              <em>{content.breedBlurbs?.[breed.slug] || `${breed.take}장의 안내 카드`}</em>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PetDetail() {
  const { id } = useParams();
  const pet = getPet(id);
  const [shot, setShot] = useState(0);
  const [quote, setQuote] = useState(pickQuote);
  const [others, setOthers] = useState(() => (pet ? pickOthers(pet) : []));
  usePageTitle(pet ? `${pet.breed} ${pet.name}` : "안내");

  useEffect(() => {
    setShot(0);
    setQuote(pickQuote());
    const current = getPet(id);
    setOthers(current ? pickOthers(current) : []);
  }, [id]);

  if (!pet) {
    return (
      <section className="page">
        <PageHero kicker="PET" title="안내 카드를 찾지 못했습니다" />
        <Link className="btn btn-dark" to="/puppies">강아지 목록</Link>
      </section>
    );
  }

  const intro = content.breedIntros?.[pet.slug] || content.breedBlurbs?.[pet.slug];
  const counts = reactions(pet.id);

  return (
    <section className="page">
      <div className="detail">
        <div className="detail-photo">
          <SafeImg src={pet.images[shot]} alt={`${pet.breed} ${pet.name} 안내 사진 ${shot + 1}`} />
        </div>
        <div className="detail-copy">
          <p className="kicker">{pet.code}</p>
          <h1>{pet.breed} · {pet.name}</h1>
          <BreedIntro text={intro || `${pet.breed} 품종 안내입니다. 털 상태와 생활 리듬은 상담에서 함께 살펴봅니다.`} />
          <dl className="facts">
            <div><dt>성별</dt><dd>{pet.gender}</dd></div>
            <div><dt>안내 월령</dt><dd>3개월</dd></div>
            <div><dt>금액</dt><dd>15만원~</dd></div>
            <div><dt>배송</dt><dd>담당자 직접 방문</dd></div>
          </dl>
          <div className="detail-react">
            <ReactCounts likes={counts.likes} comments={counts.comments} labeled />
          </div>
          <div className="hero-actions">
            <Link className="btn btn-line" to={pet.type === "kitten" ? "/kittens" : "/puppies"}>목록으로</Link>
          </div>
        </div>
        <div className="thumbs">
          {pet.images.map((src, index) => (
            <button key={src} type="button" className={index === shot ? "is-current" : ""} onClick={() => setShot(index)}>
              <SafeImg src={src} alt="" />
            </button>
          ))}
        </div>
        <div className="detail-quote">
          <img src={pet.cover} alt="" />
          <figure>
            <span className="q-mark" aria-hidden="true">“</span>
            <blockquote>
              <span className="q-line">{quote[0]}</span>
              <span className="q-line q-line--sub">{quote[1]}</span>
            </blockquote>
            <figcaption>온유독</figcaption>
          </figure>
        </div>
      </div>
      <section className="detail-story" aria-label="온유독을 소개합니다">
        <h2>온유독을 <em>소개합니다</em></h2>
        <p>
          <span>온유독은 반려견과 새로운 가족이 처음 만나는 순간부터</span>
          <span><strong>믿을 수 있는 선택</strong>이 될 수 있도록 노력합니다.</span>
        </p>
        <p>
          <span>깨끗하고 쾌적한 환경을 유지하고 아이들의 건강 상태와 특징을 <strong>꼼꼼하게 확인</strong>해</span>
          <span>보호자분께 정확하게 안내해드립니다.</span>
        </p>
        <p>
          <span>과장된 광고나 허위 정보, 부담스러운 권유 없이 충분히 비교하고 고민한 뒤</span>
          <span>결정하실 수 있도록 <em>투명하고 정직한 분양</em>을 원칙으로 합니다.</span>
        </p>
        <p className="detail-story__end">
          <span>아이의 건강과 보호자의 만족을 함께 생각하며,</span>
          <span>신뢰할 수 있는 분양과 건강한 반려문화가 이어질 수 있도록</span>
          <span className="detail-story__vow">책임 있는 자세로 함께하겠습니다.</span>
        </p>
      </section>
      {others.length > 0 ? (
        <div className="section detail-related">
          <h2>다른 온유독 소개</h2>
          <div className="pet-grid">
            {others.map((item) => <PetCard key={item.id} pet={item} />)}
          </div>
        </div>
      ) : null}
    </section>
  );
}
