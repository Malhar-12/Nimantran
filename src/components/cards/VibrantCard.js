import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function VibrantCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const glassStyle = { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", borderWidth: 1 };
  const guestDisplay = form.recipName || "";

  return (
    <LinearGradient colors={[occ.bg || "#0D0520", g1 + "44", g2 + "22"]} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      {/* Scattered emoji background */}
      {occ.icons.slice(0, 6).map((e, i) => (
        <Text
          key={i}
          style={[styles.floatBg, {
            top: (i * 137 + 40) % 300,
            left: (i * 179 + 30) % 280,
            fontSize: 20 + (i % 4) * 4,
            opacity: 0.06 + (i % 3) * 0.02,
            transform: [{ rotate: `${i * 35}deg` }],
          }]}
        >{e}</Text>
      ))}

      {/* Header card */}
      <LinearGradient colors={[g1, g2]} style={styles.headerCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.headerEmojis}>{occ.icons.slice(0, 5).join(" ")}</Text>
        <Text style={styles.headerTitle}>{occ.name.toUpperCase()}</Text>
        <Text style={styles.headerSub}>{t.youreInvited} ✨</Text>
      </LinearGradient>

      {/* Content */}
      <View style={styles.body}>
        {/* Guest name on top */}
        {guestDisplay ? (
          <Text style={styles.guestName}>{t.dear} {guestDisplay},</Text>
        ) : null}

        <Text style={styles.bodyText}>{generatedText || ""}</Text>

        {/* Sender at bottom */}
        <Text style={[styles.senderName, { color: g2 }]}>— {form.senderName || "Your Name"}</Text>

        <LinearGradient colors={[g1, g2]} style={styles.accentBar} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} />

        {/* Date/Time */}
        <View style={styles.dtRow}>
          {[
            { emoji: "📅", label: t.date.toUpperCase(), value: formatDate(form.date) || "—" },
            { emoji: "⏰", label: t.time.toUpperCase(), value: formatTime(form.time) || "—" },
          ].map((item) => (
            <View key={item.label} style={[styles.glassCard, glassStyle]}>
              <Text style={styles.detailEmoji}>{item.emoji}</Text>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Venue */}
        <View style={[styles.venueCard, glassStyle]}>
          <Text style={styles.detailEmoji}>📍</Text>
          <Text style={styles.detailLabel}>{t.venue.toUpperCase()}</Text>
          <Text style={styles.detailValue}>{form.location || "—"}</Text>
        </View>

        {form.note ? (
          <Text style={styles.noteText}>"{form.note}"</Text>
        ) : null}
      </View>

      {/* Emoji footer band */}
      <LinearGradient colors={[g1 + "88", g2 + "88"]} style={styles.emojiBand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.emojiStrip}>{occ.icons.join(" ")}</Text>
      </LinearGradient>

      {/* Final footer */}
      <LinearGradient colors={[g1, g2]} style={styles.footer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.footerText}>{occ.icons[0]}  Nimantran  {occ.icons[0]}</Text>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: 16, overflow: "hidden", position: "relative" },
  floatBg: { position: "absolute", zIndex: 0 },
  headerCard: { paddingTop: 20, paddingBottom: 16, paddingHorizontal: 20, alignItems: "center", borderRadius: 20, margin: 12, marginBottom: 4 },
  headerEmojis: { fontSize: 26, marginBottom: 4 },
  headerTitle: { fontFamily: "PlayfairDisplay_900Black", fontSize: 24, color: "#fff", textAlign: "center", letterSpacing: 1 },
  headerSub: { fontFamily: "Poppins_600SemiBold", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 1.5, marginTop: 2 },
  body: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, alignItems: "center", zIndex: 1 },
  guestName: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 20, color: "#fff", textAlign: "center", marginBottom: 8, fontStyle: "italic" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(255,255,255,0.9)", textAlign: "center", lineHeight: 22, marginBottom: 8 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 10 },
  accentBar: { width: 200, height: 3, borderRadius: 2, marginBottom: 12 },
  dtRow: { flexDirection: "row", gap: 10, width: "100%", marginBottom: 8 },
  glassCard: { flex: 1, borderRadius: 14, padding: 10, alignItems: "center" },
  venueCard: { width: "100%", borderRadius: 14, padding: 10, alignItems: "center", marginBottom: 8 },
  detailEmoji: { fontSize: 18, marginBottom: 2 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 8, letterSpacing: 1.5, color: "rgba(255,255,255,0.55)" },
  detailValue: { fontFamily: "Poppins_700Bold", fontSize: 12, color: "#fff", textAlign: "center", marginTop: 2 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: 8 },
  emojiBand: { paddingVertical: 10, alignItems: "center" },
  emojiStrip: { fontSize: 16, textAlign: "center" },
  footer: { paddingVertical: 10, alignItems: "center" },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "rgba(255,255,255,0.9)" },
});
