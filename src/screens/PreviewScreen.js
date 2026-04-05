import React, { useState, useRef } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, TextInput, Share, Linking, Alert,
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

  const [sharing,    setSharing]    = useState(false);
  const [waSent,     setWaSent]     = useState(false);
  const [dbSaved,    setDbSaved]    = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [saved,      setSaved]      = useState(false);
  const cardRef = useRef(null);

  // ─── Capture card as image and save to gallery ───
  async function handleDownloadToGallery() {
    try {
      setSaving(true);

      // Dynamic imports — safe if packages not available
      let MediaLibrary, captureRef;
      try {
        MediaLibrary = require("expo-media-library");
        captureRef = require("react-native-view-shot").captureRef;
      } catch {
        setSaving(false);
        Alert.alert("📸 Save Your Card", "Take a screenshot to save the card!\n\nPress Power + Volume Down buttons together.", [{ text: "Got it!" }]);
        return;
      }

      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Needed",
          "Please allow Nimantran to save images to your gallery.",
          [{ text: "OK" }]
        );
        setSaving(false);
        return;
      }

      // Capture the card view as PNG
      const uri = await captureRef(cardRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      // Save to gallery
      const asset = await MediaLibrary.createAssetAsync(uri);

      // Try to create/find Nimantran album
      try {
        const album = await MediaLibrary.getAlbumAsync("Nimantran");
        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        } else {
          await MediaLibrary.createAlbumAsync("Nimantran", asset, false);
        }
      } catch {
        // Album creation may fail on some devices, image is still saved to gallery
      }

      setSaved(true);
      setSaving(false);
      Alert.alert(
        "✅ Saved!",
        "Card saved to your gallery in 'Nimantran' folder. You can now share it from your gallery!",
        [{ text: "Great!" }]
      );
      setTimeout(() => setSaved(false), 4000);
    } catch (e) {
      console.log("Save error:", e);
      setSaving(false);
      // Fallback: suggest screenshot
      Alert.alert(
        "📸 Save Your Card",
        "Take a screenshot to save the card!\n\nPress Power + Volume Down buttons together.",
        [{ text: "Got it!" }]
      );
    }
  }

  // ─── Capture card and share as image ───
  async function handleShareImage() {
    try {
      setSharing(true);

      // Dynamic imports — safe if packages not available
      let Sharing, captureRef;
      try {
        Sharing = require("expo-sharing");
        captureRef = require("react-native-view-shot").captureRef;
      } catch {
        setSharing(false);
        // Fallback to text share
        const msg = buildWhatsAppMessage(occ, form, genText);
        await Share.share({ title: `${occ.name} Invitation`, message: msg });
        return;
      }

      // Capture the card as image
      const uri = await captureRef(cardRef, {
        format: "png",
        quality: 1,
        result: "tmpfile",
      });

      // Check if sharing is available on this device
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: `${occ.name} Invitation - Nimantran`,
        });
      } else {
        // Sharing not available — fallback to text
        Alert.alert(
          "Sharing not available",
          "Image sharing is not supported on this device. You can download the card and share from gallery instead.",
          [{ text: "OK" }]
        );
      }
    } catch (e) {
      console.log("Share image error:", e);
      // Fallback to text share if image sharing fails
      try {
        const msg = buildWhatsAppMessage(occ, form, genText);
        await Share.share({ title: `${occ.name} Invitation`, message: msg });
      } catch {
        // User cancelled
      }
    } finally {
      setSharing(false);
    }
  }

  // Share formatted text
  async function handleShareText() {
    try {
      const msg = buildWhatsAppMessage(occ, form, genText);
      await Share.share({
        title: `${occ.name} Invitation`,
        message: msg,
      });
    } catch {
      // User cancelled
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

        {/* Card preview — wrapped in ref for capture */}
        <View style={[styles.cardOuter, { borderColor: g1 + "44", shadowColor: g1 }]}>
          <View
            ref={cardRef}
            collapsable={false}
            style={styles.cardCapture}
          >
            <InviteCard occ={occ} form={form} generatedText={genText} templateId={tmplId} langCode={langCode} />
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>

          {/* Download to Gallery — MOST PROMINENT */}
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: "#4ADE80" }]}
            onPress={handleDownloadToGallery}
            activeOpacity={0.85}
            disabled={saving}
          >
            <LinearGradient
              colors={["rgba(74,222,128,0.15)", "rgba(74,222,128,0.05)"]}
              style={styles.actionInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.actionEmoji}>{saving ? "⏳" : saved ? "✅" : "💾"}</Text>
              <View style={styles.actionTextWrap}>
                <Text style={[styles.actionTitle, { color: "#4ADE80" }]}>
                  {saving ? "Saving..." : saved ? "Saved to Gallery!" : "Download Card to Gallery"}
                </Text>
                <Text style={styles.actionSub}>Saves as image in Nimantran folder</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Share Card as Image */}
          <TouchableOpacity
            style={[styles.actionCard, { borderColor: g1 }]}
            onPress={handleShareImage}
            activeOpacity={0.85}
            disabled={sharing}
          >
            <LinearGradient
              colors={[g1 + "22", g1 + "08"]}
              style={styles.actionInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.actionEmoji}>{sharing ? "⏳" : "📤"}</Text>
              <View style={styles.actionTextWrap}>
                <Text style={[styles.actionTitle, { color: g1 }]}>
                  {sharing ? "Preparing..." : "Share Card as Image"}
                </Text>
                <Text style={styles.actionSub}>WhatsApp, Instagram, Telegram & more</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Share text */}
          <BigButton gradient={[g1, g2]} onPress={handleShareText} style={styles.shadow}>
            📝  Share Text → Any App
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

  // Card — outer border for display, inner clean for capture
  cardOuter: { borderRadius: 16, overflow: "hidden", borderWidth: 2, marginBottom: 18, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
  cardCapture: { borderRadius: 14, overflow: "hidden" },

  actions: { gap: 10 },
  shadow:  { shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },

  // Action buttons (download / share image)
  actionCard: { borderWidth: 2, borderRadius: 16, overflow: "hidden" },
  actionInner: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  actionEmoji: { fontSize: 30 },
  actionTextWrap: { flex: 1 },
  actionTitle: { fontFamily: "Poppins_700Bold", fontSize: 15 },
  actionSub: { fontFamily: "Poppins_400Regular", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 },

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
});
