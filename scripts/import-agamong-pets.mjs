import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = process.env.AGAMONG_SOURCE || "F:\\아가몽 홈페이지";
const OUT_PETS = path.join(root, "public", "pets");
const OUT_DATA = path.join(root, "src", "data", "puppy-breeds.generated.js");

const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

/** 폴더명(한글) → slug, en, colors, price, premium, kindEligible */
const META = {
  골든두들: { slug: "goldendoodle", en: "Goldendoodle", colors: ["크림", "아프리코트", "골드"], price: 230, premium: true },
  골든리트리버: { slug: "golden", en: "Golden Retriever", colors: ["골드"], price: 240 },
  꼬똥드툴레아: { slug: "coton", en: "Coton de Tulear", colors: ["화이트", "크림"], price: 210, premium: true },
  꼬숑: { slug: "kkotsong", en: "Coton Chon", colors: ["화이트", "크림"], price: 200 },
  닥스훈트: { slug: "dachshund", en: "Dachshund", colors: ["블랙탄", "레드", "크림"], price: 150, kindEligible: true },
  도베르만: { slug: "doberman", en: "Doberman", colors: ["블랙탄"], price: 220 },
  래브라도리트리버: { slug: "labrador", en: "Labrador Retriever", colors: ["옐로", "초콜릿", "블랙"], price: 230 },
  말라뮤트: { slug: "malamute", en: "Alaskan Malamute", colors: ["그레이화이트"], price: 280 },
  말티즈: { slug: "maltese", en: "Maltese", colors: ["화이트", "아이보리"], price: 160, kindEligible: true },
  말티푸: { slug: "maltipoo", en: "Maltipoo", colors: ["화이트", "크림", "아프리코트"], price: 150, premium: true },
  몰키: { slug: "morkie", en: "Morkie", colors: ["블랙탄", "화이트"], price: 160 },
  미니핀: { slug: "minpin", en: "Miniature Pinscher", colors: ["블랙탄", "레드"], price: 150 },
  버니두들: { slug: "bernedoodle", en: "Bernedoodle", colors: ["트라이", "블랙화이트"], price: 260, premium: true },
  버니즈마운틴독: { slug: "bernesemountain", en: "Bernese Mountain Dog", colors: ["트라이"], price: 280 },
  베들링턴테리어: { slug: "bedlington", en: "Bedlington Terrier", colors: ["블루", "샌드"], price: 190 },
  보더콜리: { slug: "bordercollie", en: "Border Collie", colors: ["블랙화이트", "레드화이트"], price: 220 },
  보스턴테리어: { slug: "boston", en: "Boston Terrier", colors: ["블랙화이트"], price: 200 },
  비글: { slug: "beagle", en: "Beagle", colors: ["트라이", "레몬"], price: 180 },
  비숑프리제: { slug: "bichon", en: "Bichon Frise", colors: ["화이트", "크림"], price: 190, premium: true },
  빠삐용: { slug: "papillon", en: "Papillon", colors: ["화이트레드", "블랙화이트"], price: 170 },
  사모예드: { slug: "samoyed", en: "Samoyed", colors: ["화이트", "크림"], price: 260 },
  셰퍼드: { slug: "germanshepherd", en: "German Shepherd", colors: ["블랙탄", "세이블"], price: 240 },
  세퍼드: { slug: "germanshepherd", en: "German Shepherd", colors: ["블랙탄", "세이블"], price: 240 },
  셔틀랜드쉽독: { slug: "sheltie", en: "Shetland Sheepdog", colors: ["세이블", "트라이", "블루멀"], price: 180 },
  슈나우저: { slug: "schnauzer", en: "Schnauzer", colors: ["솔트페퍼", "블랙", "화이트"], price: 180 },
  스코티쉬테리어: { slug: "scottishterrier", en: "Scottish Terrier", colors: ["블랙", "브린들"], price: 180 },
  스탠다드푸들: { slug: "standardpoodle", en: "Standard Poodle", colors: ["블랙", "화이트", "레드"], price: 220 },
  스피츠: { slug: "spitz", en: "Spitz", colors: ["화이트", "오렌지", "크림"], price: 170 },
  시바견: { slug: "shiba", en: "Shiba Inu", colors: ["적색", "흑색", "크림"], price: 200 },
  시츄: { slug: "shihtzu", en: "Shih Tzu", colors: ["골드화이트", "블랙화이트", "브라운"], price: 170 },
  올드잉글리시쉽독: { slug: "oldenglishsheepdog", en: "Old English Sheepdog", colors: ["그레이화이트"], price: 240 },
  요크셔테리어: { slug: "yorkshire", en: "Yorkshire Terrier", colors: ["블랙탄", "골드"], price: 160, kindEligible: true },
  웰시코기: { slug: "corgi", en: "Welsh Corgi", colors: ["트라이", "레드", "세이블"], price: 220 },
  이탈리안그레이하운드: { slug: "italian", en: "Italian Greyhound", colors: ["블루", "화이트", "세이블"], price: 190 },
  잭러셀테리어: { slug: "jackrussell", en: "Jack Russell Terrier", colors: ["화이트브라운", "트라이"], price: 170 },
  차우차우: { slug: "chowchow", en: "Chow Chow", colors: ["레드", "크림"], price: 240 },
  치와와: { slug: "chihuahua", en: "Chihuahua", colors: ["화이트", "브라운", "블랙탄"], price: 140, kindEligible: true },
  코카스파니엘: { slug: "cocker", en: "Cocker Spaniel", colors: ["골드", "블랙", "파티"], price: 180 },
  토이푸들: { slug: "toypoodle", en: "Toy Poodle", colors: ["애프리코트", "레드", "화이트", "블랙"], price: 170, premium: true },
  퍼그: { slug: "pug", en: "Pug", colors: ["팔", "블랙"], price: 180 },
  페키니즈: { slug: "pekingese", en: "Pekingese", colors: ["골드", "화이트", "블랙"], price: 180 },
  포메라니안: { slug: "pomeranian", en: "Pomeranian", colors: ["크림", "오렌지", "화이트", "세이블"], price: 180, premium: true },
  폼스키: { slug: "pomsky", en: "Pomsky", colors: ["그레이화이트", "블랙화이트", "크림"], price: 240, premium: true },
  폼피츠: { slug: "pompitz", en: "Pom Spitz", colors: ["화이트", "크림", "오렌지"], price: 190 },
  프렌치불독: { slug: "frenchie", en: "French Bulldog", colors: ["크림", "브린들", "파드"], price: 280, premium: true },
  허스키: { slug: "husky", en: "Siberian Husky", colors: ["그레이화이트", "블랙화이트"], price: 260 },
  휘핏: { slug: "whippet", en: "Whippet", colors: ["블루", "레드", "화이트"], price: 200 },
  화이트테리어: { slug: "whiteterrier", en: "White Terrier", colors: ["화이트"], price: 160 },
};

