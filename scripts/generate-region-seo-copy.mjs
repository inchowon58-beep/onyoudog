import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outPath = path.join(root, "src", "data", "seo", "region-pages.json");
const key = process.env.GEMINI_API_KEY;

if (!key) {
  console.error("GEMINI_API_KEY가 없습니다.");
  process.exit(1);
}

const { SEO_REGION_PAGES_RAW } = await import(
  pathToFileURL(path.join(root, "src", "data", "seo", "regions50.raw.js")).href
);

const models = ["gemini-flash-latest", "gemini-3.8-flash", "gemini-3.1-flash", "gemini-2.0-flash"];
const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, "utf8")) : {};

async function ask(model, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.82, responseMimeType: "application/json" },
      }),
    },
  );
  const body = await response.text();
  if (!response.ok) throw new Error(`${model} ${response.status} ${body.slice(0, 400)}`);
  const data = JSON.parse(body);
  return data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
}

function promptFor(page) {
  const subs = page.subAreas.slice(0, 12).join(", ");
  return `
브랜드: 온유독(ONYUDOK), 대표 민동수, 전화 010-4075-5865
매장 주소: 인천 부평구 부흥로327번길 13 1층 (전국 상담·배송 안내)
자체 동물병원 없음. 1위·최대·허위 후기·무료분양 미끼 금지. 사진은 품종 안내용.

권역 ID: ${page.id}
페이지 제목: ${page.title}
대표키워드: ${page.keyword}
담당 범위: ${page.coverage}
하부지역 예시(일부): ${subs}
견종 키워드: ${page.breedKeywords.join(", ")}

이 권역 전용 SEO 본문을 작성하세요. 다른 권역과 문장·구조를 다르게.
애견분양·애견샵·펫샵·강아지입양·고양이분양 등 관련어를 자연스럽게 2~3회 포함.
하부 동·읍·면 이름을 본문에 4~6곳 자연스럽게 언급(나열·스팸 금지).
매장은 인천 부평에 있으며 담당 지역에 지점이 있다고 쓰지 말 것.

JSON만:
{
  "intro": "2~3문장",
  "sections": [
    {"title":"소제목1","body":"2~3문장"},
    {"title":"소제목2","body":"2~3문장"},
    {"title":"소제목3","body":"2~3문장"}
  ],
  "paragraphs": ["통합문단1","통합문단2","통합문단3","통합문단4"],
  "faqs": [["질문1","답1"],["질문2","답2"],["질문3","답3"]]
}
`;
}

for (const page of SEO_REGION_PAGES_RAW) {
  if (existing[page.id]?.paragraphs?.length >= 3) {
    console.log(`skip ${page.id}`);
    continue;
  }
  let parsed;
  for (const model of models) {
    try {
      parsed = JSON.parse(await ask(model, promptFor(page)));
      console.log(`ok ${page.id} ${model}`);
      break;
    } catch (error) {
      console.warn(page.id, model, error.message);
    }
  }
  if (!parsed?.intro && !parsed?.paragraphs) {
    console.error(`fail ${page.id}`);
    continue;
  }
  existing[page.id] = parsed;
  fs.writeFileSync(outPath, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
  await new Promise((r) => setTimeout(r, 1200));
}

console.log(`저장: ${outPath} (${Object.keys(existing).length}개)`);
