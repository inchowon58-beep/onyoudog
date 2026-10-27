export const SITE_URL = "https://www.natehub.co.kr";

export const SITE_TITLE =
  "온유독 | 전국 강아지분양·고양이분양 상담 ONYUDOK";

export const PHONE = "010-4075-5865";
export const PHONE_TEL = "tel:+821040755865";

/** 인천강아지분양 아가몽 카카오톡 채널 */
export const KAKAO_CHAT_URL = "https://pf.kakao.com/_lWwxkG/chat";

export const BUSINESS = {
  name: "온유독",
  legalName: "인천 강아지분양 아가몽",
  nameEn: "ONYUDOK",
  owner: "백인혜",
  phone: PHONE,
  address: "인천 부평구 부평동 399-24 1층",
  businessNumber: "873-94-02012",
  licenseNumber: "3540000-045-2025-0002",
  addressDetail:
    "인천 부평구 부평동 399-24 1층에서 예약 상담을 받습니다. 전국 권역 일정에 맞춰 안심 배송도 안내합니다.",
};

export const REGIONS = [
  { name: "수도권", area: "서울 · 경기 · 인천", note: "상담 후 당일 또는 익일 일정" },
  { name: "강원", area: "춘천 · 원주 · 강릉 외", note: "권역 스케줄에 맞춰 배송" },
  { name: "충청", area: "대전 · 세종 · 청주 · 천안 외", note: "권역 스케줄에 맞춰 배송" },
  { name: "호남", area: "광주 · 전주 · 전남 일원", note: "권역 스케줄에 맞춰 배송" },
  { name: "영남", area: "부산 · 대구 · 울산 · 창원 외", note: "권역 스케줄에 맞춰 배송" },
  { name: "제주", area: "제주 · 서귀포", note: "항공 연계 일정은 별도 상담" },
];

export const NAV = [
  {
    label: "ABOUT",
    href: "/about/company",
    children: [
      { href: "/about/greeting", title: "대표 인사말", desc: "대표 민동수의 분양 원칙" },
      { href: "/about/company", title: "회사소개", desc: "전국을 한 데스크로 운영합니다" },
      { href: "/about/staff", title: "스텝소개", desc: "상담, 케어, 배송 역할" },
      { href: "/about/recruit", title: "채용정보", desc: "함께 일할 분을 찾습니다" },
      { href: "/about/partner", title: "제휴문의", desc: "가맹 확장 없이 필요한 협력만" },
    ],
  },
  {
    label: "ADOPTION",
    href: "/adopt/system",
    children: [
      { href: "/adopt/aftercare", title: "사후관리", desc: "도착 이후 전화로 이어지는 안내" },
      { href: "/adopt/system", title: "분양절차", desc: "상담부터 수령까지 네 단계" },
      { href: "/adopt/delivery", title: "안심배송", desc: "전국 권역 일정으로 이동합니다" },
      { href: "/adopt/partners", title: "준비물 안내", desc: "집에 도착하기 전에 챙길 것" },
    ],
  },
  {
    label: "PUPPIES",
    href: "/puppies",
    children: [
      { href: "/puppies", title: "전체보기", desc: "안내 중인 강아지 품종" },
      { href: "/puppies/breeds", title: "견종별 모아보기", desc: "원하는 견종만 모아서" },
    ],
  },
  {
    label: "KITTENS",
    href: "/kittens",
    children: [
      { href: "/kittens", title: "전체보기", desc: "안내 중인 고양이 품종" },
      { href: "/kittens/breeds", title: "묘종별 모아보기", desc: "원하는 묘종만 모아서" },
    ],
  },
  {
    label: "HEALTH",
    href: "/health",
    children: [
      { href: "/health", title: "건강 확인", desc: "만나기 전에 보는 체크 항목" },
      { href: "/health/team", title: "케어 역할", desc: "상담에서 건강 질문을 나누는 역할" },
      { href: "/health/guide", title: "적응 안내", desc: "집에 온 첫 주의 속도" },
    ],
  },
];

export const HEADER_NAV = [
  { href: "/puppies", label: "강아지분양", match: "/puppies" },
  { href: "/kittens", label: "고양이분양", match: "/kittens" },
  { href: "/", label: "온유독분양은 이렇게", match: "/philosophy", hash: "philosophy-guide" },
  { href: "/", label: "가족이 되신분들", match: "/families", hash: "adoption-reviews" },
];

export const KEYWORDS = [
  { label: "말티즈", to: "/puppies/breed/maltese" },
  { label: "토이푸들", to: "/puppies/breed/toypoodle" },
  { label: "비숑프리제", to: "/puppies/breed/bichon" },
  { label: "포메라니안", to: "/puppies/breed/pomeranian" },
  { label: "프렌치불독", to: "/puppies/breed/frenchie" },
  { label: "닥스훈트", to: "/puppies/breed/dachshund" },
  { label: "브리티시숏헤어", to: "/kittens/breed/british" },
  { label: "먼치킨", to: "/kittens/breed/munchkin" },
];
