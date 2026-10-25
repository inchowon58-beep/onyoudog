import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { LOCAL_SEO_PAGES, seoLocalPagePath } = await import(
  pathToFileURL(path.join(root, "src", "data", "seo", "local-pages.js")).href
);
const { SITE_URL } = await import(pathToFileURL(path.join(root, "src", "data", "site.js")).href);

/** 신규 등록분만 (기존 메인·50권역·local-links는 이미 네이버 등록 완료) */
const outDir = path.join(root, "웹문서등록온유독");
const keywords = ["강아지분양", "강아지무료분양", "고양이분양", "고양이무료분양"];

if (fs.existsSync(outDir)) {
  for (const name of fs.readdirSync(outDir)) {
    const full = path.join(outDir, name);
    if (fs.statSync(full).isFile()) fs.unlinkSync(full);
  }
} else {
  fs.mkdirSync(outDir, { recursive: true });
}

const listPageUrl = `${SITE_URL}/local-places`;
const byKeyword = Object.fromEntries(keywords.map((k) => [k, []]));

for (const page of LOCAL_SEO_PAGES) {
  const url = `${SITE_URL}${seoLocalPagePath(page)}`;
  if (byKeyword[page.keyword]) byKeyword[page.keyword].push(url);
}

fs.writeFileSync(path.join(outDir, "00-목록페이지.txt"), `${listPageUrl}\n`, "utf8");
for (const kw of keywords) {
  fs.writeFileSync(path.join(outDir, `${kw}.txt`), `${byKeyword[kw].join("\n")}\n`, "utf8");
}

const allLocalUrls = LOCAL_SEO_PAGES.map((p) => `${SITE_URL}${seoLocalPagePath(p)}`);
const registrationOrder = [listPageUrl, ...allLocalUrls];
fs.writeFileSync(path.join(outDir, "전체-등록순.txt"), `${registrationOrder.join("\n")}\n`, "utf8");

console.log(
  `웹문서등록온유독: 목록 1 + 지역 SEO ${LOCAL_SEO_PAGES.length} → 전체 ${registrationOrder.length} URLs`,
);
