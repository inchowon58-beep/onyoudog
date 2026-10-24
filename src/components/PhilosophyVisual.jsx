const IMAGES = {
  "puppy-health": { src: "/philosophy/puppy-health.jpg", alt: "어린 강아지 건강관리와 위생 케어" },
  "adoption-contract": { src: "/philosophy/adoption-contract.jpg", alt: "분양 계약서 작성과 투명한 안내" },
  "aftercare-service": { src: "/philosophy/aftercare-service.jpg", alt: "분양 후 상담과 사후관리" },
  "why-onyudok": { src: "/philosophy/why-onyudok.jpg", alt: "정직한 분양 환경과 업체 차이" },
  "direct-delivery": { src: "/philosophy/direct-delivery.jpg", alt: "담당자 동반 안심 배송" },
};

export function PhilosophyVisual({ slug }) {
  const item = IMAGES[slug] || IMAGES["puppy-health"];
  return (
    <figure className={`philosophy-visual philosophy-visual--${slug}`}>
      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
    </figure>
  );
}

export function scrollToPhilosophy(slug) {
  const target = document.getElementById(`philosophy-${slug}`);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.classList.add("philosophy-article--focus");
  window.setTimeout(() => target.classList.remove("philosophy-article--focus"), 2200);
}
