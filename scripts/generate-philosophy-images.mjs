import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "philosophy");
const key = process.env.GEMINI_API_KEY;
const model = "gemini-3.1-flash-image";

const photo =
  "Photorealistic photograph, natural daylight, shallow depth of field, soft neutral interior tones, Korean pet adoption service editorial style. No text, no logos, no watermark. 16:9 horizontal.";

const koreanPeople =
  "If people appear they must be clearly Korean (East Asian Korean appearance), modest casual clothing, warm natural expressions.";

const jobs = [
  {
    file: "puppy-health.jpg",
    prompt: `${photo} ${koreanPeople} A Korean woman in her 30s gently feeding a small puppy in a clean bright living room, food bowl and grooming brush on a low table, calm trustworthy mood.`,
  },
  {
    file: "adoption-contract.jpg",
    prompt: `${photo} ${koreanPeople} Close-up of Korean hands signing a simple adoption document at a tidy desk, small dog resting nearby on a blanket, transparent business atmosphere.`,
  },
  {
    file: "aftercare-service.jpg",
    prompt: `${photo} ${koreanPeople} Korean couple on a sofa video-calling on phone while petting their puppy, cozy home after-adoption support mood.`,
  },
  {
    file: "why-onyudok.jpg",
    prompt: `${photo} ${koreanPeople} Korean staff member in plain clothes calmly explaining to a Korean family in a quiet consultation room, puppy in open carrier, honest no-flashy-ads feeling.`,
  },
  {
    file: "direct-delivery.jpg",
    prompt: `${photo} ${koreanPeople} Korean driver caregiver buckling a pet carrier in a clean car, gentle safety-focused direct delivery scene, suburban daylight.`,
  },
  {
    file: "../hero/banner-together.jpg",
    prompt: `${photo} ${koreanPeople} Wide shot: Korean family sitting on floor with small dog and cat, soft window light, emotional but realistic home portrait. Cinematic 21:9 feel.`,
    aspect: "16:9",
  },
];

if (!key) {
  console.error("GEMINI_API_KEY missing");
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

for (const job of jobs) {
  const dest = job.file.startsWith("..")
    ? path.join(root, "public", job.file.replace(/^\.\.\//, ""))
    : path.join(outDir, job.file);
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: job.prompt }] }],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
          imageConfig: { aspectRatio: job.aspect || "16:9" },
        },
      }),
    },
  );
  const body = await response.text();
  if (!response.ok) {
    console.error(job.file, response.status, body.slice(0, 400));
    continue;
  }
  const data = JSON.parse(body);
  const inline = (data?.candidates?.[0]?.content?.parts || [])
    .map((p) => p.inlineData || p.inline_data)
    .find(Boolean);
  if (!inline?.data) {
    console.error(job.file, "no image");
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(inline.data, "base64"));
  console.log(job.file, fs.statSync(dest).size);
}
