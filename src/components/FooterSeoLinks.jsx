import { Link } from "react-router-dom";

/** 푸터 주소 아래 + → 전국 권역 목록 페이지 */
export function FooterSeoLinks() {
  return (
    <div className="footer-seo-links">
      <Link className="footer-seo-links__btn" to="/local-links" aria-label="전국 강아지분양 안내">
        <span className="seo-toggle seo-toggle--footer" aria-hidden="true" />
      </Link>
    </div>
  );
}
