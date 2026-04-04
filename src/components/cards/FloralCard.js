import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function FloralCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const guestDisplay = form.recipName || "";

  return (
    <View style={styles.root}>
      {/* Header wave area */}
      <LinearGradient colors={[g1 + "dd", g2 + "dd"]} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.headerEmojis}>{occ.icons.slice(0, 5).join(" ")}</Text>
        <Text style={styles.headerTitle}>{occ.name.toUpperCase()}</Text>
      </LinearGradient>

      <View style={styles.body}>
        {/* Floating emojis row */}
        <Text style={styles.floatEmojis}>{occ.icons.slice(0, 7).join("  ")}</Text>

        {/* Guest name on top */}
        {guestDisplay ? (
          <Text style={[styles.guestText, { color: g1 }]}>{t.dear} {guestDisplay},</Text>
        ) : null}

        <View style={[styles.dashedLine, { borderColor: g1 + "66" }]} />

        <Text style={styles.bodyText}>{generatedText || ""}</Text>

        {/* Sender at bottom */}
        <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

        <View style={[styles.dashedLine, { borderColor: g1 + "44" }]} />

        {/* Date/Time row */}
        <View style={styles.dtRow}>
          {[
            { emoji: "📅", label: t.date.toUpperCase(), value: formatDate(form.date) || "—" },
            { emoji: "⏰", label: t.time.toUpperCase(), value: formatTime(form.time) || "—" },
          ].map((item) => (
            <View key={item.label} style={[styles.dtCard, { borderColor: g1 + "44", backgroundColor: g1 + "18" }]}>
              <Text style={styles.detailEmoji}>{item.emoji}</Text>
              <Text style={[styles.detailLabel, { color: g1 }]}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Venue */}
        <View style={[styles.venueCard, { borderColor: g1 + "44", backgroundColor: g1 + "18" }]}>
          <Text style={styles.detailEmoji}>📍</Text>
          <Text style={[styles.detailLabel, { color: g1 }]}>{t.venue.toUpperCase()}</Text>
          <Text style={styles.detailValue}>{form.location || "—"}</Text>
        </View>

        {form.note ? (
          <Text style={[styles.noteText, { color: g1 + "99" }]}>"{form.note}"</Text>
        ) : null}
      </View>

      {/* Footer wave */}
      <LinearGradient colors={[g1 + "cc", g2 + "cc"]} style={styles.footer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.emojiStrip}>{occ.icons.join(" ")}</Text>
        <Text style={styles.footerText}>Nimantran</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#FDF6EE", borderRadius: 16, overflow: "hidden" },
  header: { paddingTop: 20, paddingBottom: 24, paddingHorizontal: 20, alignItems: "center" },
  headerEmojis: { fontSize: 26, marginBottom: 4 },
  headerTitle: { fontFamily: "PlayfairDisplay_900Black", fontSize: 24, color: "#fff", textAlign: "center", letterSpacing: 1 },
  body: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 0, alignItems: "center" },
  floatEmojis: { fontSize: 15, textAlign: "center", marginBottom: 8, opacity: 0.6 },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, fontStyle: "italic", marginBottom: 6, textAlign: "center" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#3D2000", textAlign: "center", lineHeight: 22, marginBottom: 4 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 6 },
  dashedLine: { width: "85%", borderWidth: 1, borderStyle: "dashed", marginVertical: 10 },
  dtRow: { flexDirection: "row", gap: 10, width: "100%", marginBottom: 8 },
  dtCard: { flex: 1, borderWidth: 1.5, borderRadius: 12, padding: 10, alignItems: "center" },
  venueCard: { width: "100%", borderWidth: 1.5, borderRadius: 12, padding: 10, alignItems: "center", marginBottom: 8 },
  detailEmoji: { fontSize: 18, marginBottom: 2 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 8, letterSpacing: 1.5 },
  detailValue: { fontFamily: "Poppins_700Bold", fontSize: 12, color: "#2D1A00", textAlign: "center", marginTop: 2 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", textAlign: "center", marginBottom: 8 },
  footer: { paddingVertical: 12, alignItems: "center", marginTop: 8 },
  emojiStrip: { fontSize: 14, textAlign: "center", marginBottom: 4 },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "#fff" },
});
