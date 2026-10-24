import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "src", "data", "gemini.json");
const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.error("GEMINI_API_KEY가 없습니다.");
  process.exit(1);
}

const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));

const prompt = `
한국 반려동물 분양 브랜드 '온유독(ONYUDOK)' 전용 카피를 새로 작성하세요.
다른 업체(아가몽, 디데이펫, 포켓몽 등)와 문장·구조·어투가 겹치면 안 됩니다. 유사문서로 보이지 않게 완전히 다른 리듬으로 쓰세요.

사실(변경 금지):
- 대표 민동수, 전화 010-4075-5865
- 상담·예약: 인천 부평구 부흥로327번길 13 1층
- 전국 상담·권역 배송, 자체 동물병원 없음
- 1위/최대/무상수술/허위 무료분양 미끼 금지
- 사진은 품종 안내용, 실시간 재고 아님

JSON만 반환:
{
  "home": {
    "kicker": "영문 1줄",
    "title": "히어로 제목, \\n으로 2~3줄",
    "lead": "2~3문장",
    "aboutTitle": "철학 밴드 제목",
    "aboutLead": "2문장",
    "choiceTitle": "인기몽 섹션 제목(다른 표현)",
    "choiceLead": "1문장",
    "breedTitle": "품종 모아보기 제목",
    "breedLead": "1문장",
    "puppySectionTitle": "강아지 그리드 h2 (em 없이)",
    "kittenSectionTitle": "고양이 그리드 h2",
    "philosophyKicker": "READ MORE 대신 다른 영문",
    "philosophyTitle": "분양 안내 자세히 대체 제목",
    "philosophyLead": "2문장",
    "quoteLine1": "짧은 줄",
    "quoteLine2": "중간 줄",
    "quoteLine3": "긴 줄",
    "quoteNoteStrong": "가족 수 강조 문장(8352 숫자 포함)",
    "quoteNoteSub": "부가 한 줄"
  },
  "philosophy": [
    { "slug": "puppy-health", "title": "", "teaser": "", "summary": "", "body": ["","","",""] },
    { "slug": "adoption-contract", "title": "", "teaser": "", "summary": "", "body": ["","","",""] },
    { "slug": "aftercare-service", "title": "", "teaser": "", "summary": "", "body": ["","","",""] },
    { "slug": "why-onyudok", "title": "", "teaser": "", "summary": "", "body": ["","","",""] },
    { "slug": "direct-delivery", "title": "", "teaser": "", "summary": "", "body": ["","","",""] }
  ],
  "adoptionReviews": [ { "title": "", "body": "", "meta": "이○○ · 지역 · 견종" } ]
}

philosophy 5개 slug 필수, body 각 4문단. adoptionReviews 30개, 지역·견종 다양하게.
`;

const models = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-3.1-flash"];

async function ask(model) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.88, responseMimeType: "application/json" },
      }),
    },
  );
  const body = await response.text();
  if (!response.ok) throw new Error(`${model} ${response.status} ${body.slice(0, 400)}`);
  const data = JSON.parse(body);
  return data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
}

let parsed;
for (const model of models) {
  try {
    parsed = JSON.parse(await ask(model));
    console.log(`ok ${model}`);
    break;
  } catch (e) {
    console.warn(model, e.message);
  }
}

if (!parsed?.home?.title || !parsed?.philosophy?.length) {
  console.error("생성 실패");
  process.exit(1);
}

const next = {
  ...existing,
  home: { ...existing.home, ...parsed.home },
  philosophy: parsed.philosophy,
};
if (parsed.adoptionReviews?.length >= 28) next.adoptionReviews = parsed.adoptionReviews;

fs.writeFileSync(outPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log("gemini.json 갱신");
