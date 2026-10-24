/** 사이트 견종 목록(breeds.js) 외 SEO 안내용 견종명 */
export const SEO_EXTRA_PUPPY_BREEDS = [
  "보더콜리",
  "빠삐용",
  "파피용",
  "골든두들",
  "버니두들",
  "미니두들",
  "장모닥스훈트",
  "스피츠",
  "래브라도리트리버",
  "세퍼트",
  "케인코르소",
  "카바푸",
  "코카푸",
  "꼬숑",
  "시바이누",
  "노리치테리어",
  "노퍽테리어",
  "러프콜리",
  "베들링턴테리어",
  "셀티",
  "웨스티",
  "버니즈마운틴독",
  "킹찰스스패니얼",
  "코카스파니엘",
  "장모치와와",
  "보더콜리레몬",
  "미니비숑",
  "스탠다드푸들",
  "진돗개",
  "비글",
  "폼스키",
];

/** breeds.js 견종과 합치되, ko 기준 중복은 한 번만 */
export function puppySeoBreedEntries(catalogBreeds) {
  const seen = new Set();
  const entries = [];

  for (const breed of catalogBreeds) {
    if (seen.has(breed.ko)) continue;
    seen.add(breed.ko);
    entries.push({ ko: breed.ko, slug: breed.slug });
  }

  for (const ko of SEO_EXTRA_PUPPY_BREEDS) {
    if (seen.has(ko)) continue;
    seen.add(ko);
    entries.push({ ko, slug: null });
  }

  return entries;
}
