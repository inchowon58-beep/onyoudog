import { BREEDS, imageUrl } from "./breeds.js";

const NAMES = [
  "몽이", "포키", "단이", "보리", "콩이", "나비", "하늘", "구름", "모찌", "두부",
  "우유", "밤이", "달이", "별이", "초코", "쿠키", "마루", "산들", "하람", "누리",
  "다온", "윤슬", "바다", "민트", "라임", "베리", "피치", "코코", "밀크", "설기",
  "호두", "진주", "루비", "온유", "다정", "포근", "살구", "자두", "포도", "멜론",
  "키위", "망고", "레몬", "루나", "로이", "두리", "동글", "포포", "나나", "리리",
  "모모", "토리", "소리", "노을", "가을", "겨울", "여름", "봄이", "모래", "이슬",
  "안개", "바람", "하양", "치즈", "크림", "모카", "라떼", "만두", "송이", "도토리",
  "수국", "민들", "해바", "코코아", "인절", "찰리", "세모", "교자", "호빵", "빙수",
  "표고", "밤톨", "솔이", "꽃잎", "푸른", "깜장", "샷이", "모카", "라떼", "콩죽",
  "미루", "소담", "이안", "하율", "로운", "가온", "다원", "시온", "윤아", "하린",
  "서우", "지안", "도윤", "은호", "시우", "하준", "서아", "지유", "로아", "이든",
  "주원", "하은", "서연", "지민", "도아", "은우", "시윤", "하음", "서진", "지호",
  "로하", "이솔", "주아", "하람이", "서온", "지율", "도담", "은채", "시하", "하늘이",
  "포몽", "단비", "보름", "콩알", "나르", "하몽", "구르", "모과", "두유", "우디",
  "밤톨이", "달몽", "별몽", "초롱", "쿠마", "마몽", "산이", "누리몽", "다몽", "윤이",
  "바오", "민들레", "라온", "베리몽", "피치몽", "코몽", "밀키", "설몽", "호야", "진이",
  "루몽", "온몽", "살이", "자몽", "포리", "메로", "키로", "망몽", "레오", "키키",
  "아리", "리몽", "소이", "해온", "은별", "찬이", "율이", "봄몽", "노니", "숲이",
  "진주몽", "루비몽", "사피", "온이", "달이몽", "별하", "초이", "쿠키몽", "마루몽", "산들몽",
  "하람몽", "누리온", "다온몽", "윤슬이", "바다몽", "민트몽", "라임이", "베리온", "피치온", "코코몽",
  "포비", "몽실", "달콩", "별콩", "밤송", "구름이", "하늘몽", "나비몽", "보리몽", "콩몽",
  "두루", "우유몽", "모찌몽", "쿠키온", "초코몽", "루나몽", "로이몽", "단몽", "포몽이", "해몽",
  "담이", "모리", "카야", "노아", "레오", "미호", "수아", "도담이", "하람솔", "별하람",
  "포근이", "다정몽", "온유몽", "살구몽", "자두몽", "포도몽", "멜론몽", "키위몽", "망고몽", "레몬몽",
];

const AGES = ["3개월"];

function uniqueNames(count) {
  const used = new Set();
  const list = [];
  for (const name of NAMES) {
    if (used.has(name)) continue;
    used.add(name);
    list.push(name);
    if (list.length === count) return list;
  }
  throw new Error("이름이 부족합니다.");
}

function buildPets() {
  const names = uniqueNames(220);
  const pets = [];
  let cursor = 0;
  let seq = 1;

  for (const breed of BREEDS) {
    if (breed.take * 3 > breed.count) {
      throw new Error(`${breed.slug} 이미지가 부족합니다.`);
    }
    for (let index = 0; index < breed.take; index += 1) {
      const kind = Boolean(breed.kind) || Boolean(breed.kindEligible && index === breed.take - 1);
      const premium = !kind && Boolean(breed.premium) && index < 2;
      const price = kind ? Math.min(breed.price, breed.type === "puppy" ? 90 : breed.price) : premium ? breed.price + 60 : breed.price + (index % 3) * 10;
      const start = index * 3 + 1;
      pets.push({
        id: `${breed.slug}-${String(index + 1).padStart(2, "0")}`,
        code: `AM-${breed.type === "puppy" ? "D" : "C"}-${String(seq).padStart(3, "0")}`,
        seq,
        slug: breed.slug,
        folder: breed.folder,
        type: breed.type,
        breed: breed.ko,
        breedEn: breed.en,
        name: names[cursor],
        gender: index % 2 === 0 ? "남아" : "여아",
        age: AGES[index % AGES.length],
        color: breed.colors[index % breed.colors.length],
        price,
        premium,
        kind,
        index,
        images: [0, 1, 2].map((step) => imageUrl(breed.folder, start + step)),
        cover: imageUrl(breed.folder, start),
      });
      cursor += 1;
      seq += 1;
    }
  }
  return pets;
}

export const PETS = buildPets();

export function formatPrice(pet) {
  return `상담 기준가 ${pet.price}만원~`;
}

export function getPet(id) {
  return PETS.find((pet) => pet.id === id);
}

export function filterPets({ type, slug, premium, kind, gender, query } = {}) {
  const q = (query || "").trim().toLowerCase();
  return PETS.filter((pet) => {
    if (type && pet.type !== type) return false;
    if (slug && pet.slug !== slug) return false;
    if (premium && !pet.premium) return false;
    if (kind && !pet.kind) return false;
    if (gender && gender !== "all" && pet.gender !== gender) return false;
    if (!q) return true;
    const hay = `${pet.name} ${pet.breed} ${pet.breedEn} ${pet.color} ${pet.code}`.toLowerCase();
    return hay.includes(q);
  });
}
