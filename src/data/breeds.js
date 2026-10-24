export const IMAGE_BASE = "https://image.cattery.co.kr";

export function imageUrl(folder, index) {
  return `${IMAGE_BASE}/${folder}/${String(index).padStart(2, "0")}.webp`;
}

export const BREEDS = [
  { slug: "pomeranian", folder: "pome", type: "puppy", ko: "포메라니안", en: "Pomeranian", count: 66, take: 8, price: 180, colors: ["크림", "오렌지", "화이트", "세이블"], premium: true },
  { slug: "toypoodle", folder: "toypoodle", type: "puppy", ko: "토이푸들", en: "Toy Poodle", count: 33, take: 6, price: 170, colors: ["애프리코트", "레드", "화이트", "블랙"], premium: true },
  { slug: "maltese", folder: "maltese", type: "puppy", ko: "말티즈", en: "Maltese", count: 25, take: 6, price: 160, colors: ["화이트", "아이보리"], kindEligible: true },
  { slug: "bichon", folder: "bishone", type: "puppy", ko: "비숑프리제", en: "Bichon Frise", count: 20, take: 6, price: 190, colors: ["화이트", "크림"], premium: true },
  { slug: "maltipoo", folder: "maltipoo", type: "puppy", ko: "말티푸", en: "Maltipoo", count: 26, take: 6, price: 150, colors: ["화이트", "크림", "아프리코트"], premium: true },
  { slug: "chihuahua", folder: "chihuahua", type: "puppy", ko: "치와와", en: "Chihuahua", count: 20, take: 4, price: 140, colors: ["화이트", "브라운", "블랙탄"], kindEligible: true },
  { slug: "yorkshire", folder: "yoki", type: "puppy", ko: "요크셔테리어", en: "Yorkshire Terrier", count: 12, take: 4, price: 160, colors: ["블랙탄", "골드"], kindEligible: true },
  { slug: "corgi", folder: "welshi", type: "puppy", ko: "웰시코기", en: "Welsh Corgi", count: 16, take: 4, price: 220, colors: ["트라이", "레드", "세이블"] },
  { slug: "shihtzu", folder: "shichu", type: "puppy", ko: "시츄", en: "Shih Tzu", count: 24, take: 5, price: 170, colors: ["골드화이트", "블랙화이트", "브라운"] },
  { slug: "frenchie", folder: "frenchi", type: "puppy", ko: "프렌치불독", en: "French Bulldog", count: 27, take: 5, price: 280, colors: ["크림", "브린들", "파드"], premium: true },
  { slug: "shiba", folder: "siba", type: "puppy", ko: "시바견", en: "Shiba Inu", count: 19, take: 4, price: 200, colors: ["적색", "흑색", "크림"] },
  { slug: "coton", folder: "coton", type: "puppy", ko: "꼬똥드툴레아", en: "Coton de Tulear", count: 30, take: 5, price: 210, colors: ["화이트", "크림"], premium: true },
  { slug: "sheltie", folder: "selti", type: "puppy", ko: "셔틀랜드쉽독", en: "Shetland Sheepdog", count: 98, take: 4, price: 180, colors: ["세이블", "트라이", "블루멀"] },
  { slug: "pomsky", folder: "pomsky", type: "puppy", ko: "폼스키", en: "Pomsky", count: 50, take: 6, price: 240, colors: ["그레이화이트", "블랙화이트", "크림"], premium: true },
  { slug: "dachshund", folder: "daks", type: "puppy", ko: "닥스훈트", en: "Dachshund", count: 23, take: 4, price: 150, colors: ["블랙탄", "레드", "크림"], kindEligible: true },
  { slug: "samoyed", folder: "samoyed", type: "puppy", ko: "사모예드", en: "Samoyed", count: 16, take: 3, price: 260, colors: ["화이트", "크림"] },
  { slug: "doodle", folder: "doodle", type: "puppy", ko: "두들", en: "Doodle", count: 40, take: 5, price: 230, colors: ["크림", "아프리코트", "블랙"], premium: true },
  { slug: "westie", folder: "wterrier", type: "puppy", ko: "웨스티", en: "West Highland White Terrier", count: 30, take: 4, price: 170, colors: ["화이트"] },
  { slug: "pekingese", folder: "pekinee", type: "puppy", ko: "페키니즈", en: "Pekingese", count: 27, take: 4, price: 180, colors: ["골드", "화이트", "블랙"] },
  { slug: "minpin", folder: "minipin", type: "puppy", ko: "미니어처핀셔", en: "Miniature Pinscher", count: 11, take: 3, price: 150, colors: ["블랙탄", "레드"] },
  { slug: "golden", folder: "coldenret", type: "puppy", ko: "골든리트리버", en: "Golden Retriever", count: 10, take: 3, price: 240, colors: ["골드"] },
  { slug: "cocker", folder: "coca", type: "puppy", ko: "코커스패니얼", en: "Cocker Spaniel", count: 10, take: 3, price: 180, colors: ["골드", "블랙", "파티"] },
  { slug: "dalmatian", folder: "dalma", type: "puppy", ko: "달마시안", en: "Dalmatian", count: 21, take: 3, price: 200, colors: ["화이트블랙"] },
  { slug: "italian", folder: "italian", type: "puppy", ko: "이탈리안그레이하운드", en: "Italian Greyhound", count: 10, take: 3, price: 190, colors: ["블루", "화이트", "세이블"] },
  { slug: "whiteterrier", folder: "Newwhiteterrier", type: "puppy", ko: "화이트테리어", en: "White Terrier", count: 11, take: 3, price: 160, colors: ["화이트"] },
  { slug: "boston", folder: "bosten", type: "puppy", ko: "보스턴테리어", en: "Boston Terrier", count: 5, take: 1, price: 200, colors: ["블랙화이트"] },
  { slug: "englishbulldog", folder: "engbuldog", type: "puppy", ko: "잉글리시불독", en: "English Bulldog", count: 6, take: 2, price: 300, colors: ["화이트", "브린들"] },
  { slug: "doberman", folder: "doberman", type: "puppy", ko: "도베르만", en: "Doberman", count: 6, take: 2, price: 220, colors: ["블랙탄"] },
  { slug: "malamute", folder: "malamute", type: "puppy", ko: "알래스칸말라뮤트", en: "Alaskan Malamute", count: 5, take: 1, price: 280, colors: ["그레이화이트"] },
  { slug: "chowchow", folder: "chauchau", type: "puppy", ko: "차우차우", en: "Chow Chow", count: 6, take: 2, price: 240, colors: ["레드", "크림"] },
  { slug: "schnauzer", folder: "shuna", type: "puppy", ko: "슈나우저", en: "Schnauzer", count: 10, take: 3, price: 180, colors: ["솔트페퍼", "블랙", "화이트"] },
  { slug: "british", folder: "british", type: "kitten", ko: "브리티시숏헤어", en: "British Shorthair", count: 87, take: 8, price: 160, colors: ["블루", "실버", "크림", "골든"], premium: true },
  { slug: "munchkin", folder: "mcnchikin", type: "kitten", ko: "먼치킨", en: "Munchkin", count: 66, take: 8, price: 180, colors: ["브라운태비", "실버", "화이트", "치즈"], premium: true },
  { slug: "ragdoll", folder: "ragdoll", type: "kitten", ko: "랙돌", en: "Ragdoll", count: 57, take: 6, price: 200, colors: ["실포인트", "블루포인트", "바이컬러"], premium: true },
  { slug: "mainecoon", folder: "maincoon", type: "kitten", ko: "메인쿤", en: "Maine Coon", count: 59, take: 6, price: 240, colors: ["브라운태비", "실버", "레드"], premium: true },
  { slug: "neva", folder: "neva", type: "kitten", ko: "네바마스커레이드", en: "Neva Masquerade", count: 57, take: 5, price: 220, colors: ["실포인트", "블루포인트"], premium: true },
  { slug: "scottish", folder: "scottish", type: "kitten", ko: "스코티시폴드", en: "Scottish Fold", count: 19, take: 4, price: 190, colors: ["블루", "실버", "화이트"] },
  { slug: "american", folder: "american", type: "kitten", ko: "아메리칸숏헤어", en: "American Shorthair", count: 18, take: 4, price: 120, colors: ["실버태비", "브라운태비"] },
  { slug: "bengal", folder: "bnagal", type: "kitten", ko: "벵갈", en: "Bengal", count: 20, take: 4, price: 230, colors: ["브라운스팟", "실버"], premium: true },
  { slug: "norwegian", folder: "norwe", type: "kitten", ko: "노르웨이숲", en: "Norwegian Forest", count: 25, take: 4, price: 180, colors: ["브라운태비", "실버", "레드"] },
  { slug: "abyssinian", folder: "abisinan", type: "kitten", ko: "아비시니안", en: "Abyssinian", count: 20, take: 4, price: 160, colors: ["루디", "소렐"] },
  { slug: "russian", folder: "rusian", type: "kitten", ko: "러시안블루", en: "Russian Blue", count: 17, take: 4, price: 150, colors: ["블루"] },
  { slug: "persian", folder: "perisian", type: "kitten", ko: "페르시안", en: "Persian", count: 13, take: 3, price: 200, colors: ["화이트", "크림", "실버"] },
  { slug: "singapura", folder: "singa", type: "kitten", ko: "싱가푸라", en: "Singapura", count: 19, take: 4, price: 170, colors: ["세피아"] },
  { slug: "sphynx", folder: "spinkix", type: "kitten", ko: "스핑크스", en: "Sphynx", count: 20, take: 4, price: 220, colors: ["핑크", "화이트", "블랙"], premium: true },
  { slug: "ksh", folder: "catboho", type: "kitten", ko: "코리안숏헤어", en: "Korean Shorthair", count: 60, take: 8, price: 50, colors: ["고등어태비", "치즈", "삼색", "턱시도"], kind: true },
];

export function breedsByType(type) {
  return BREEDS.filter((breed) => breed.type === type);
}

export function findBreed(slug) {
  return BREEDS.find((breed) => breed.slug === slug);
}
