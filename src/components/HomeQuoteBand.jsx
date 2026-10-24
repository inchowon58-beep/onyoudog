import { useEffect, useRef, useState } from "react";
import { content } from "../data/index.js";

const FAMILY_COUNT = 8352;

const HEARTS = [
  { x: 12, y: 20, size: 13, delay: 0.2, dur: 3.4 },
  { x: 88, y: 26, size: 17, delay: 0.8, dur: 2.9 },
  { x: 22, y: 70, size: 15, delay: 1.4, dur: 3.7 },
  { x: 78, y: 64, size: 20, delay: 0.5, dur: 3.2 },
  { x: 50, y: 14, size: 11, delay: 2.0, dur: 2.5 },
  { x: 58, y: 84, size: 14, delay: 1.0, dur: 3.5 },
];

function formatCount(value) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

export function HomeQuoteBand() {
  const home = content.home;
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [motionOk] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!motionOk) {
      setVisible(true);
      setCount(FAMILY_COUNT);
    }
  }, [motionOk]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    if (!motionOk) {
      setCount(FAMILY_COUNT);
      return undefined;
    }
    let start = null;
    let raf = 0;
    const duration = 2600;

    function tick(ts) {
      if (start === null) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      setCount(Math.round(FAMILY_COUNT * easeOutCubic(progress)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, motionOk]);

  return (
    <section className="quote-band quote-band--v2" aria-label="가족 이야기">
      <div ref={rootRef} className={visible ? "home-quote is-live" : "home-quote"}>
        <img src="/hero/banner-together.jpg" alt="" />
        {motionOk ? (
          <div className="home-quote__hearts" aria-hidden="true">
            {HEARTS.map((heart) => (
              <span
                key={`${heart.x}-${heart.y}-${heart.delay}`}
                className="home-quote__heart"
                style={{
                  "--hx": `${heart.x}%`,
                  "--hy": `${heart.y}%`,
                  "--hs": `${heart.size}px`,
                  "--hd": `${heart.delay}s`,
                  "--ht": `${heart.dur}s`,
                }}
              />
            ))}
          </div>
        ) : null}
        <p className="home-quote__lines">
          <span className="q-sm home-quote__line">{home.quoteLine1 || "오늘부터"}</span>
          <span className="q-md home-quote__line">{home.quoteLine2 || "우리 집은"}</span>
          <span className="q-lg home-quote__line">{home.quoteLine3 || "한 명 더 넉넉해졌어요"}</span>
        </p>
        <p className="home-quote__note">
          <strong>
            {(home.quoteNoteStrong || "온유독과 인연이 이어진 {n}가정").replace(/\{n\}|8352|8,352/g, formatCount(count))}
          </strong>
          <span>{home.quoteNoteSub || "작은 선택이 쌓여 긴 이야기가 됩니다."}</span>
        </p>
      </div>
    </section>
  );
}
