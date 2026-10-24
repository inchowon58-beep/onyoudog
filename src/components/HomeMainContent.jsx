import { useMemo } from "react";

import { Link } from "react-router-dom";

import { content, filterPets, imageUrl } from "../data/index.js";

import { ReactCounts, reactions } from "../components/Bits.jsx";

import { PetCard } from "../components/PetCard.jsx";

import { PhilosophyProse, PhilosophySummary } from "../components/PhilosophyProse.jsx";

import { PhilosophyVisual, scrollToPhilosophy } from "../components/PhilosophyVisual.jsx";

import { HomeQuoteBand } from "../components/HomeQuoteBand.jsx";

import { HERO_DOG_SLUGS, orderedKittenBreeds, orderedPuppyBreeds, rotatePets } from "../utils/homeDisplayOrder.js";

import { ADOPTION_REVIEWS_BASE } from "../data/adoption-reviews-base.js";
import { pickRandomReviews } from "../utils/pickReviews.js";



export function HomeMainContent({ embedded = false }) {

  const home = content.home;

  const heroDogs = HERO_DOG_SLUGS.map((item) => ({ ...item, pet: filterPets({ slug: item.slug })[0] })).filter((item) => item.pet);

  const featured = rotatePets(filterPets({ premium: true }), 3).slice(0, 6);

  const puppies = rotatePets(

    filterPets({ type: "puppy" }).filter((pet) => pet.index === 0),

    5,

  ).slice(0, 12);

  const kittens = rotatePets(

    filterPets({ type: "kitten" }).filter((pet) => pet.index === 0),

    9,

  ).slice(0, 12);

  const dogBreeds = orderedPuppyBreeds(14);

  const catBreeds = orderedKittenBreeds(10);

  const homeReviews = useMemo(() => {
    const pool = content.adoptionReviews?.length ? content.adoptionReviews : ADOPTION_REVIEWS_BASE;
    return pickRandomReviews(pool, 6);
  }, [content.adoptionReviews]);



  const onPhilosophy = (slug) => {

    if (embedded) {

      window.location.href = `/#philosophy-${slug}`;

      return;

    }

    scrollToPhilosophy(slug);

  };



  return (

    <>

      <section className="hero hero--v2">

        <div className="wrap hero-grid">

          <div>

            <p className="eyebrow">{home.kicker}</p>

            <h1>

              {home.title.split("\n").map((line) => (

                <span key={line}>{line}</span>

              ))}

            </h1>

            <p className="lede">{home.lead}</p>

            <div className="hero-actions">

              <Link className="btn btn-primary" to="/kittens">고양이분양</Link>

              <Link className="btn btn-ghost" to="/puppies">강아지분양</Link>

            </div>

          </div>

          <div className="hero-photos hero-photos--v2">

            {heroDogs.map((item) => {

              const counts = reactions(item.pet.id);

              return (

                <Link key={item.slug} to={`/pets/${item.pet.id}`}>

                  <img src={item.pet.cover} alt={item.label} />

                  <div className="hero-meta">

                    <span className="hero-name">{item.label}</span>

                    <div className="hero-react">

                      <ReactCounts likes={counts.likes} comments={counts.comments} />

                    </div>

                  </div>

                </Link>

              );

            })}

          </div>

        </div>

      </section>



      <HomeQuoteBand />



      <section className="section section--breeds-first">

        <div className="section-head">

          <div>

            <p className="kicker">BREED INDEX</p>

            <h2>{home.breedTitle}</h2>

            <p className="section-sub">{home.breedLead}</p>

          </div>

        </div>

        <div className="breed-row breed-row--v2">

          {catBreeds.map((breed) => (

            <Link key={breed.slug} to={`/kittens/breed/${breed.slug}`}>

              <img src={imageUrl(breed.folder, 1)} alt="" />

              <strong>{breed.en}</strong>

              <span>{breed.ko}</span>

            </Link>

          ))}

          <Link className="breed-more" to="/kittens/breeds">

            <span className="breed-more__circle">더보기</span>

            <strong>More</strong>

            <span>고양이</span>

          </Link>

          {dogBreeds.map((breed) => (

            <Link key={breed.slug} to={`/puppies/breed/${breed.slug}`}>

              <img src={imageUrl(breed.folder, 1)} alt="" />

              <strong>{breed.en}</strong>

              <span>{breed.ko}</span>

            </Link>

          ))}

          <Link className="breed-more" to="/puppies/breeds">

            <span className="breed-more__circle">더보기</span>

            <strong>More</strong>

            <span>강아지</span>

          </Link>

        </div>

      </section>



      <section className="band band--v2">

        <div className="philosophy-band">

          <p className="kicker">OUR DESK</p>

          <h2>{home.aboutTitle}</h2>

          {home.aboutLead ? <p className="band-lead">{home.aboutLead}</p> : null}

          <div className="philosophy-teasers philosophy-teasers--grid">

            {content.philosophy.map((item, index) => (

              <article key={item.slug} className="philosophy-teaser">

                <span className="philosophy-teaser__num">{String(index + 1).padStart(2, "0")}</span>

                <h3>{item.title}</h3>

                <p>{item.teaser}</p>

                <button type="button" className="philosophy-teaser__link" onClick={() => onPhilosophy(item.slug)}>

                  글 읽기

                </button>

              </article>

            ))}

          </div>

        </div>

      </section>



      <section className="section">

        <div className="section-head">

          <div>

            <p className="kicker">KITTENS</p>

            <h2>{home.kittenSectionTitle || "고양이 분양 안내 목록"}</h2>

          </div>

          <Link to="/kittens">전체</Link>

        </div>

        <div className="pet-grid pet-grid--v2">

          {kittens.map((pet) => (

            <PetCard key={pet.id} pet={pet} />

          ))}

        </div>

      </section>



      <section className="section">

        <div className="section-head">

          <div>

            <p className="kicker">FEATURED</p>

            <h2>{home.choiceTitle}</h2>

            <p className="section-sub">{home.choiceLead}</p>

          </div>

          <Link to="/puppies">전체</Link>

        </div>

        <div className="pet-grid">

          {featured.map((pet) => (

            <PetCard key={pet.id} pet={pet} />

          ))}

        </div>

      </section>



      <section className="section">

        <div className="section-head">

          <div>

            <p className="kicker">PUPPIES</p>

            <h2>{home.puppySectionTitle || "강아지 분양 안내 목록"}</h2>

          </div>

          <Link to="/puppies">전체</Link>

        </div>

        <div className="pet-grid pet-grid--v2">

          {puppies.map((pet) => (

            <PetCard key={pet.id} pet={pet} />

          ))}

        </div>

      </section>



      <section className="section philosophy-home philosophy-home--v2" id={embedded ? undefined : "philosophy-guide"}>

        <div className="philosophy-home__head">

          <p className="kicker">{home.philosophyKicker || "GUIDE"}</p>

          <h2>{home.philosophyTitle || "분양 절차·케어 안내"}</h2>

          <p className="lead philosophy-deep__lead">{home.philosophyLead}</p>

        </div>

        <div className="philosophy-stack philosophy-stack--v2">

          {content.philosophy.map((item, index) => (

            <article

              key={item.slug}

              className="philosophy-article philosophy-article--v2"

              id={embedded ? undefined : `philosophy-${item.slug}`}

            >

              <PhilosophyVisual slug={item.slug} />

              <div className="philosophy-article__copy">

                <header>

                  <span className="philosophy-article__num">{String(index + 1).padStart(2, "0")}</span>

                  <h3>{item.title}</h3>

                  <PhilosophySummary text={item.summary} />

                </header>

                <PhilosophyProse paragraphs={item.body} />

              </div>

            </article>

          ))}

        </div>

      </section>



      <section className="section home-reviews home-reviews--v2" id={embedded ? undefined : "adoption-reviews"}>

        <div className="section-head section-head--solo">

          <div>

            <p className="kicker">VOICES</p>

            <h2>보호자 후기</h2>

          </div>

        </div>

        <div className="story-grid story-grid--reviews">

          {homeReviews.map((review) => (

            <article key={`${review.title}-${review.meta}`} className="review-card">

              <h3>{review.title}</h3>

              <p>{review.body}</p>

              {review.meta ? <p className="review-card__meta">{review.meta}</p> : null}

            </article>

          ))}

        </div>

      </section>



    </>

  );

}

