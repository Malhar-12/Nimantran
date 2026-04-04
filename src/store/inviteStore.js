import { create } from "zustand";

export const useInviteStore = create((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  logout: () => set({ user: null, token: null }),

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
  },
  templateId: "luxe",
  langCode: "en",
  generatedText: "",

  setCategoryId: (id) => set({ categoryId: id }),
  setOccasionId: (id) => set({ occasionId: id }),
  setForm: (patch) => set((s) => ({ form: { ...s.form, ...patch } })),
  setTemplateId: (id) => set({ templateId: id }),
  setLangCode: (code) => set({ langCode: code }),
  setGeneratedText: (text) => set({ generatedText: text }),

  resetFlow: () =>
    set({
      categoryId: "",
      occasionId: "",
      form: { senderName: "", recipName: "", date: "", time: "", location: "", note: "", whatsapp: "" },
      templateId: "luxe",
      langCode: "en",
      generatedText: "",
    }),
}));
