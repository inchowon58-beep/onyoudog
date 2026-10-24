import { Link } from "react-router-dom";

export function SeoPhotoStrip({ breeds }) {
  if (!breeds?.length) return null;

  return (
    <div className="seo-photo-strip seo-photo-strip--in-fold" aria-label="품종 참고 사진">
      <p className="seo-photo-strip__kicker">PHOTO INDEX · BREED GUIDE</p>
      <h2 className="seo-photo-strip__title">품종 참고 사진</h2>
      <ul className="seo-photo-strip__grid">
        {breeds.map((breed) => (
          <li key={breed.slug}>
            <Link to={breed.href} className="seo-photo-card">
              <img
                src={breed.cover}
                alt={`${breed.ko}분양 안내 참고 사진`}
                loading="lazy"
              />
              <span className="seo-photo-card__cap">
                <strong>{breed.ko}분양</strong>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
