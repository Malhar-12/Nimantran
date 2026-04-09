import React, { useState } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, Alert,
} from "react-native";
import { INDIAN_LANGUAGES, GLOBAL_LANGUAGES, findLanguage } from "../constants/languages";
import { findOccasion } from "../constants/occasions";
import { fallbackText } from "../utils/formatters";
import { apiGenerate } from "../api/client";
import { useInviteStore } from "../store/inviteStore";
import { useT } from "../i18n";
import ProgressDots from "../components/ProgressDots";
import BigButton from "../components/BigButton";
import NimantranLoader from "../components/NimantranLoader";

export default function LanguagesScreen({ navigation }) {
  const T = useT();
  const occId          = useInviteStore(s => s.occasionId);
  const langCode       = useInviteStore(s => s.langCode);
  const form           = useInviteStore(s => s.form);
  const setLangCode    = useInviteStore(s => s.setLangCode);
  const setGenerated   = useInviteStore(s => s.setGeneratedText);
  const occ            = findOccasion(occId);
  const [g1, g2]       = occ.gradient;
  const lang           = findLanguage(langCode);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleGenerate() {
    setLoading(true);
    setProgress(0);
    const timer = setInterval(() => setProgress(p => Math.min(p + 7, 88)), 160);
    try {
      // Use AbortController for 45s timeout (Render free tier takes 30s to wake)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);

      const { text } = await apiGenerate({
        occasionName: occ.name,
        senderName: form.senderName,
        recipName: form.recipName,
        date: form.date,
        time: form.time,
        location: form.location,
        note: form.note,
        language: lang.english,
        promptHint: occ.promptHint || "",
      });
      clearTimeout(timeout);
      setGenerated(text || fallbackText(occ, form, langCode));
    } catch {
      // API failed — use translated fallback text
      setGenerated(fallbackText(occ, form, langCode));
    }
    clearInterval(timer);
    setProgress(100);
    setTimeout(() => { setLoading(false); navigation.navigate("Preview"); }, 400);
  }

  function LangBtn({ item }) {
    const sel = langCode === item.code;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.langBtn, { borderColor: sel ? g1 : "rgba(255,255,255,0.08)", backgroundColor: sel ? g1 + "22" : "rgba(255,255,255,0.03)" }]}
        onPress={() => setLangCode(item.code)}
      >
        <Text style={[styles.langNative, { color: sel ? g1 : "#fff" }]}>{item.native}</Text>
        <Text style={styles.langEnglish}>{item.english}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{"\u2190"} {T("back")}</Text>
        </TouchableOpacity>
        <View style={styles.headCenter}>
          <Text style={styles.emoji}>{"\u{1F310}"}</Text>
          <Text style={styles.title}>{T("chooseLangTitle")}</Text>
          <Text style={styles.sub}>{T("chooseLangSub")}</Text>
          <ProgressDots step={3} total={5} color={g1} />
        </View>
        <View style={styles.card}>
          <Text style={[styles.section, { color: g1 }]}>{T("indianLangs")}</Text>
          <View style={styles.langGrid}>
            {INDIAN_LANGUAGES.map(l => <LangBtn key={l.code} item={l} />)}
          </View>
          <Text style={[styles.section, { color: g1, marginTop: 16 }]}>{T("international")}</Text>
          <View style={styles.langGrid}>
            {GLOBAL_LANGUAGES.map(l => <LangBtn key={l.code} item={l} />)}
          </View>
          {loading ? (
            <View style={styles.progressWrap}>
              <NimantranLoader
                color={g1}
                label={`${T("writingIn")} ${lang.english}…`}
                sublabel={T("almostThere")}
              />
            </View>
          ) : (
            <View style={{ marginTop: 18 }}>
              <BigButton gradient={[g1, g2]} onPress={handleGenerate}>
                {occ.icons[0]} {T("generateIn")} {lang.english} {"\u2728"}
              </BigButton>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { padding: 16, paddingBottom: 40 },
  backBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", alignSelf: "flex-start", marginBottom: 14 },
  backTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.45)", fontSize: 11 },
  headCenter: { alignItems: "center", marginBottom: 14 },
  emoji: { fontSize: 30, marginBottom: 4 },
  title: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#fff" },
  sub:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 },
  card:  { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 16 },
  section: { fontFamily: "Poppins_700Bold", fontSize: 10, letterSpacing: 1.5, marginBottom: 10 },
  langGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  langBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 9, borderWidth: 1.5, minWidth: "46%" },
  langNative: { fontFamily: "Poppins_600SemiBold", fontSize: 13 },
  langEnglish: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.35)", fontSize: 10 },
  progressWrap: { alignItems: "center", paddingVertical: 16 },
  progressIcon: { fontSize: 32, marginBottom: 8 },
  progressLabel: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 10 },
  progressTrack: { width: "100%", height: 5, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" },
  progressFill:  { height: "100%", borderRadius: 3 },
});
