export const LANGUAGES = [
  { code: "en", native: "English",    english: "English"    },
  { code: "hi", native: "\u0939\u093F\u0928\u094D\u0926\u0940",     english: "Hindi"      },
  { code: "mr", native: "\u092E\u0930\u093E\u0920\u0940",      english: "Marathi"    },
  { code: "ta", native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",      english: "Tamil"      },
  { code: "te", native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",     english: "Telugu"     },
  { code: "kn", native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",      english: "Kannada"   },
  { code: "ml", native: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",     english: "Malayalam"  },
  { code: "gu", native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",    english: "Gujarati"   },
  { code: "bn", native: "\u09AC\u09BE\u0982\u09B2\u09BE",      english: "Bengali"    },
  { code: "pa", native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",    english: "Punjabi"    },
  { code: "ur", native: "\u0627\u0631\u062F\u0648",       english: "Urdu"       },
  { code: "or", native: "\u0B13\u0B21\u0B3C\u0B3F\u0B06",     english: "Odia"       },
  { code: "ne", native: "\u0928\u0947\u092A\u093E\u0932\u0940",     english: "Nepali"     },
  { code: "si", native: "\u0DC3\u0DD2\u0D82\u0DC4\u0DBD",      english: "Sinhala"    },
  { code: "fr", native: "Fran\u00E7ais",   english: "French"     },
  { code: "es", native: "Espa\u00F1ol",    english: "Spanish"    },
  { code: "de", native: "Deutsch",    english: "German"     },
  { code: "ar", native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",    english: "Arabic"     },
  { code: "zh", native: "\u4E2D\u6587",        english: "Chinese"    },
  { code: "ja", native: "\u65E5\u672C\u8A9E",      english: "Japanese"   },
  { code: "pt", native: "Portugu\u00EAs",  english: "Portuguese" },
  { code: "ru", native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",    english: "Russian"    },
  { code: "ko", native: "\uD55C\uAD6D\uC5B4",     english: "Korean"     },
  { code: "it", native: "Italiano",   english: "Italian"    },
  { code: "tr", native: "T\u00FCrk\u00E7e",     english: "Turkish"    },
  { code: "th", native: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22",   english: "Thai"       },
  { code: "vi", native: "Ti\u1EBFng Vi\u1EC7t", english: "Vietnamese" },
  { code: "id", native: "Indonesia",  english: "Indonesian" },
];

export const INDIAN_CODES = ["hi","mr","ta","te","kn","ml","gu","bn","pa","ur","or","ne","si"];

export const INDIAN_LANGUAGES = LANGUAGES.filter(l => INDIAN_CODES.includes(l.code));
export const GLOBAL_LANGUAGES = LANGUAGES.filter(l => !INDIAN_CODES.includes(l.code));

export function findLanguage(code) {
  return LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
}
