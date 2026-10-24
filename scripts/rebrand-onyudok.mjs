import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const REPLACEMENTS = [
  ["https://www.cafedaum.co.kr", "https://www.onyudok.co.kr"],
  ["cafedaum.co.kr", "onyudok.co.kr"],
  ["AGAMONG", "ONYUDOK"],
  ["AGA MONG", "ON YU DOK"],
  ["아가몽분양은", "온유독분양은"],
  ["아가몽", "온유독"],
  ["agamong", "onyudok"],
  ["pocketmong", "onyudok"],
  ["why-agamong", "why-onyudok"],
];

const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".vercel"]);
const TEXT_EXT = new Set([
  ".js",
  ".jsx",
  ".json",
  ".html",
  ".css",
  ".txt",
  ".xml",
  ".mjs",
  ".md",
]);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(full, files);
      continue;
    }
    if (TEXT_EXT.has(path.extname(name).toLowerCase())) files.push(full);
  }
  return files;
}

let touched = 0;
for (const file of walk(root)) {
  if (file.includes(`${path.sep}scripts${path.sep}rebrand-onyudok.mjs`)) continue;
  let text = fs.readFileSync(file, "utf8");
  const before = text;
  for (const [from, to] of REPLACEMENTS) text = text.split(from).join(to);
  if (text !== before) {
    fs.writeFileSync(file, text, "utf8");
    touched += 1;
  }
}

const oldImg = path.join(root, "public", "philosophy", "why-agamong.jpg");
const newImg = path.join(root, "public", "philosophy", "why-onyudok.jpg");
if (fs.existsSync(oldImg) && !fs.existsSync(newImg)) {
  fs.renameSync(oldImg, newImg);
}

console.log(`rebrand 완료: ${touched} files updated`);
