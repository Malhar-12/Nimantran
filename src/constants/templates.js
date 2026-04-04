export const TEMPLATES = [
  {
    id: "luxe",
    name: "Luxe Gold",
    desc: "Dark & Elegant",
    preview: { bg: "#0D0D0D", text: "#C9A84C" },
  },
  {
    id: "modern",
    name: "Modern Bold",
    desc: "Clean & Minimal",
    preview: { bg: "#F0F0F0", text: "#111" },
  },
  {
    id: "floral",
    name: "Floral Garden",
    desc: "Soft & Pretty",
    preview: { bg: "#FDF6EE", text: "#2D1A00" },
  },
  {
    id: "vibrant",
    name: "Vibrant Fest",
    desc: "Colorful & Fun",
    preview: { bg: null, text: "#fff" },
  },
  {
    id: "royal",
    name: "Royal Crown",
    desc: "Majestic & Grand",
    preview: { bg: "#1A0A2E", text: "#E0C0FF" },
  },
  {
    id: "minimal",
    name: "Minimal White",
    desc: "Simple & Clean",
    preview: { bg: "#FFFFFF", text: "#1A1A1A" },
  },
  {
    id: "festive",
    name: "Festive Party",
    desc: "Bright & Cheerful",
    preview: { bg: "#FFF8E1", text: "#3D2000" },
  },
  {
    id: "elegant",
    name: "Elegant Classic",
    desc: "Refined & Graceful",
    preview: { bg: "#FAFAFA", text: "#333" },
  },
];

export function findTemplate(id) {
  return TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
}
