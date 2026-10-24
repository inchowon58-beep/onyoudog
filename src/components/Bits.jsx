import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV, content } from "../data/index.js";
import { PhoneLink } from "./PhoneLink.jsx";

export function SafeImg({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
  }, [src]);
  if (failed) {
    return <div className={`img-fallback ${className || ""}`}>사진을 불러오지 못했습니다</div>;
  }
  return <img className={className} src={src} alt={alt} onError={() => setFailed(true)} />;
}

export function BannerSlot({ id, label, note, ratio = "24 / 7", fill = false }) {
  return (
    <div className={fill ? "banner-slot banner-slot--fill" : "banner-slot"} style={fill ? undefined : { aspectRatio: ratio }} data-banner-id={id}>
      <span>BANNER</span>
      <strong>{label}</strong>
      <em>{note || "이미지는 다음 단계에서 넣습니다"}</em>
    </div>
  );
}

export function PhotoNote() {
  return <p className="photo-note">{content.notice}</p>;
}

export function reactions(id) {
  let n = 0;
  for (const char of String(id)) n = (n * 33 + char.charCodeAt(0)) >>> 0;
  return { likes: 64 + (n % 52), comments: 9 + ((n >>> 4) % 26) };
}

export function ReactCounts({ likes, comments, labeled = false }) {
  return (
    <div className={labeled ? "react react--labeled" : "react"} aria-label={`좋아요 ${likes}, 댓글 ${comments}`}>
      <span className="react__like">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 20.5s-6.6-4.1-6.6-8.6A3.7 3.7 0 0 1 12 9a3.7 3.7 0 0 1 6.6 2.9c0 4.5-6.6 8.6-6.6 8.6z" /></svg>
        {labeled ? <em>좋아요</em> : null}
        <strong>{likes}</strong>
      </span>
      <span className="react__comment">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4.5h14a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H9.2L5 19.8V4.5z" /></svg>
        {labeled ? <em>댓글</em> : null}
        <strong>{comments}</strong>
      </span>
    </div>
  );
}

const SECTION_ROOT = {
  ABOUT: "/about",
  ADOPTION: "/adopt",
  PUPPIES: "/puppies",
  KITTENS: "/kittens",
  HEALTH: "/health",
};

export function SectionNav({ group }) {
  const { pathname } = useLocation();
  const item = group
    ? NAV.find((nav) => nav.label === group)
    : NAV.find((nav) => {
      const root = SECTION_ROOT[nav.label];
      return pathname === root || pathname.startsWith(`${root}/`);
    });
  if (!item) return null;
  return (
    <nav className="section-nav" aria-label={`${item.label} 하위 메뉴`}>
      {item.children.map((child) => {
        const current = pathname === child.href || (child.href.endsWith("/breeds") && pathname.includes("/breed/"));
        return (
          <NavLink key={child.href} to={child.href} end className={current ? "active" : undefined}>
            {child.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function PageHero({ kicker, title, lead }) {
  return (
    <header className="page-hero">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
    </header>
  );
}

export function ConsultBand() {
  return (
    <section className="consult-band">
      <p className="kicker">CONSULT</p>
      <h2>분양 가능한 아이는 전화로 확인합니다</h2>
      <p>
        대표번호 <PhoneLink />. 방문이 필요하면 예약 후 장소를 안내합니다.
      </p>
    </section>
  );
}

export function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null;
  const items = [];
  for (let number = 1; number <= pages; number += 1) items.push(number);
  return (
    <nav className="pager" aria-label="페이지">
      {items.map((number) => (
        <button
          key={number}
          type="button"
          className={number === page ? "is-current" : ""}
          onClick={() => onPage(number)}
        >
          {number}
        </button>
      ))}
    </nav>
  );
}
