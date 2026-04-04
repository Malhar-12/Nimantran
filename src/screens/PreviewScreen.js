import React, { useState, useRef } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, TextInput, Share, Linking, Alert,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { findOccasion } from "../constants/occasions";
import { findTemplate } from "../constants/templates";
import { findLanguage } from "../constants/languages";
import { buildWhatsAppMessage } from "../utils/formatters";
import { apiSaveInvite } from "../api/client";
import { useInviteStore } from "../store/inviteStore";
import InviteCard from "../components/InviteCard";
import BigButton from "../components/BigButton";

export default function PreviewScreen({ navigation }) {
  const occId        = useInviteStore(s => s.occasionId);
  const tmplId       = useInviteStore(s => s.templateId);
  const langCode     = useInviteStore(s => s.langCode);
  const form         = useInviteStore(s => s.form);
  const genText      = useInviteStore(s => s.generatedText);
  const setForm      = useInviteStore(s => s.setForm);
  const resetFlow    = useInviteStore(s => s.resetFlow);

  const occ  = findOccasion(occId);
  const tmpl = findTemplate(tmplId);
  const lang = findLanguage(langCode);
  const [g1, g2] = occ.gradient;

  const [sharing,  setSharing]  = useState(false);
  const [waSent,   setWaSent]   = useState(false);
  const [dbSaved,  setDbSaved]  = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation for screenshot mode
  function startPulse() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.02, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }

  // Share using built-in Share API (formatted text)
  async function handleShare() {
    try {
      setSharing(true);
      const msg = buildWhatsAppMessage(occ, form, genText);
      await Share.share({
        title: `${occ.name} Invitation`,
        message: msg,
      });
    } catch (e) {
      // User cancelled or share failed
    } finally {
      setSharing(false);
    }
  }

  // Share on WhatsApp directly
  async function handleWhatsApp() {
    try {
      const msg = buildWhatsAppMessage(occ, form, genText);
      const ph = (form.whatsapp || "").replace(/\D/g, "");
      const url = ph
        ? `https://wa.me/91${ph}?text=${encodeURIComponent(msg)}`
        : `https://wa.me/?text=${encodeURIComponent(msg)}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
        setWaSent(true);
      } else {
        Alert.alert("WhatsApp not found", "Please install WhatsApp to share directly.");
      }
    } catch {
      Alert.alert("Error", "Could not open WhatsApp.");
    }
  }

  // Screenshot mode — hides all buttons, shows only card
  function handleScreenshotMode() {
    setScreenshotMode(true);
    startPulse();
  }

  function exitScreenshotMode() {
    pulseAnim.stopAnimation();
    pulseAnim.setValue(1);
    setScreenshotMode(false);
  }

  async function handleSaveToHistory() {
    try {
      await apiSaveInvite({
        occasionId: occ.id, occasionName: occ.name,
        senderName: form.senderName, recipName: form.recipName,
        eventDate: form.date, eventTime: form.time,
        location: form.location, note: form.note,
        language: langCode, templateId: tmplId,
        generatedText: genText,
      });
      setDbSaved(true);
      setTimeout(() => setDbSaved(false), 3000);
    } catch {
      Alert.alert("Not logged in", "Log in to save invites to your history.");
    }
  }

  // ─── SCREENSHOT MODE — Clean card view for taking screenshot ───
  if (screenshotMode) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
        <ScrollView contentContainerStyle={styles.screenshotScroll} showsVerticalScrollIndicator={false}>
          {/* Hint at top */}
          <Animated.View style={[styles.screenshotHint, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={styles.screenshotHintText}>📸 Take screenshot now!</Text>
            <Text style={styles.screenshotHintSub}>Press Power + Volume Down together</Text>
          </Animated.View>

          {/* Card — full width, clean, no borders */}
          <View style={styles.screenshotCard}>
            <InviteCard occ={occ} form={form} generatedText={genText} templateId={tmplId} langCode={langCode} />
          </View>

          {/* Exit button */}
          <TouchableOpacity style={[styles.exitBtn, { borderColor: g1 + "44" }]} onPress={exitScreenshotMode} activeOpacity={0.8}>
            <Text style={[styles.exitBtnTxt, { color: g1 }]}>✓ Done — Back to Preview</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ─── NORMAL PREVIEW MODE ───
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backTxt}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.topInfo}>{occ.name} · {tmpl.name} · {lang.english}</Text>
        </View>

        {/* Card preview */}
        <View style={[styles.cardWrap, { borderColor: g1 + "44", shadowColor: g1 }]}>
          <InviteCard occ={occ} form={form} generatedText={genText} templateId={tmplId} langCode={langCode} />
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>

          {/* Share as Image — MOST PROMINENT */}
          <TouchableOpacity
            style={[styles.imageShareBtn, { borderColor: g1 }]}
            onPress={handleScreenshotMode}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[g1 + "22", g1 + "08"]}
              style={styles.imageShareInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.imageShareEmoji}>📸</Text>
              <View style={styles.imageShareTextWrap}>
                <Text style={[styles.imageShareTitle, { color: g1 }]}>Share Card as Image</Text>
                <Text style={styles.imageShareSub}>Opens fullscreen → take screenshot → share anywhere!</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Share text to any app */}
          <BigButton gradient={[g1, g2]} onPress={handleShare} loading={sharing} style={styles.shadow}>
            📤  Share Text → Any App
          </BigButton>

          {/* WhatsApp direct share */}
          <View style={styles.waBox}>
            <Text style={styles.waTitle}>💬 SEND ON WHATSAPP</Text>
            <View style={styles.waRow}>
              <View style={styles.countryCode}><Text style={styles.countryTxt}>+91</Text></View>
              <TextInput
                style={styles.waInput} value={form.whatsapp} placeholderTextColor="rgba(255,255,255,0.25)"
                onChangeText={v => setForm({ whatsapp: v.replace(/[^\d+\s]/g, "") })}
                placeholder="Number (optional)" keyboardType="phone-pad" maxLength={15}
              />
            </View>
            <TouchableOpacity style={styles.waSendBtn} onPress={handleWhatsApp} activeOpacity={0.85}>
              <Text style={styles.waSendTxt}>💬  Send on WhatsApp</Text>
            </TouchableOpacity>
            {waSent && <Text style={styles.successMsg}>✅ WhatsApp opened!</Text>}
          </View>

          {/* Save to history */}
          <TouchableOpacity
            style={styles.ghostBtn} onPress={handleSaveToHistory} activeOpacity={0.8}
          >
            <Text style={[styles.ghostTxt, { color: dbSaved ? "#4ADE80" : "rgba(255,255,255,0.38)" }]}>
              {dbSaved ? "✅ Saved to History!" : "🗂️  Save to My Invites"}
            </Text>
          </TouchableOpacity>

          {/* Create another */}
          <TouchableOpacity
            style={styles.ghostBtn}
            onPress={() => { resetFlow(); navigation.navigate("Home"); }}
            activeOpacity={0.8}
          >
            <Text style={styles.ghostTxt}>＋  Create Another Invite</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Nimantran · Made with ❤️</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { padding: 16, paddingBottom: 50 },
  topBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  backBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)" },
  backTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.45)", fontSize: 11 },
  topInfo: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.22)", fontSize: 10 },
  cardWrap: { borderRadius: 16, overflow: "hidden", borderWidth: 2, marginBottom: 18, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
  actions: { gap: 10 },
  shadow:  { shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },

  // Image share button — prominent
  imageShareBtn: { borderWidth: 2, borderRadius: 16, overflow: "hidden" },
  imageShareInner: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  imageShareEmoji: { fontSize: 32 },
  imageShareTextWrap: { flex: 1 },
  imageShareTitle: { fontFamily: "Poppins_700Bold", fontSize: 15 },
  imageShareSub: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 },

  // WhatsApp section
  waBox: { backgroundColor: "rgba(37,211,102,0.06)", borderWidth: 1.5, borderColor: "rgba(37,211,102,0.18)", borderRadius: 14, padding: 13 },
  waTitle: { fontFamily: "Poppins_700Bold", fontSize: 10, color: "#25D366", letterSpacing: 1.2, marginBottom: 9 },
  waRow:   { flexDirection: "row", gap: 8, marginBottom: 9 },
  countryCode: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 8, paddingHorizontal: 12, justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  countryTxt:  { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.38)", fontSize: 13 },
  waInput: { flex: 1, backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1.5, borderColor: "rgba(255,255,255,0.14)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, color: "#fff", fontSize: 13, fontFamily: "Poppins_400Regular" },
  waSendBtn: { borderRadius: 12, paddingVertical: 12, backgroundColor: "#25D366", alignItems: "center" },
  waSendTxt: { fontFamily: "Poppins_700Bold", fontSize: 13, color: "#fff" },
  successMsg:{ textAlign: "center", color: "#4ADE80", fontSize: 11, fontFamily: "Poppins_400Regular", marginTop: 6 },
  ghostBtn:   { borderWidth: 1.5, borderRadius: 12, borderColor: "rgba(255,255,255,0.08)", paddingVertical: 11, alignItems: "center", backgroundColor: "rgba(255,255,255,0.04)" },
  ghostTxt:   { fontFamily: "Poppins_600SemiBold", fontSize: 12, color: "rgba(255,255,255,0.3)" },
  footer:     { textAlign: "center", marginTop: 16, color: "rgba(255,255,255,0.08)", fontSize: 9, fontFamily: "Poppins_400Regular" },

  // Screenshot mode
  screenshotScroll: { padding: 0, paddingBottom: 20 },
  screenshotHint: { backgroundColor: "rgba(74,222,128,0.1)", borderBottomWidth: 1, borderColor: "rgba(74,222,128,0.2)", paddingVertical: 12, alignItems: "center" },
  screenshotHintText: { fontFamily: "Poppins_700Bold", fontSize: 16, color: "#4ADE80" },
  screenshotHintSub: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(74,222,128,0.6)", marginTop: 2 },
  screenshotCard: { marginHorizontal: 0, marginVertical: 0 },
  exitBtn: { marginHorizontal: 20, marginTop: 16, borderWidth: 1.5, borderRadius: 12, paddingVertical: 12, alignItems: "center", backgroundColor: "rgba(255,255,255,0.04)" },
  exitBtnTxt: { fontFamily: "Poppins_700Bold", fontSize: 14 },
});
