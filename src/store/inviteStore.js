import { create } from "zustand";
import { getStoredToken, clearStoredToken, apiGetMe, apiGuestInit } from "../api/client";
import { setSecure, getSecure } from "../lib/secureStorage";

const UI_LANG_KEY = "@nimantran_ui_lang";

export const useInviteStore = create((set, get) => ({
  // ── UI Language (English / Hindi for now) ────────────
  uiLang: "en",
  setUiLang: async (lang) => {
    set({ uiLang: lang });
    try { await setSecure(UI_LANG_KEY, lang); } catch {}
  },
  toggleUiLang: async () => {
    const next = get().uiLang === "en" ? "hi" : "en";
    set({ uiLang: next });
    try { await setSecure(UI_LANG_KEY, next); } catch {}
  },

  // ── Auth ─────────────────────────────────────────────
  user: null,
  token: null,
  authChecked: false, // true once we've tried to load token from SecureStore

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),

  isLoggedIn: () => {
    const { user, token } = get();
    return !!(user && token);
  },

  isGuest: () => {
    const { user, token } = get();
    return !user && !token;
  },

  /** Run once on app boot. Loads token from SecureStore + fetches /auth/me. */
  hydrateAuth: async () => {
    try {
      const token = await getStoredToken();
      if (!token) {
        set({ authChecked: true });
        return;
      }
      set({ token });
      try {
        const { user } = await apiGetMe();
        set({ user, authChecked: true });
      } catch (e) {
        // Token invalid/expired — clear it, continue as guest
        await clearStoredToken();
        set({ user: null, token: null, authChecked: true });
      }
    } catch {
      set({ authChecked: true });
    }
  },

  /**
   * Guest-only mode boot. Gets (or mints) a device-scoped guest JWT so
   * Save/Share/Generate work without phone login. No PII collected.
   */
  ensureGuest: async () => {
    try {
      // Restore UI language preference
      try {
        const savedLang = await getSecure(UI_LANG_KEY);
        if (savedLang === "en" || savedLang === "hi") set({ uiLang: savedLang });
      } catch {}

      let token = await getStoredToken();
      if (!token) {
        try {
          const data = await apiGuestInit();
          token = data.token;
        } catch (e) {
          // Network down on first boot — let app run anyway, try again later
          set({ authChecked: true });
          return;
        }
      }
      set({ token, user: null, authChecked: true });
    } catch {
      set({ authChecked: true });
    }
  },

  logout: async () => {
    await clearStoredToken();
    set({ user: null, token: null });
  },

  // ── Invite flow state ───────────────────────────────
  categoryId: "",
  occasionId: "",
  form: {
    senderName: "",
    recipName: "",
    date: "",
    time: "",
    location: "",
    note: "",
    whatsapp: "",
    familyMembers: "",
    tithi: "",
  },
  templateId: "luxe",
  langCode: "en",
  tone: "heartfelt",
  generatedText: "",

  setCategoryId:    (id)    => set({ categoryId: id }),
  setOccasionId:    (id)    => set({ occasionId: id }),
  setForm:          (patch) => set((s) => ({ form: { ...s.form, ...patch } })),
  setTemplateId:    (id)    => set({ templateId: id }),
  setLangCode:      (code)  => set({ langCode: code }),
  setTone:          (tone)  => set({ tone }),
  setGeneratedText: (text)  => set({ generatedText: text }),

  resetFlow: () =>
    set({
      categoryId: "",
      occasionId: "",
      form: { senderName: "", recipName: "", date: "", time: "", location: "", note: "", whatsapp: "", familyMembers: "", tithi: "" },
      templateId: "luxe",
      langCode: "en",
      tone: "heartfelt",
      generatedText: "",
    }),
}));
