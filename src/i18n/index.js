// ═══════════════════════════════════════════════════════════════
// Nimantran UI translations — English + Hindi
// Add more languages here later (mr, ta, te, kn, gu, bn, pa, ...)
// Usage:
//   import { useT } from "../i18n";
//   const t = useT();
//   <Text>{t("save")}</Text>
// ═══════════════════════════════════════════════════════════════
import { useInviteStore } from "../store/inviteStore";

export const SUPPORTED_UI_LANGS = ["en", "hi"];

const STRINGS = {
  en: {
    // Home
    tagline: "SMART INVITATION MAKER",
    occasionsCount: "occasions",
    footerLine: "36+ occasions · 28 languages · 8 templates · Direct share 📲",
    create: "Create",
    myInvites: "My Invites",

    // Common
    back: "Back",
    cancel: "Cancel",
    confirm: "Confirm",
    retry: "Retry",
    optional: "(optional)",
    continue: "Continue",
    next: "Next",
    select: "Select",
    loading: "Loading…",
    sendingInvites: "Fetching your invites…",
    almostThere: "Almost there",

    // Occasions screen
    pickOccasion: "Pick your occasion",
    pleaseSelectOccasion: "Please select an occasion first!",

    // Form screen
    fillDetails: "Fill in the details",
    yourName: "YOUR NAME",
    yourNamePh: "e.g. Priya Sharma",
    guestName: "GUEST NAME",
    guestNamePh: "e.g. All Friends / Rahul",
    dateLabel: "DATE",
    timeLabel: "TIME",
    selectDate: "Select Date",
    selectTime: "Select Time",
    venue: "VENUE",
    venuePh: "e.g. Community Hall, Pune",
    specialNote: "SPECIAL NOTE",
    notePh: "e.g. Please bring sweets! Dress traditionally.",
    chooseTemplate: "Choose Template",
    enterName: "Please enter your name!",
    pickDate: "Please pick a date!",
    pickTime: "Please pick a time!",
    enterVenue: "Please enter a venue!",
    pickerDay: "Day",
    pickerMonth: "Month",
    pickerYear: "Year",
    pickerHour: "Hour",
    pickerMin: "Min",
    pickerPeriod: "Period",

    // Templates screen
    pickTemplate: "Pick a Template",
    premiumStyles: "8 premium styles",
    selected: "Selected",
    chooseLanguage: "Choose Language",

    // Languages screen
    chooseLangTitle: "Choose Language",
    chooseLangSub: "AI writes in your language",
    indianLangs: "🇮🇳 INDIAN LANGUAGES",
    international: "🌍 INTERNATIONAL",
    writingIn: "Writing in",
    generateIn: "Generate Card in",

    // Preview screen
    downloadCard: "Download Card to Gallery",
    downloadSub: "Saves as image in Nimantran folder",
    saving: "Saving…",
    savedToGallery: "Saved to Gallery!",
    shareCardImage: "Share Card as Image",
    shareCardSub: "WhatsApp, Instagram, Telegram & more",
    preparing: "Preparing…",
    shareText: "📝  Share Text → Any App",
    sendOnWhatsapp: "💬 SEND ON WHATSAPP",
    waNumberPh: "Number (optional)",
    sendWaBtn: "💬  Send on WhatsApp",
    waOpened: "✅ WhatsApp opened!",
    waNotFound: "WhatsApp not found",
    waInstall: "Please install WhatsApp to share directly.",
    saveToHistory: "🗂️  Save to My Invites",
    savedToHistory: "✅ Saved to History!",
    createAnother: "＋  Create Another Invite",
    madeWith: "Nimantran · Made with ❤️",

    // History screen
    myInvitesTitle: "My Invites 🗂️",
    saved: "saved",
    loadingInvites: "Loading your invites…\nFirst load can take up to a minute.",
    couldntLoad: "Couldn't load",
    noInvites: "No invites yet",
    createFirst: "Create your first invite to save it here.",
    createInvite: "Create Invite",
    deleteInvite: "Delete Invite",
    deleteConfirm: "Remove this invite from history?",
    delete: "Delete",
    couldntDelete: "Could not delete. Please try again.",
    fromLabel: "From:",
    toLabel: "To:",
  },

  hi: {
    // Home
    tagline: "स्मार्ट निमंत्रण निर्माता",
    occasionsCount: "अवसर",
    footerLine: "36+ अवसर · 28 भाषाएँ · 8 टेम्पलेट · सीधे शेयर करें 📲",
    create: "बनाएँ",
    myInvites: "मेरे निमंत्रण",

    // Common
    back: "वापस",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    retry: "पुनः प्रयास",
    optional: "(वैकल्पिक)",
    continue: "आगे बढ़ें",
    next: "अगला",
    select: "चुनें",
    loading: "लोड हो रहा है…",
    sendingInvites: "आपके निमंत्रण ला रहे हैं…",
    almostThere: "बस कुछ ही पल",

    // Occasions
    pickOccasion: "अपना अवसर चुनें",
    pleaseSelectOccasion: "कृपया पहले एक अवसर चुनें!",

    // Form
    fillDetails: "विवरण भरें",
    yourName: "आपका नाम",
    yourNamePh: "उदा. प्रिया शर्मा",
    guestName: "अतिथि का नाम",
    guestNamePh: "उदा. सभी मित्र / राहुल",
    dateLabel: "तारीख़",
    timeLabel: "समय",
    selectDate: "तारीख़ चुनें",
    selectTime: "समय चुनें",
    venue: "स्थान",
    venuePh: "उदा. सामुदायिक भवन, पुणे",
    specialNote: "विशेष टिप्पणी",
    notePh: "उदा. कृपया मिठाई लाएँ! पारंपरिक पोशाक पहनें।",
    chooseTemplate: "टेम्पलेट चुनें",
    enterName: "कृपया अपना नाम दर्ज करें!",
    pickDate: "कृपया तारीख़ चुनें!",
    pickTime: "कृपया समय चुनें!",
    enterVenue: "कृपया स्थान दर्ज करें!",
    pickerDay: "दिन",
    pickerMonth: "महीना",
    pickerYear: "वर्ष",
    pickerHour: "घंटा",
    pickerMin: "मिनट",
    pickerPeriod: "अवधि",

    // Templates
    pickTemplate: "टेम्पलेट चुनें",
    premiumStyles: "8 प्रीमियम शैलियाँ",
    selected: "चयनित",
    chooseLanguage: "भाषा चुनें",

    // Languages
    chooseLangTitle: "भाषा चुनें",
    chooseLangSub: "AI आपकी भाषा में लिखेगा",
    indianLangs: "🇮🇳 भारतीय भाषाएँ",
    international: "🌍 अंतर्राष्ट्रीय",
    writingIn: "इस भाषा में लिख रहे हैं:",
    generateIn: "इस भाषा में कार्ड बनाएँ:",

    // Preview
    downloadCard: "कार्ड को गैलरी में सेव करें",
    downloadSub: "Nimantran फ़ोल्डर में इमेज के रूप में सेव होगा",
    saving: "सेव हो रहा है…",
    savedToGallery: "गैलरी में सेव हो गया!",
    shareCardImage: "कार्ड को इमेज के रूप में भेजें",
    shareCardSub: "WhatsApp, Instagram, Telegram और अधिक",
    preparing: "तैयार हो रहा है…",
    shareText: "📝  टेक्स्ट के रूप में भेजें",
    sendOnWhatsapp: "💬 व्हाट्सऐप पर भेजें",
    waNumberPh: "नंबर (वैकल्पिक)",
    sendWaBtn: "💬  व्हाट्सऐप पर भेजें",
    waOpened: "✅ व्हाट्सऐप खुल गया!",
    waNotFound: "व्हाट्सऐप नहीं मिला",
    waInstall: "सीधे शेयर करने के लिए कृपया व्हाट्सऐप इंस्टॉल करें।",
    saveToHistory: "🗂️  मेरे निमंत्रण में सेव करें",
    savedToHistory: "✅ इतिहास में सेव हो गया!",
    createAnother: "＋  एक और निमंत्रण बनाएँ",
    madeWith: "निमंत्रण · प्यार से बनाया गया ❤️",

    // History
    myInvitesTitle: "मेरे निमंत्रण 🗂️",
    saved: "सेव किए गए",
    loadingInvites: "आपके निमंत्रण लोड हो रहे हैं…\nपहली बार लोड होने में एक मिनट लग सकता है।",
    couldntLoad: "लोड नहीं हो सका",
    noInvites: "अभी तक कोई निमंत्रण नहीं",
    createFirst: "अपना पहला निमंत्रण बनाएँ और यहाँ सेव करें।",
    createInvite: "निमंत्रण बनाएँ",
    deleteInvite: "निमंत्रण हटाएँ",
    deleteConfirm: "क्या इस निमंत्रण को इतिहास से हटाना है?",
    delete: "हटाएँ",
    couldntDelete: "हटा नहीं सका। कृपया पुनः प्रयास करें।",
    fromLabel: "की ओर से:",
    toLabel: "के लिए:",
  },
};

export function t(key, lang = "en") {
  return (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
}

/**
 * Hook: returns a t() function bound to the current UI language.
 * Components using this hook will re-render whenever uiLang changes.
 */
export function useT() {
  const uiLang = useInviteStore((s) => s.uiLang);
  return (key) => t(key, uiLang);
}