function listImages(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "ko"));
}

function computeTake(count) {
  let take = Math.min(8, Math.floor(count / 3));
  if (take < 1) take = 1;
  while (take > 0 && take * 3 > count) take -= 1;
  return Math.max(1, take);
}

async function loadSharp() {
  try {
    const mod = await import("sharp");
    return mod.default;
  } catch {
    return null;
  }
}

async function writeWebp(sharp, srcPath, destPath) {
  if (!sharp) {
    const ext = path.extname(srcPath).toLowerCase();
    const dest = ext === ".webp" ? destPath : destPath.replace(/\.webp$/, ext);
    fs.copyFileSync(srcPath, dest);
    return path.basename(dest);
  }
  await sharp(srcPath)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destPath);
  return path.basename(destPath);
}

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`소스 폴더 없음: ${SOURCE}`);
    process.exit(1);
  }

  const sharp = await loadSharp();
  if (!sharp) console.warn("sharp 미설치 — 원본 확장자로 복사합니다. npm i -D sharp 권장");

  fs.mkdirSync(OUT_PETS, { recursive: true });

  const dirNames = fs.readdirSync(SOURCE, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

  const breeds = [];
  let totalImages = 0;

  for (const ko of dirNames) {
    const meta = META[ko];
    if (!meta) {
      console.warn(`메타 없음(건너뜀): ${ko}`);
      continue;
    }

    const srcDir = path.join(SOURCE, ko);
    const files = listImages(srcDir);
    if (!files.length) {
      console.warn(`이미지 없음(건너뜀): ${ko}`);
      continue;
    }

    const folder = meta.slug;
    const outDir = path.join(OUT_PETS, folder);
    fs.mkdirSync(outDir, { recursive: true });

    let index = 0;
    for (const file of files) {
      index += 1;
      const dest = path.join(outDir, `${String(index).padStart(2, "0")}.webp`);
      await writeWebp(sharp, path.join(srcDir, file), dest);
    }

    const count = index;
    totalImages += count;
    const take = computeTake(count);
    breeds.push({
      slug: meta.slug,
      folder,
      type: "puppy",
      ko,
      en: meta.en,
      count,
      take,
      price: meta.price ?? 170,
      colors: meta.colors ?? ["믹스"],
      ...(meta.premium ? { premium: true } : {}),
      ...(meta.kindEligible ? { kindEligible: true } : {}),
    });
    console.log(`${ko} → /pets/${folder}/ (${count}장, take ${take})`);
  }

  const bySlug = new Map();
  for (const breed of breeds) {
    const prev = bySlug.get(breed.slug);
    if (!prev || breed.count > prev.count) bySlug.set(breed.slug, breed);
  }
  const unique = [...bySlug.values()].sort((a, b) => a.ko.localeCompare(b.ko, "ko"));

  const js = `// AUTO-GENERATED by scripts/import-agamong-pets.mjs — do not edit by hand
export const PUPPY_BREEDS = ${JSON.stringify(unique, null, 2)};
`;
  fs.writeFileSync(OUT_DATA, js, "utf8");
  console.log(`\n견종 ${unique.length}종, 이미지 ${totalImages}장 → public/pets, ${path.relative(root, OUT_DATA)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
