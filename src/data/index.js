import extra from "./gemini.json";
import { content as base } from "./content.js";
import { PHILOSOPHY_BASE } from "./philosophy-base.js";
import { resolveAdoptionReviews } from "./adoption-reviews-base.js";

function merge(a, b) {
  if (b === undefined || b === null || b === "") return a;
  const aObj = Boolean(a) && typeof a === "object" && !Array.isArray(a);
  const bObj = Boolean(b) && typeof b === "object" && !Array.isArray(b);
  if (!aObj || !bObj) return b;
  const out = { ...a };
  for (const key of Object.keys(b)) out[key] = merge(a[key], b[key]);
  return out;
}

function mergeGuides(baseGuides, extraGuides) {
  if (!Array.isArray(extraGuides)) return baseGuides;
  return baseGuides.map((guide) => {
    const next = extraGuides.find((item) => item.slug === guide.slug);
    return next ? merge(guide, next) : guide;
  });
}

const { guides, qna, philosophy, adoptionReviews, ...rest } = extra || {};
const merged = merge(base, rest);
merged.guides = mergeGuides(base.guides, guides);
if (Array.isArray(qna) && qna.length >= 4) merged.qna = qna;
function resolvePhilosophy(extraPhilosophy) {
  if (!Array.isArray(extraPhilosophy) || extraPhilosophy.length < 5) return PHILOSOPHY_BASE;
  const bySlug = new Map(PHILOSOPHY_BASE.map((item) => [item.slug, item]));
  const mergedList = extraPhilosophy.map((item) => {
    const base = bySlug.get(item.slug);
    if (!base) return item;
    return {
      ...base,
      ...item,
      body: Array.isArray(item.body) && item.body.length ? item.body : base.body,
      teaser: item.teaser || base.teaser,
      summary: item.summary || base.summary,
    };
  });
  return mergedList.length >= 5 ? mergedList : PHILOSOPHY_BASE;
}
merged.philosophy = resolvePhilosophy(philosophy);
merged.adoptionReviews = resolveAdoptionReviews(adoptionReviews);

export const content = merged;

export * from "./site.js";
export * from "./breeds.js";
export * from "./pets.js";
