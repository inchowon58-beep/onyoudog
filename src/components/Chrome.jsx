import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FooterSeoLinks } from "./FooterSeoLinks.jsx";
import { BUSINESS, HEADER_NAV, KAKAO_CHAT_URL, PHONE, PHONE_TEL } from "../data/index.js";

export function Chrome({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const hashId = location.hash?.replace(/^#/, "");
    if (hashId) {
      const target = document.getElementById(hashId);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, location.hash]);

  return (
    <>
      <a className="skip" href="#main">본문 바로가기</a>
      <header className="site-nav">
        <div className="nav-inner">
          <Link className="brand" to="/" aria-label="온유독 홈">
            <img className="logo" src="/logo-mark.png" alt="" />
            <span>
              <span className="brand-name">{BUSINESS.name}</span>
              <span className="brand-sub">ON YU DOK</span>
            </span>
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span /><span />
          </button>
          <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="주요 메뉴">
            {HEADER_NAV.map((item) => {
              const to = item.hash ? { pathname: "/", hash: `#${item.hash}` } : item.href;
              const active = item.hash
                ? location.pathname === "/" && location.hash === `#${item.hash}`
                : location.pathname.startsWith(item.match);
              return (
                <NavLink
                  key={item.label}
                  to={to}
                  className={active ? "active" : undefined}
                  onClick={(event) => {
                    if (!item.hash || location.pathname !== "/") return;
                    if (location.hash !== `#${item.hash}`) return;
                    event.preventDefault();
                    document.getElementById(item.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      <main id="main">{children}</main>

      <footer className="site-footer">
        <div className="wrap">
          <p>© {new Date().getFullYear()} 온유독 · {BUSINESS.nameEn}</p>
          <p>
            대표 {BUSINESS.owner} · <a className="phone-link" href={PHONE_TEL}>{PHONE}</a>
          </p>
          <p className="site-footer__addr">{BUSINESS.address}</p>
          <FooterSeoLinks />
        </div>
      </footer>

      <div className="callbar">
        <a className="call-adopt" href={PHONE_TEL}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.7 10.8c.9 1.7 2.2 3.2 3.9 4.3l2-2c.3-.3.8-.4 1.2-.3 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.6 20 4 13.4 4 5c0-.6.4-1 1-1h4.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .9-.3 1.2l-2 2z" /></svg>
          <span>전화상담<small>{PHONE}</small></span>
        </a>
        <a
          className="call-kakao"
          href={KAKAO_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.4c-4.9 0-8.8 3.1-8.8 7 0 2.5 1.6 4.7 4.1 5.9l-.8 3.4a.5.5 0 0 0 .7.6l3.7-2.2c.4.1.7.1 1.1.1 4.9 0 8.8-3.1 8.8-7s-3.9-7.8-8.8-7.8z" /></svg>
          <span>카카오톡 문의</span>
        </a>
      </div>
    </>
  );
}
