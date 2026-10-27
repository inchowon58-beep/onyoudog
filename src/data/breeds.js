import { PUPPY_BREEDS } from "./puppy-breeds.generated.js";

export const PUPPY_IMAGE_BASE = "/pets";
export const KITTEN_IMAGE_BASE = "https://image.cattery.co.kr";

export function imageUrl(folder, index, typeOrBreed = "puppy") {
  const type = typeof typeOrBreed === "string" ? typeOrBreed : typeOrBreed?.type;
  const base = type === "kitten" ? KITTEN_IMAGE_BASE : PUPPY_IMAGE_BASE;
  return `${base}/${folder}/${String(index).padStart(2, "0")}.webp`;
}

const KITTEN_BREEDS = [
  { slug: "british", folder: "british", type: "kitten", ko: "브리티시숏헤어", en: "British Shorthair", count: 87, take: 8, price: 160, colors: ["블루", "실버", "크림", "골든"], premium: true },
  { slug: "munchkin", folder: "mcnchikin", type: "kitten", ko: "먼치킨", en: "Munchkin", count: 66, take: 8, price: 180, colors: ["브라운태비", "실버", "화이트", "치즈"], premium: true },
  { slug: "ragdoll", folder: "ragdoll", type: "kitten", ko: "랙돌", en: "Ragdoll", count: 57, take: 6, price: 200, colors: ["실포인트", "블루포인트", "바이컬러"], premium: true },
  { slug: "mainecoon", folder: "maincoon", type: "kitten", ko: "메인쿤", en: "Maine Coon", count: 59, take: 6, price: 240, colors: ["브라운태비", "실버", "레드"], premium: true },
  { slug: "neva", folder: "neva", type: "kitten", ko: "네바마스커레이드", en: "Neva Masquerade", count: 57, take: 5, price: 220, colors: ["실포인트", "블루포인트"], premium: true },
  { slug: "scottish", folder: "scottish", type: "kitten", ko: "스코티시폴드", en: "Scottish Fold", count: 19, take: 4, price: 190, colors: ["블루", "실버", "화이트"] },
  { slug: "american", folder: "american", type: "kitten", ko: "아메리칸숏헤어", en: "American Shorthair", count: 18, take: 4, price: 120, colors: ["실버태비", "브라운태비"] },
  { slug: "bengal", folder: "bnagal", type: "kitten", ko: "벵갈", en: "Bengal", count: 20, take: 4, price: 230, colors: ["브라운스팟", "실버"], premium: true },
  { slug: "norwegian", folder: "norwe", type: "kitten", ko: "노르웨이숲", en: "Norwegian Forest", count: 25, take: 4, price: 180, colors: ["브라운태비", "실버", "레드"] },
  { slug: "abyssinian", folder: "abisinan", type: "kitten", ko: "아비시니안", en: "Abyssinian", count: 20, take: 4, price: 160, colors: ["루디", "소렐"] },
  { slug: "russian", folder: "rusian", type: "kitten", ko: "러시안블루", en: "Russian Blue", count: 17, take: 4, price: 150, colors: ["블루"] },
  { slug: "persian", folder: "perisian", type: "kitten", ko: "페르시안", en: "Persian", count: 13, take: 3, price: 200, colors: ["화이트", "크림", "실버"] },
  { slug: "singapura", folder: "singa", type: "kitten", ko: "싱가푸라", en: "Singapura", count: 19, take: 4, price: 170, colors: ["세피아"] },
  { slug: "sphynx", folder: "spinkix", type: "kitten", ko: "스핑크스", en: "Sphynx", count: 20, take: 4, price: 220, colors: ["핑크", "화이트", "블랙"], premium: true },
  { slug: "ksh", folder: "catboho", type: "kitten", ko: "코리안숏헤어", en: "Korean Shorthair", count: 60, take: 8, price: 50, colors: ["고등어태비", "치즈", "삼색", "턱시도"], kind: true },
];

export const BREEDS = [...PUPPY_BREEDS, ...KITTEN_BREEDS];

export function breedsByType(type) {
  return BREEDS.filter((breed) => breed.type === type);
}

export function findBreed(slug) {
  return BREEDS.find((breed) => breed.slug === slug);
}
