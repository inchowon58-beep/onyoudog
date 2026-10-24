import copy from "./copy.json";
import regionPages from "./region-pages.json";
import { PHONE, BUSINESS } from "../site.js";

function hashSeed(text) {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickFourIndices(seed, total) {
  const indices = [];
  let state = seed;
  while (indices.length < 4) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const candidate = state % total;
    if (!indices.includes(candidate)) indices.push(candidate);
  }
  return indices;
}

export function fillSeoText(template, regionLabel, keywordLabel, animal) {
  return template
    .replaceAll("{지역}", regionLabel)
    .replaceAll("{키워드}", keywordLabel)
    .replaceAll("{동물}", animal)
    .replaceAll("{전화}", PHONE)
    .replaceAll("{매장주소}", BUSINESS.address);
}

function fallbackParagraphs(page, keyword) {
  const seed = hashSeed(`${page.id}:${keyword.label}`);
  const picks = pickFourIndices(seed, copy.paragraphs.length);
  const regionLabel = page.regionPrefix || page.keyword.replace("강아지분양", "");
  return picks.map((index) =>
    fillSeoText(copy.paragraphs[index], regionLabel, keyword.label, keyword.animal),
  );
}

export function seoParagraphs(page, keyword) {
  const entry = regionPages[page.id];
  if (entry?.paragraphs?.length) return entry.paragraphs;
  if (entry?.intro) {
    return [entry.intro, ...(entry.sections?.map((s) => s.body) || [])].filter(Boolean);
  }
  return fallbackParagraphs(page, keyword);
}

export function seoSections(page) {
  const entry = regionPages[page.id];
  return entry?.sections || [];
}

export function seoFaqs(page, keyword) {
  const entry = regionPages[page.id];
  if (entry?.faqs?.length) return entry.faqs;
  const regionLabel = page.regionPrefix || page.title;
  const { label, animal } = keyword;
  return [
    [
      `${regionLabel} ${label} 상담은 어디로 하나요?`,
      `대표번호 ${PHONE}로 연결됩니다. ${regionLabel}에 계셔도 같은 번호로 예약 상담을 받으실 수 있습니다.`,
    ],
    [
      `${regionLabel}에 별도 지점 주소가 있나요?`,
      `${label} 안내 페이지는 ${regionLabel} 검색용입니다. 실제 상담·방문 장소는 ${BUSINESS.address}이며, 방문은 예약 후에만 안내합니다.`,
    ],
    [
      "사진의 아이를 바로 분양받을 수 있나요?",
      `아닙니다. 사진은 ${animal} 품종 안내용이며, 만날 수 있는 아이와 일정은 ${PHONE} 상담에서 현재 기준으로 확인합니다.`,
    ],
  ];
}
