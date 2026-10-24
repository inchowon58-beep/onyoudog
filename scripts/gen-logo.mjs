import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const dest = path.join(publicDir, "logo");
const key = process.env.GEMINI_API_KEY || "";
const model = "gemini-3.1-flash-image";
const prompt = [
  "A finished square logo icon for a Korean pet adoption brand named only in the briefing, not on the artwork.",
  "Flat vector, original, professional, clear at a small header size.",
  "Warm cream background #f4efe6. One large cream circle.",
  "Inside the circle, a single round-faced puppy facing forward, sitting, floppy ears, closed smiling eyes, small persimmon nose, and a persimmon bow at the neck.",
  "Bold even ink-brown outlines #241c16. No fur texture, no shading, no 3D, no photo.",
  "Colors only: #241c16, #e15a32, #fffdf9, #f4efe6.",
  "No cat, no second animal, no heart, no house, no text, no letters, no numbers, no watermark.",
].join(" ");

if (!key) {
  console.error("GEMINI_API_KEY is missing");
  process.exit(1);
}

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
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio: "1:1" },
      },
    }),
  },
);
const body = await response.text();
if (!response.ok) {
  console.error(body.slice(0, 500));
  process.exit(1);
}
const data = JSON.parse(body);
const parts = data?.candidates?.[0]?.content?.parts || [];
const inline = parts.map((part) => part.inlineData || part.inline_data).find(Boolean);
if (!inline?.data) {
  console.error(parts.map((part) => part.text || "").join(" ").slice(0, 300));
  process.exit(1);
}
const mime = inline.mimeType || inline.mime_type || "image/png";
const ext = mime.includes("jpeg") || mime.includes("jpg") ? ".jpg" : ".png";
const file = dest + ext;
fs.mkdirSync(path.dirname(file), { recursive: true });
const buf = Buffer.from(inline.data, "base64");
fs.writeFileSync(file, buf);
fs.writeFileSync(path.join(publicDir, "logo-mark.png"), buf);
fs.writeFileSync(path.join(publicDir, "favicon.png"), buf);
console.log(`${path.basename(file)} ${fs.statSync(file).size} → logo-mark.png, favicon.png`);
