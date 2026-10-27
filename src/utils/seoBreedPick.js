import { BREEDS, imageUrl } from "../data/breeds.js";

function hashSeed(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/** 페이지마다 동일한 5종 (새로고침·프리렌더 일관) */
export function pickSeoBreeds(pageKey, petType, count = 5) {
  const pool = BREEDS.filter((b) => b.type === petType);
  const picks = [];
  let state = hashSeed(`${pageKey}:${petType}`);
  while (picks.length < Math.min(count, pool.length)) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const breed = pool[state % pool.length];
    if (!picks.some((item) => item.slug === breed.slug)) picks.push(breed);
  }
  return picks.map((breed, index) => ({
    ...breed,
    cover: imageUrl(breed.folder, (index % breed.take) + 1, breed),
    href: petType === "kitten" ? `/kittens/breed/${breed.slug}` : `/puppies/breed/${breed.slug}`,
  }));
}
