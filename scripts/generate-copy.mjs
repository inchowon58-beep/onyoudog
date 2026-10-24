import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BREEDS } from "../src/data/breeds.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "src", "data", "gemini.json");
const rawPath = path.join(root, "scripts", "gemini.raw.txt");
const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.error("GEMINI_API_KEY가 없습니다.");
  process.exit(1);
}

const breedLines = BREEDS.map((breed) => `${breed.slug}: ${breed.ko} (${breed.en})`).join("\n");

const prompt = `당신은 한국 반려동물 분양 브랜드 '온유독'의 카피라이터입니다. 다른 업체(아가몽·디데이펫·포켓몽 등)와 문장·구조가 겹치면 안 됩니다. 완전히 다른 어투로 새로 쓰세요.
사실만 사용하세요.
- 브랜드명 온유독, 영문 ONYUDOK
- 대표 민동수
- 전화 010-4075-5865
- 주소 인천 부평구 부흥로327번길 13 1층
- 전국 분양. 방문 상담은 예약제.
- 동물병원을 운영하지 않음. 진료 보장, 1위, 최대 규모, 무상 수술 같은 표현 금지.
- 홈페이지 강아지·고양이 사진은 품종 안내용이며 실재고가 아님.

JSON만 반환하세요. 마크다운 없이.
스키마:
{
  "home": {
    "title": "줄바꿈은 \\n 하나만",
    "lead": "2문장",
    "aboutTitle": "",
    "aboutLead": "2문장",
    "choiceLead": "1문장"
  },
  "pages": {
    "greeting": { "title": "", "lead": "", "paragraphs": ["", "", ""] },
    "company": { "title": "", "lead": "", "paragraphs": ["", ""] },
    "aftercare": { "lead": "" },
    "system": { "lead": "" },
    "delivery": { "lead": "" },
    "health": { "lead": "" },
    "overseas": { "lead": "" }
  },
  "qna": [ { "q": "", "a": "" } ],
  "guides": [ { "slug": "first-week|food|toilet|outing", "summary": "", "body": ["", ""] } ],
  "breedBlurbs": { "slug": "40자 안팎의 품종 한 줄" }
}
qna는 8개. guides는 4개 slug를 모두. breedBlurbs는 아래 slug를 모두.
${breedLines}`;

const models = ["gemini-3.8-flash", "gemini-3.5-flash", "gemini-flash-latest"];

async function ask(model) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    },
  );
  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${model} ${response.status} ${body.slice(0, 400)}`);
  }
  const data = JSON.parse(body);
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
  if (!text) throw new Error(`${model} 빈 응답`);
  return text;
}

let lastError = null;
for (const model of models) {
  try {
    console.log(`try ${model}`);
    const text = await ask(model);
    fs.writeFileSync(rawPath, text, "utf8");
    const parsed = JSON.parse(text);
    let existing = {};
    try {
      existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
    } catch {
      existing = {};
    }
    const next = {
      ...existing,
      ...parsed,
      home: { ...existing.home, ...parsed.home },
      pages: { ...(existing.pages || {}), ...(parsed.pages || {}) },
      breedBlurbs: parsed.breedBlurbs || existing.breedBlurbs,
    };
    if (Array.isArray(parsed.philosophy) && parsed.philosophy.length >= 5) next.philosophy = parsed.philosophy;
    else if (existing.philosophy?.length) next.philosophy = existing.philosophy;
    const validReviews = Array.isArray(parsed.adoptionReviews)
      ? parsed.adoptionReviews.filter((r) => r?.title?.trim() && r?.body?.trim())
      : [];
    if (validReviews.length >= 6) next.adoptionReviews = validReviews;
    else if (Array.isArray(existing.adoptionReviews) && existing.adoptionReviews.length >= 6) {
      next.adoptionReviews = existing.adoptionReviews;
    } else {
      delete next.adoptionReviews;
    }
    fs.writeFileSync(outPath, JSON.stringify(next, null, 2), "utf8");
    console.log(`saved ${model}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.error(String(error.message || error).slice(0, 500));
  }
}

console.error(lastError);
process.exit(1);
