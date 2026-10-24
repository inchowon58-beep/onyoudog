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

const brief = `
브랜드: 온유독 (ONYUDOK), 대표 민동수, 전화 010-4075-5865
전국 분양, 지점 주소 없음, 방문 예약제. 자체 동물병원 없음.
1위/최대/무상수술/허위 후기 금지. 사진은 품종 안내용.

다음 5개 주제로 홈 teaser(한 줄, 42자 내외)와 상세 페이지용 summary(1문장), body(각 4~5문단, 문장만 배열)를 작성.
사실은 아래 원문을 지키고 문장만 다듬으세요.

1 slug puppy-health 제목 강아지분양 시 건강관리
- 시기에 맞는 구충·원충 등 내부기생충 관리, 접종, 매일 같은 시간 식사, 귀청소·위생미용·정기목욕

2 slug adoption-contract 제목 분양받을 때 계약서 내용
- 켄넬 출처·출생내역, 성별·생년월일·분양금액, 국가 보상기일 보상내용, 유의사항

3 slug aftercare-service 제목 분양 후 사후관리 서비스
- 초기 궁금증 실시간 소통, 질병 시 상담·인계·병원 안내, 급작스러운 질병·폐사 시 법정 보상규정

4 slug why-onyudok 제목 강아지분양 업체별 차이
- 무료분양·과장 이벤트와 차별, 비용 투명 안내, 터무니없이 비싼 가격 vs 합리적 가격, 30년 신뢰

5 slug direct-delivery 제목 담당자가 직접 찾아가는 안심배송
- 다마스·퀵 배송 절대 없음, 담당자가 아이와 동반 직접 방문, 생명·가족 만남의 마음

JSON만:
{
  "home": { "aboutTitle": "기본과 원칙을 지키는 온유독의 분양 철학", "aboutLead": "2문장" },
  "philosophy": [
    { "slug": "", "title": "", "teaser": "", "summary": "", "body": ["", "", "", ""] }
  ]
}
5개 slug 모두.`;

const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-flash-latest"];

async function ask(model) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: brief }] }],
        generationConfig: { temperature: 0.65, responseMimeType: "application/json" },
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
    const text = await ask(model);
    parsed = JSON.parse(text);
    console.log(`ok ${model}`);
    break;
  } catch (error) {
    console.warn(model, error.message);
  }
}

if (!parsed?.philosophy?.length) {
  console.error("생성 실패");
  process.exit(1);
}

const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
const next = { ...existing, home: { ...existing.home, ...parsed.home }, philosophy: parsed.philosophy };
fs.writeFileSync(outPath, `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log("wrote philosophy to gemini.json");
