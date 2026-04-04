import React from "react";
import LuxeCard from "./cards/LuxeCard";
import ModernCard from "./cards/ModernCard";
import FloralCard from "./cards/FloralCard";
import VibrantCard from "./cards/VibrantCard";
import RoyalCard from "./cards/RoyalCard";
import MinimalCard from "./cards/MinimalCard";
import FestiveCard from "./cards/FestiveCard";
import ElegantCard from "./cards/ElegantCard";
import { getTranslation } from "../constants/translations";

export default function InviteCard({ occ, form, generatedText, templateId, langCode = "en" }) {
  const t = getTranslation(langCode);
  const props = { occ, form, generatedText, t };
  switch (templateId) {
    case "modern":  return <ModernCard {...props} />;
    case "floral":  return <FloralCard {...props} />;
    case "vibrant": return <VibrantCard {...props} />;
    case "royal":   return <RoyalCard {...props} />;
    case "minimal": return <MinimalCard {...props} />;
    case "festive": return <FestiveCard {...props} />;
    case "elegant": return <ElegantCard {...props} />;
    default:        return <LuxeCard {...props} />;
  }
}
