import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function VibrantCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const glassStyle = { backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.25)", borderWidth: 1 };
  const guestDisplay = form.recipName || "";

  return (
    <LinearGradient colors={[occ.bg || "#0D0520", g1 + "55", g2 + "33"]} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {/* Header card */}
      <LinearGradient colors={[g1, g2]} style={styles.headerCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.headerEmojis}>{occ.icons.slice(0, 5).join("  ")}</Text>
        <Text style={styles.headerTitle}>{occ.name.toUpperCase()}</Text>
        <Text style={styles.headerSub}>{t.youreInvited}</Text>
      </LinearGradient>

      {/* Content */}
      <View style={styles.body}>
        {guestDisplay ? (
          <>
            <Text style={styles.guestName}>{t.dear} {guestDisplay}</Text>
            <LinearGradient colors={[g1, g2]} style={styles.guestLine} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />
          </>
        ) : null}

        <Text style={styles.bodyText}>{generatedText || ""}</Text>

        <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: g1 + "33" }]} />
          <Text style={[styles.dividerDot, { color: g1 }]}>◆</Text>
          <View style={[styles.dividerLine, { backgroundColor: g1 + "33" }]} />
        </View>

        {/* Date / Time / Venue in clean row */}
        <View style={styles.dtRow}>
          {[
            { emoji: "📅", label: t.date.toUpperCase(), value: formatDate(form.date) || "—" },
            { emoji: "⏰", label: t.time.toUpperCase(), value: formatTime(form.time) || "—" },
            { emoji: "📍", label: t.venue.toUpperCase(), value: form.location || "—" },
          ].map((item) => (
            <View key={item.label} style={[styles.glassCard, glassStyle]}>
              <Text style={styles.detailEmoji}>{item.emoji}</Text>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {form.note?.trim() ? (
          <Text style={styles.noteText}>"{form.note.trim()}"</Text>
        ) : null}
      </View>

      {/* Subtle emoji accent */}
      <Text style={styles.footerEmojis}>{occ.icons.slice(5, 9).join("   ")}</Text>

      {/* Clean footer */}
      <LinearGradient colors={[g1, g2]} style={styles.footer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.footerText}>Nimantran</Text>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: 18, overflow: "hidden", position: "relative" },
  headerCard: { paddingTop: 24, paddingBottom: 18, paddingHorizontal: 24, alignItems: "center", borderRadius: 0 },
  headerEmojis: { fontSize: 28, marginBottom: 8, letterSpacing: 4 },
  headerTitle: { fontFamily: "PlayfairDisplay_900Black", fontSize: 26, color: "#fff", textAlign: "center", letterSpacing: 2 },
  headerSub: { fontFamily: "Poppins_600SemiBold", fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: 2.5, marginTop: 4, textTransform: "uppercase" },
  body: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12, alignItems: "center", zIndex: 1 },
  guestName: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, color: "#fff", textAlign: "center", fontStyle: "italic" },
  guestLine: { width: 50, height: 2.5, borderRadius: 2, marginTop: 6, marginBottom: 14 },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(255,255,255,0.88)", textAlign: "center", lineHeight: 23, marginBottom: 12 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 14 },
  dividerRow: { flexDirection: "row", alignItems: "center", marginBottom: 14, width: "70%" },
  dividerLine: { flex: 1, height: 1 },
  dividerDot: { marginHorizontal: 10, fontSize: 8 },
  dtRow: { flexDirection: "row", gap: 8, width: "100%", marginBottom: 10 },
  glassCard: { flex: 1, borderRadius: 14, padding: 10, alignItems: "center" },
  detailEmoji: { fontSize: 16, marginBottom: 3 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 7, letterSpacing: 2, color: "rgba(255,255,255,0.5)" },
  detailValue: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "#fff", textAlign: "center", marginTop: 2 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 11, fontStyle: "italic", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: 8 },
  footerEmojis: { fontSize: 18, textAlign: "center", paddingVertical: 8, opacity: 0.6, letterSpacing: 4 },
  footer: { paddingVertical: 10, alignItems: "center" },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "rgba(255,255,255,0.85)", letterSpacing: 2 },
});
