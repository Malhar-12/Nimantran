import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDate, formatTime } from "../../utils/formatters";

export default function MinimalCard({ occ, form, generatedText, t }) {
  const [g1] = occ.gradient;
  const guestDisplay = form.recipName || "";

  return (
    <View style={styles.root}>
      {/* Clean top bar */}
      <View style={[styles.topBar, { backgroundColor: g1 }]} />

      <View style={styles.content}>
        {/* Icon + Title */}
        <Text style={styles.mainEmoji}>{occ.icons[0]}</Text>
        <Text style={styles.title}>{occ.name}</Text>
        <Text style={[styles.invitedText, { color: g1 }]}>{t.youreInvited}</Text>

        {/* Thin line */}
        <View style={[styles.thinLine, { backgroundColor: g1 + "33" }]} />

        {/* Guest */}
        {guestDisplay ? (
          <Text style={styles.guestText}>{t.dear} {guestDisplay},</Text>
        ) : null}

        {/* Body */}
        <Text style={styles.bodyText}>{generatedText || ""}</Text>

        {/* Sender */}
        <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

        {/* Emoji accent */}
        <Text style={styles.emojiAccent}>{occ.icons.slice(1, 7).join("  ")}</Text>

        {/* Details - clean layout */}
        <View style={[styles.thinLine, { backgroundColor: g1 + "22" }]} />

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: g1 }]}>📅 {t.date}</Text>
            <Text style={styles.detailValue}>{formatDate(form.date) || "—"}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: g1 }]}>⏰ {t.time}</Text>
            <Text style={styles.detailValue}>{formatTime(form.time) || "—"}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={[styles.detailLabel, { color: g1 }]}>📍 {t.venue}</Text>
          <Text style={styles.detailValue}>{form.location || "—"}</Text>
        </View>

        {form.note?.trim() ? (
          <Text style={styles.noteText}>"{form.note.trim()}"</Text>
        ) : null}

        <View style={[styles.thinLine, { backgroundColor: g1 + "22" }]} />

        {/* Footer */}
        <Text style={styles.footerText}>Nimantran</Text>
      </View>

      {/* Clean bottom bar */}
      <View style={[styles.bottomBar, { backgroundColor: g1 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden" },
  topBar: { height: 6 },
  bottomBar: { height: 6 },
  content: { padding: 24, alignItems: "center" },
  mainEmoji: { fontSize: 36, marginBottom: 6 },
  title: { fontFamily: "PlayfairDisplay_900Black", fontSize: 24, color: "#1A1A1A", textAlign: "center" },
  invitedText: { fontFamily: "Poppins_600SemiBold", fontSize: 10, letterSpacing: 2.5, marginTop: 2, marginBottom: 8 },
  thinLine: { width: "100%", height: 1, marginVertical: 12 },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 17, fontStyle: "italic", color: "#333", marginBottom: 6, textAlign: "center" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#444", textAlign: "center", lineHeight: 22, marginVertical: 6, paddingHorizontal: 4 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 4 },
  detailsGrid: { flexDirection: "row", width: "100%", gap: 12, marginBottom: 8 },
  detailItem: { flex: 1, alignItems: "center", marginBottom: 4 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 9, letterSpacing: 1 },
  detailValue: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#1A1A1A", marginTop: 2, textAlign: "center" },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", color: "#888", textAlign: "center", marginTop: 8, marginBottom: 4 },
  emojiAccent: { fontSize: 18, marginVertical: 6, opacity: 0.65, letterSpacing: 4 },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 10, color: "#CCC", letterSpacing: 1.5, marginTop: 4 },
});
