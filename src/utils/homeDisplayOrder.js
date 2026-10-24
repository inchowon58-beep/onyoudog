import { breedsByType } from "../data/breeds.js";

/** 메인 노출 순서 (유사문서 회피용 고정 셔플) */
export const HERO_DOG_SLUGS = [
  { slug: "maltipoo", label: "말티푸" },
  { slug: "corgi", label: "웰시코기" },
  { slug: "frenchie", label: "프렌치불독" },
];

export function orderedPuppyBreeds(limit = 14) {
  const all = breedsByType("puppy");
  const pivot = 11;
  return [...all.slice(pivot), ...all.slice(0, pivot)].slice(0, limit);
}

export function orderedKittenBreeds(limit = 10) {
  const all = breedsByType("kitten");
  return [...all].reverse().slice(0, limit);
}

export function rotatePets(pets, offset = 7) {
  if (!pets.length) return pets;
  const n = pets.length;
  const o = offset % n;
  return [...pets.slice(o), ...pets.slice(0, o)];
}
