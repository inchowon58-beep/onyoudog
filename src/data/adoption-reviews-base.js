/** generate-copy·rebrand 후에도 유효한 후기 풀 유지 */
export const ADOPTION_REVIEWS_BASE = [
  { title: "상담 흐름이 차분했어요", body: "과장 없이 절차만 순서대로 설명해 주셔서 부담이 적었습니다.", meta: "김○○ · 인천 · 말티푸" },
  { title: "계약 항목을 미리 받았습니다", body: "접종·금액·유의사항이 정리돼 가족이 함께 읽을 수 있었어요.", meta: "이○○ · 수원 · 토이푸들" },
  { title: "지방 배송도 일정 맞춰 주셨어요", body: "퀵이 아니라 담당자 동행이라고 해서 선택했습니다.", meta: "박○○ · 대구 · 비숑" },
  { title: "첫 주 전화가 도움 됐어요", body: "배변·급여량 조절을 구체적으로 알려 주셨습니다.", meta: "최○○ · 광주 · 포메" },
  { title: "사진과 다른 개체 강요 없었어요", body: "품종 안내용 사진과 실제 상담 가능 아이를 구분해 설명해 주셨습니다.", meta: "정○○ · 부산 · 시츄" },
  { title: "가격만 물어봐도 친절했습니다", body: "이동 거리에 따라 달라질 수 있다고 미리 말해 주셨어요.", meta: "한○○ · 성남 · 웰시코기" },
  { title: "아이 상태를 사진으로도 확인했어요", body: "상담 중 컨디션 사진을 보내 주셔서 마음이 놓였습니다.", meta: "윤○○ · 대전 · 말티즈" },
  { title: "도착 후 연락이 빨랐습니다", body: "받자마자 적응 팁 문자를 보내 주셔서 첫날이 덜 헷갈렸어요.", meta: "조○○ · 창원 · 프렌치불독" },
  { title: "예약 방문 동선이 깔끔했어요", body: "대기 없이 정해진 시간에만 만나서 아이도 덜 예민해 보였습니다.", meta: "서○○ · 부평 · 포메" },
  { title: "고양이 분양도 같은 기준이었어요", body: "강아지 때와 설명 톤이 같아서 믿고 두 번째 상담했습니다.", meta: "임○○ · 일산 · 러시안블루" },
];

export function isValidReview(item) {
  return Boolean(item?.title?.trim() && item?.body?.trim());
}

export function resolveAdoptionReviews(extra) {
  const pool = Array.isArray(extra) ? extra.filter(isValidReview) : [];
  if (pool.length >= 6) return pool;
  const seen = new Set(pool.map((r) => r.title));
  const merged = [...pool];
  for (const item of ADOPTION_REVIEWS_BASE) {
    if (merged.length >= 12) break;
    if (seen.has(item.title)) continue;
    merged.push(item);
    seen.add(item.title);
  }
  return merged.length >= 6 ? merged : ADOPTION_REVIEWS_BASE;
}
