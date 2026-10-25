/** URL·메타용 대표 키워드 (50권역 페이지는 regions.js의 keyword 필드 사용) */
export const SEO_KEYWORDS = [
  { slug: "강아지분양", label: "강아지분양", animal: "강아지", petType: "puppy" },
  { slug: "고양이분양", label: "고양이분양", animal: "고양이", petType: "kitten" },
  { slug: "강아지무료분양", label: "강아지무료분양", animal: "강아지", petType: "puppy", free: true },
  { slug: "고양이무료분양", label: "고양이무료분양", animal: "고양이", petType: "kitten", free: true },
];

export function findSeoKeyword(slug) {
  return SEO_KEYWORDS.find((item) => item.slug === slug);
}

/** 50권역 페이지용 — keyword가 "서울강아지분양" 형태 */
export function keywordMetaForRegionPage(page) {
  return {
    slug: page.keyword,
    label: page.keyword,
    animal: "강아지",
    petType: page.petType || "puppy",
  };
}

export function keywordMetaForSeoPage(page) {
  if (page.kind === "local") {
    const meta = findSeoKeyword(page.keyword);
    return meta || { slug: page.keyword, label: page.keyword, animal: "반려동물", petType: page.petType };
  }
  return keywordMetaForRegionPage(page);
}
