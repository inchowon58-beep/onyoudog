import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "src", "data", "seo", "copy.json");
const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.error("GEMINI_API_KEY가 없습니다.");
  process.exit(1);
}

const prompt = `
브랜드: 온유독 (ONYUDOK), 대표 민동수, 전화 010-4075-5865
주소: 인천 부평구 부흥로327번길 13 1층
자체 동물병원 없음. 1위/최대/허위 후기·무료분양 미끼 상술 금지. 사진은 품종 안내용.

SEO 공통 문단 12개만 작성. 각 문단 2~3문장.
반드시 치환자 포함: {지역} {키워드} {동물} {전화}
4키워드(강아지분양·고양이분양·강아지무료분양·고양이무료분양)에 교차 배치할 것이므로
문장 시작·길이·어조를 서로 다르게 작성해 유사문서 위험을 줄이세요.

JSON만:
{"paragraphs":["...", "..."]}
`;

const models = ["gemini-3.8-flash", "gemini-3.1-flash", "gemini-flash-latest", "gemini-2.0-flash"];

async function ask(model) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.85, responseMimeType: "application/json" },
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
  } catch (error) {
    console.warn(model, error.message);
  }
}

if (!Array.isArray(parsed?.paragraphs) || parsed.paragraphs.length < 12) {
  console.error("paragraphs 12개 생성 실패");
  process.exit(1);
}

fs.writeFileSync(outPath, `${JSON.stringify({ paragraphs: parsed.paragraphs.slice(0, 12) }, null, 2)}\n`, "utf8");
console.log(`저장: ${outPath}`);
