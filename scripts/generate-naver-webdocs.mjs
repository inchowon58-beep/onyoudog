import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { SEO_REGION_PAGES, seoRegionPagePath } = await import(
  pathToFileURL(path.join(root, "src", "data", "seo", "regions.js")).href
);
const { SITE_URL } = await import(pathToFileURL(path.join(root, "src", "data", "site.js")).href);

const outDirs = [path.join(root, "웹문서등록온유독"), path.join(root, "웹문서등록")];
const commonUrls = [`${SITE_URL}/`, `${SITE_URL}/local-links`];
const regionUrls = SEO_REGION_PAGES.map((page) => `${SITE_URL}${seoRegionPagePath(page)}`);

for (const outDir of outDirs) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "00-메인및목록.txt"), `${commonUrls.join("\n")}\n`, "utf8");
  fs.writeFileSync(path.join(outDir, "전국50권역.txt"), `${regionUrls.join("\n")}\n`, "utf8");
  fs.writeFileSync(path.join(outDir, "전체-등록순.txt"), `${[...commonUrls, ...regionUrls].join("\n")}\n`, "utf8");
}

console.log(`네이버 웹문서등록 → ${outDirs[0]} (${regionUrls.length} 권역)`);
