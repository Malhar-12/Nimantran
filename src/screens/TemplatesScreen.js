import React from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  SafeAreaView, StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TEMPLATES } from "../constants/templates";
import { findOccasion } from "../constants/occasions";
import { useInviteStore } from "../store/inviteStore";
import ProgressDots from "../components/ProgressDots";
import BigButton from "../components/BigButton";

export default function TemplatesScreen({ navigation }) {
  const occId       = useInviteStore(s => s.occasionId);
  const tmplId      = useInviteStore(s => s.templateId);
  const setTmplId   = useInviteStore(s => s.setTemplateId);
  const occ         = findOccasion(occId);
  const [g1, g2]    = occ.gradient;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <View style={styles.wrap}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{"\u2190"} Back</Text>
        </TouchableOpacity>
        <View style={styles.headCenter}>
          <Text style={styles.emoji}>{"\u{1F3A8}"}</Text>
          <Text style={styles.title}>Pick a Template</Text>
          <Text style={styles.sub}>8 premium styles</Text>
          <ProgressDots step={2} total={5} color={g1} />
        </View>
        <FlatList
          data={TEMPLATES}
          keyExtractor={t => t.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          renderItem={({ item: t }) => {
            const sel = tmplId === t.id;
            const previewBg = t.preview.bg || occ.bg || "#1A1A2E";
            return (
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.card, { borderColor: sel ? g1 : "rgba(255,255,255,0.1)", backgroundColor: sel ? g1 + "18" : "rgba(255,255,255,0.04)" }]}
                onPress={() => setTmplId(t.id)}
              >
                {(t.id === "vibrant" || t.id === "royal") ? (
                  <LinearGradient colors={t.id === "royal" ? [g1, "#1A0A2E"] : [g1, g2]} style={styles.preview} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={[styles.previewWord, { color: "#fff" }]}>{t.name.split(" ")[0]}</Text>
                  </LinearGradient>
                ) : t.id === "festive" ? (
                  <LinearGradient colors={["#FFF8E1", "#FFECB3"]} style={styles.preview} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={[styles.previewWord, { color: g1 }]}>{t.name.split(" ")[0]}</Text>
                  </LinearGradient>
                ) : (
                  <View style={[styles.preview, { backgroundColor: previewBg }]}>
                    <Text style={[styles.previewWord, { color: t.preview.text }]}>{t.name.split(" ")[0]}</Text>
                  </View>
                )}
                <Text style={[styles.tmplName, { color: sel ? g1 : "#fff" }]}>{t.name}</Text>
                <Text style={styles.tmplDesc}>{t.desc}</Text>
                {sel && <Text style={[styles.checkmark, { color: g1 }]}>{"\u2713"} Selected</Text>}
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.footer}>
          <BigButton gradient={[g1, g2]} onPress={() => navigation.navigate("Languages")}>
            Choose Language {"\u2192"}
          </BigButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: "#0C0C14" },
  wrap:  { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  backBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", alignSelf: "flex-start", marginBottom: 14 },
  backTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.45)", fontSize: 11 },
  headCenter: { alignItems: "center", marginBottom: 8 },
  emoji: { fontSize: 30, marginBottom: 4 },
  title: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#fff" },
  sub:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 },
  grid:  { gap: 8, paddingVertical: 4 },
  card:  { flex: 1, margin: 4, padding: 12, borderRadius: 16, borderWidth: 2, alignItems: "center" },
  preview: { width: "100%", height: 72, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  previewWord: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18 },
  tmplName: { fontFamily: "Poppins_700Bold", fontSize: 13 },
  tmplDesc: { fontFamily: "Poppins_400Regular", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 },
  checkmark:{ fontFamily: "Poppins_700Bold", fontSize: 10, marginTop: 4 },
  footer: { paddingVertical: 12 },
});
