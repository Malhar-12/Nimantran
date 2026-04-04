export const CATEGORIES = [
  {
    id: "festivals",
    label: "Indian Festivals",
    emoji: "\u{1FA94}",
    color: "#FF8C00",
    occasions: [
      { id: "diwali",    name: "Diwali",            gradient: ["#FF8C00","#FFD700"], icons: ["\u{1FA94}","\u2728","\u{1F386}","\u{1F338}","\u{1F64F}","\u{1F49B}","\u{1F387}","\u{1F31F}","\u{1F3EE}","\u{1F33A}"], bg: "#1C0800", promptHint: "Write a warm, spiritual Diwali invitation with blessings and festive positivity." },
      { id: "holi",      name: "Holi",              gradient: ["#F72585","#7209B7"], icons: ["\u{1F3A8}","\u{1F308}","\u{1F4A6}","\u{1F33A}","\u{1F973}","\u{1F3AD}","\u{1F49C}","\u{1F534}","\u{1F7E1}","\u{1F7E2}"], bg: "#150010", promptHint: "Write a joyful and vibrant Holi invitation full of colors, fun and celebration." },
      { id: "navratri",  name: "Navratri",          gradient: ["#FF006E","#FB5607"], icons: ["\u{1F483}","\u{1FA98}","\u{1F33A}","\u{1F531}","\u{1F3B6}","\u{1F319}","\u{1F9E1}","\u2728","\u{1F38A}","\u{1F64F}"], bg: "#1A0010", promptHint: "Write a devotional Navratri invitation with spiritual energy and celebration vibes." },
      { id: "ganesh",    name: "Ganesh Chaturthi",  gradient: ["#FF8C00","#FFD700"], icons: ["\u{1F64F}","\u{1F33A}","\u{1F36C}","\u{1F33C}","\u2728","\u{1F531}","\u{1F418}","\u{1F38A}","\u{1F49B}","\u{1F338}"], bg: "#1A0800", promptHint: "Write a respectful Ganesh Chaturthi invitation with blessings and devotion." },
      { id: "dussehra",  name: "Dussehra",          gradient: ["#7B2D8B","#E63946"], icons: ["\u{1F3F9}","\u{1F531}","\u{1F31F}","\u{1F64F}","\u2694\uFE0F","\u{1F3BA}","\u{1F33A}","\u{1F49C}","\u2728","\u{1F38A}"], bg: "#0A0015", promptHint: "Write a meaningful Dussehra invitation highlighting victory of good over evil." },
      { id: "pongal",    name: "Pongal",            gradient: ["#2D9D3A","#96D35F"], icons: ["\u{1F35A}","\u2600\uFE0F","\u{1F404}","\u{1F33E}","\u{1F33F}","\u{1F38A}","\u{1F33B}","\u{1F36F}","\u{1F38B}","\u{1F331}"], bg: "#001200", promptHint: "Write a traditional Pongal invitation with gratitude and harvest celebration tone." },
      { id: "onam",      name: "Onam",              gradient: ["#F4A00B","#E8440A"], icons: ["\u{1F338}","\u{1F33A}","\u{1F6F6}","\u{1F33E}","\u{1F38A}","\u2728","\u{1F33B}","\u{1F340}","\u{1F49B}","\u{1F64F}"], bg: "#1A0800", promptHint: "Write a cultural Onam invitation with joy, prosperity and festive warmth." },
      { id: "baisakhi",  name: "Baisakhi",          gradient: ["#FFD700","#FF6B00"], icons: ["\u{1F33E}","\u{1F49B}","\u{1F38A}","\u{1F941}","\u{1F338}","\u2600\uFE0F","\u{1F64F}","\u2728","\u{1F33B}","\u{1F389}"], bg: "#1A0800", promptHint: "Write an energetic Baisakhi invitation celebrating harvest and happiness." },
      { id: "rakhi",     name: "Raksha Bandhan",    gradient: ["#FF69B4","#FFD700"], icons: ["\u{1F9E1}","\u{1F380}","\u2728","\u{1F49B}","\u{1F338}","\u{1F64F}","\u{1F495}","\u{1F33A}","\u2B50","\u{1F38A}"], bg: "#1A0010", promptHint: "Write a cheerful Raksha Bandhan invitation celebrating sibling love and joy." },
      { id: "makar",     name: "Makar Sankranti",   gradient: ["#F4C430","#FF8C00"], icons: ["\u{1FA81}","\u2600\uFE0F","\u{1F33E}","\u2728","\u{1F38A}","\u{1F49B}","\u{1F324}\uFE0F","\u{1F38B}","\u{1F64F}","\u{1F338}"], bg: "#1A0A00", promptHint: "Write a festive Makar Sankranti invitation with positivity and celebration vibe." },
    ],
  },
  {
    id: "global",
    label: "Global Celebrations",
    emoji: "\u{1F30D}",
    color: "#4361EE",
    occasions: [
      { id: "eid",       name: "Eid Mubarak",      gradient: ["#0077B6","#48CAE4"], icons: ["\u{1F319}","\u2B50","\u{1F54C}","\u{1F339}","\u{1F932}","\u{1F381}","\u{1F49A}","\u2728","\u{1F31F}","\u{1F54A}\uFE0F"], bg: "#000D1A", promptHint: "Write a warm Eid invitation with blessings, gratitude and togetherness." },
      { id: "christmas", name: "Christmas",        gradient: ["#2D6A2D","#D62828"], icons: ["\u{1F384}","\u2B50","\u{1F381}","\u2744\uFE0F","\u{1F98C}","\u{1F514}","\u{1F936}","\u2603\uFE0F","\u{1F56F}\uFE0F","\u{1F9E7}"], bg: "#001200", promptHint: "Write a joyful Christmas invitation with festive cheer and warmth." },
      { id: "newyear",   name: "New Year",         gradient: ["#1A1A2E","#E94560"], icons: ["\u{1F386}","\u{1F942}","\u{1F389}","\u2728","\u{1F38A}","\u{1F31F}","\u{1F37E}","\u23F0","\u{1F4AB}","\u{1F387}"], bg: "#050010", promptHint: "Write an exciting New Year invitation with celebration and fresh beginnings." },
      { id: "valentine", name: "Valentine's Day",  gradient: ["#E63946","#FF8FA3"], icons: ["\u{1F495}","\u{1F339}","\u{1F496}","\u2764\uFE0F","\u{1F942}","\u{1F48C}","\u{1F49D}","\u{1F338}","\u2728","\u{1F4AB}"], bg: "#1A0008", promptHint: "Write a romantic Valentine's invitation with love and heartfelt emotions." },
      { id: "easter",    name: "Easter",           gradient: ["#96CEB4","#FFEAA7"], icons: ["\u{1F423}","\u{1F338}","\u{1F430}","\u{1F95A}","\u{1F337}","\u2728","\u{1F33F}","\u{1F49B}","\u{1F308}","\u{1F64F}"], bg: "#001A0A", promptHint: "Write a peaceful Easter invitation with hope, renewal and blessings." },
      { id: "halloween", name: "Halloween",        gradient: ["#FF6B00","#6B0000"], icons: ["\u{1F383}","\u{1F47B}","\u{1F577}\uFE0F","\u{1F987}","\u{1F319}","\u{1F480}","\u{1F578}\uFE0F","\u{1F5A4}","\u{1F36C}","\u26A1"], bg: "#0A0300", promptHint: "Write a fun and spooky Halloween party invitation with playful tone." },
    ],
  },
  {
    id: "life",
    label: "Life Events",
    emoji: "\u{1F382}",
    color: "#FF6B9D",
    occasions: [
      { id: "birthday",    name: "Birthday",          gradient: ["#FF6B9D","#FFD93D"], icons: ["\u{1F382}","\u{1F388}","\u{1F381}","\u{1F973}","\u{1F389}","\u{1F56F}\uFE0F","\u{1F380}","\u{1F370}","\u2728","\u{1F38A}"], bg: "#1A0010", promptHint: "Write a fun and lively birthday invitation with excitement and celebration." },
      { id: "wedding",     name: "Wedding",           gradient: ["#C9184A","#FF8FA3"], icons: ["\u{1F48D}","\u{1F339}","\u{1F54A}\uFE0F","\u{1F492}","\u{1F38A}","\u{1F495}","\u{1F470}","\u{1F935}","\u{1F338}","\u{1F490}"], bg: "#1A0008", promptHint: "Write an elegant wedding invitation with love, tradition and blessings." },
      { id: "anniversary", name: "Anniversary",       gradient: ["#E63946","#FF8FA3"], icons: ["\u{1F491}","\u{1F339}","\u{1F496}","\u{1F942}","\u{1F38A}","\u{1F48D}","\u2764\uFE0F","\u{1F338}","\u2728","\u{1F495}"], bg: "#1A0005", promptHint: "Write a romantic anniversary invitation celebrating love and togetherness." },
      { id: "babyshower",  name: "Baby Shower",       gradient: ["#48CAE4","#ADE8F4"], icons: ["\u{1F476}","\u{1F37C}","\u{1F499}","\u{1F338}","\u2B50","\u{1F380}","\u{1F423}","\u{1F308}","\u{1F4AB}","\u{1F38A}"], bg: "#001A1A", promptHint: "Write a cute and heartwarming baby shower invitation full of joy." },
      { id: "graduation",  name: "Graduation",        gradient: ["#4361EE","#7209B7"], icons: ["\u{1F393}","\u{1F4DC}","\u{1F3C6}","\u{1F389}","\u2B50","\u{1F4DA}","\u270F\uFE0F","\u{1F38A}","\u{1F4A1}","\u{1F31F}"], bg: "#000A1A", promptHint: "Write a proud graduation invitation celebrating achievement and success." },
      { id: "engagement",  name: "Engagement",        gradient: ["#FFD700","#FF69B4"], icons: ["\u{1F48D}","\u{1F495}","\u{1F942}","\u{1F339}","\u2728","\u{1F49B}","\u{1F38A}","\u{1F338}","\u{1F496}","\u2B50"], bg: "#1A1000", promptHint: "Write a romantic engagement invitation with love and happiness." },
      { id: "retirement",  name: "Retirement",        gradient: ["#457B9D","#A8DADC"], icons: ["\u{1F305}","\u{1F389}","\u{1F942}","\u{1F3D6}\uFE0F","\u{1F31F}","\u{1F44F}","\u{1F33A}","\u2708\uFE0F","\u26F5","\u{1F38A}"], bg: "#000A12", promptHint: "Write a warm retirement invitation honoring memories and new beginnings." },
      { id: "naming",      name: "Naming Ceremony",   gradient: ["#A8DADC","#FFE0AC"], icons: ["\u{1F476}","\u{1F338}","\u{1F64F}","\u2728","\u{1F49B}","\u{1F33A}","\u{1F38A}","\u2B50","\u{1F495}","\u{1F33C}"], bg: "#001518", promptHint: "Write a joyful naming ceremony invitation with family warmth." },
    ],
  },
  {
    id: "party",
    label: "Parties & Social",
    emoji: "\u{1F389}",
    color: "#C77DFF",
    occasions: [
      { id: "housewarming", name: "Housewarming",  gradient: ["#FF9A3C","#FF6B6B"], icons: ["\u{1F3E0}","\u{1F511}","\u{1F38A}","\u{1F942}","\u2728","\u{1F338}","\u{1F49B}","\u{1F389}","\u{1F31F}","\u{1F3E1}"], bg: "#1A0800", promptHint: "Write a warm housewarming invitation welcoming guests with joy." },
      { id: "kitty",        name: "Kitty Party",   gradient: ["#FF69B4","#C77DFF"], icons: ["\u{1F45B}","\u{1F484}","\u{1F338}","\u{1F942}","\u2728","\u{1F485}","\u{1F495}","\u{1F33A}","\u{1F48B}","\u{1F389}"], bg: "#1A0018", promptHint: "Write a fun kitty party invitation with playful and lively tone." },
      { id: "farewell",     name: "Farewell Party",gradient: ["#6A0572","#C77DFF"], icons: ["\u{1F44B}","\u{1F31F}","\u{1F490}","\u{1F942}","\u2728","\u{1F38A}","\u{1F495}","\u{1F338}","\u{1F4AB}","\u2764\uFE0F"], bg: "#0A0015", promptHint: "Write a cheerful farewell invitation celebrating memories and goodbyes." },
      { id: "poolparty",    name: "Pool Party",    gradient: ["#0096C7","#90E0EF"], icons: ["\u{1F3CA}","\u{1F30A}","\u2600\uFE0F","\u{1F379}","\u{1F389}","\u{1F459}","\u{1F3D6}\uFE0F","\u{1F4A6}","\u{1F334}","\u{1F38A}"], bg: "#000810", promptHint: "Write an exciting pool party invitation with fun and energetic vibe." },
      { id: "rooftop",      name: "Rooftop Party", gradient: ["#E94560","#1A1A2E"], icons: ["\u{1F303}","\u{1F942}","\u2728","\u{1F389}","\u{1F31F}","\u{1F3B6}","\u{1F4AB}","\u{1F37E}","\u{1F319}","\u{1F483}"], bg: "#05050F", promptHint: "Write a stylish rooftop party invitation with cool and lively tone." },
      { id: "potluck",      name: "Potluck Party", gradient: ["#F4A261","#E76F51"], icons: ["\u{1F372}","\u{1F958}","\u{1F37D}\uFE0F","\u{1F389}","\u{1F942}","\u2728","\u{1F35C}","\u{1F38A}","\u{1F60B}","\u{1F49B}"], bg: "#1A0800", promptHint: "Write a friendly potluck invitation encouraging sharing and fun." },
    ],
  },
  {
    id: "meetings",
    label: "Meetings & Events",
    emoji: "\u{1F4CB}",
    color: "#2EC4B6",
    occasions: [
      { id: "society",   name: "Society Meeting",  gradient: ["#2EC4B6","#CBF3F0"], icons: ["\u{1F3E2}","\u{1F4CB}","\u{1F91D}","\u2705","\u{1F4E2}","\u{1F465}","\u{1F4BC}","\u{1F4C5}","\u{1F514}","\u2728"], bg: "#001A18", promptHint: "Write a polite society meeting invitation with clear and respectful tone." },
      { id: "school",    name: "School Meeting",   gradient: ["#4361EE","#7209B7"], icons: ["\u{1F4DA}","\u{1F3EB}","\u270F\uFE0F","\u{1F468}\u200D\u{1F469}\u200D\u{1F467}","\u{1F4CB}","\u{1F514}","\u{1F392}","\u{1F4D0}","\u{1F4A1}","\u2B50"], bg: "#000A1A", promptHint: "Write a formal school meeting invitation with informative and polite tone." },
      { id: "pta",       name: "PTA Meeting",      gradient: ["#3A86FF","#8338EC"], icons: ["\u{1F468}\u200D\u{1F469}\u200D\u{1F467}","\u{1F4CB}","\u{1F3EB}","\u{1F91D}","\u{1F4E2}","\u2705","\u{1F4A1}","\u{1F4C5}","\u{1F514}","\u2728"], bg: "#000A1A", promptHint: "Write a respectful PTA meeting invitation focusing on collaboration." },
      { id: "agm",       name: "AGM / Committee",  gradient: ["#2D6A4F","#74C69D"], icons: ["\u{1F3DB}\uFE0F","\u{1F4CA}","\u{1F91D}","\u{1F4CB}","\u2705","\u{1F4BC}","\u{1F4E2}","\u{1F465}","\u{1F4C5}","\u2B50"], bg: "#001A0A", promptHint: "Write a professional AGM invitation with formal and structured tone." },
      { id: "corporate", name: "Corporate Event",  gradient: ["#023E8A","#48CAE4"], icons: ["\u{1F4BC}","\u{1F91D}","\u{1F3C6}","\u{1F4CA}","\u2728","\u{1F31F}","\u{1F3AF}","\u{1F4C5}","\u{1F514}","\u2B50"], bg: "#000812", promptHint: "Write a formal corporate event invitation with professionalism." },
      { id: "seminar",   name: "Seminar/Workshop", gradient: ["#7209B7","#4361EE"], icons: ["\u{1F3A4}","\u{1F4E2}","\u{1F4A1}","\u{1F4DA}","\u2728","\u{1F31F}","\u{1F91D}","\u{1F3AF}","\u{1F4CB}","\u2B50"], bg: "#080015", promptHint: "Write a professional seminar invitation with clear and informative tone." },
    ],
  },
  {
    id: "special",
    label: "Special & More",
    emoji: "\u2B50",
    color: "#F4C430",
    occasions: [
      { id: "pooja",      name: "Pooja / Prayer",   gradient: ["#FF8C00","#FFD700"], icons: ["\u{1F64F}","\u{1FA94}","\u{1F33A}","\u{1F338}","\u2728","\u{1F49B}","\u{1F33C}","\u{1F514}","\u{1F549}\uFE0F","\u2B50"], bg: "#1A0A00", promptHint: "Write a spiritual pooja invitation with blessings and devotion." },
      { id: "mehndi",     name: "Mehndi Ceremony",  gradient: ["#FF6B00","#FFD700"], icons: ["\u{1F33F}","\u{1F338}","\u{1F3A8}","\u{1F49B}","\u2728","\u{1F33A}","\u{1F495}","\u{1F9E1}","\u{1F33C}","\u{1F483}"], bg: "#1A0A00", promptHint: "Write a vibrant mehndi ceremony invitation with traditional and joyful tone." },
      { id: "mundan",     name: "Mundan Ceremony",  gradient: ["#FFD700","#FF8C00"], icons: ["\u2702\uFE0F","\u{1F64F}","\u{1F338}","\u{1F49B}","\u2728","\u{1F33A}","\u{1F38A}","\u2B50","\u{1F33C}","\u{1F495}"], bg: "#1A1000", promptHint: "Write a respectful mundan ceremony invitation with blessings." },
      { id: "fundraiser", name: "Fundraiser",       gradient: ["#2D9D3A","#96D35F"], icons: ["\u2764\uFE0F","\u{1F91D}","\u{1F31F}","\u{1F49B}","\u{1F38A}","\u2728","\u{1F4AA}","\u{1F30D}","\u2B50","\u{1F495}"], bg: "#001200", promptHint: "Write a professional fundraiser invitation encouraging support and purpose." },
      { id: "workanniv",  name: "Work Anniversary", gradient: ["#023E8A","#48CAE4"], icons: ["\u{1F3C6}","\u{1F4BC}","\u2B50","\u{1F38A}","\u2728","\u{1F91D}","\u{1F31F}","\u{1F3AF}","\u{1F4AB}","\u{1F389}"], bg: "#000812", promptHint: "Write a proud work anniversary invitation celebrating achievements." },
      { id: "other",      name: "Custom Event",     gradient: ["#6A0572","#C77DFF"], icons: ["\u2728","\u{1F38A}","\u{1F31F}","\u{1F388}","\u{1F4AB}","\u{1F64C}","\u{1F389}","\u{1F386}","\u{1F338}","\u{1F4A5}"], bg: "#0A0015", promptHint: "Write an invitation based on the event type and tone provided, keeping it natural and engaging." },
    ],
  },
];

export const ALL_OCCASIONS = CATEGORIES.flatMap(c => c.occasions);

export function findOccasion(id) {
  return ALL_OCCASIONS.find(o => o.id === id) || ALL_OCCASIONS[0];
}

export function findCategory(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
}
