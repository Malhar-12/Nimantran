import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function FestiveCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const guestDisplay = form.recipName || "";

  return (
    <LinearGradient
      colors={["#FFF8E1", "#FFF3E0", "#FFECB3"]}
      style={styles.root}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Big emoji header */}
      <View style={styles.headerWrap}>
        <Text style={styles.bigEmoji}>{occ.icons[0]}</Text>
        <LinearGradient colors={[g1, g2]} style={styles.titlePill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={styles.titleText}>{occ.name.toUpperCase()}</Text>
        </LinearGradient>
        <Text style={[styles.invitedBadge, { backgroundColor: g1 + "22", color: g1 }]}>{t.youreInvited}</Text>
      </View>

      {/* Emoji accent */}
      <Text style={styles.emojiAccent}>{occ.icons.slice(1, 6).join("   ")}</Text>

      {/* Guest */}
      {guestDisplay ? (
        <Text style={[styles.guestText, { color: g1 }]}>{t.dear} {guestDisplay}</Text>
      ) : null}

      {/* Divider */}
      <View style={[styles.dividerRow, { zIndex: 1 }]}>
        <View style={[styles.dividerLine, { backgroundColor: g1 + "33" }]} />
        <Text style={[styles.dividerDot, { color: g1 }]}>✦</Text>
        <View style={[styles.dividerLine, { backgroundColor: g1 + "33" }]} />
      </View>

      {/* Body */}
      <Text style={styles.bodyText}>{generatedText || ""}</Text>

      {/* Sender */}
      <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

      <View style={[styles.dividerRow, { zIndex: 1, marginHorizontal: 16 }]}>
        <View style={[styles.dividerLine, { backgroundColor: g1 + "22" }]} />
      </View>

      {/* Details boxes */}
      <View style={styles.detailsRow}>
        {[
          { emoji: "📅", label: t.date.toUpperCase(), value: formatDate(form.date) || "—" },
          { emoji: "⏰", label: t.time.toUpperCase(), value: formatTime(form.time) || "—" },
          { emoji: "📍", label: t.venue.toUpperCase(), value: form.location || "—" },
        ].map((item) => (
          <View key={item.label} style={[styles.detailBox, { borderColor: g1 + "44", backgroundColor: "#fff" }]}>
            <Text style={styles.detailEmoji}>{item.emoji}</Text>
            <Text style={[styles.detailLabel, { color: g1 }]}>{item.label}</Text>
            <Text style={styles.detailValue} numberOfLines={2}>{item.value}</Text>
          </View>
        ))}
      </View>

      {form.note?.trim() ? (
        <View style={[styles.noteBubble, { backgroundColor: g1 + "15", borderColor: g1 + "33" }]}>
          <Text style={[styles.noteText, { color: g1 }]}>💬 "{form.note.trim()}"</Text>
        </View>
      ) : null}

      {/* Footer */}
      {/* Footer emoji accent */}
      <Text style={styles.footerEmojis}>{occ.icons.slice(6, 9).join("   ")}</Text>

      <LinearGradient colors={[g1, g2]} style={styles.footer} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={styles.footerText}>Nimantran</Text>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: 16, overflow: "hidden", position: "relative" },
  dividerRow: { flexDirection: "row", alignItems: "center", width: "70%", alignSelf: "center", marginVertical: 6 },
  dividerLine: { flex: 1, height: 1 },
  dividerDot: { marginHorizontal: 10, fontSize: 8 },
  emojiAccent: { fontSize: 20, textAlign: "center", marginVertical: 6, zIndex: 1, opacity: 0.8, letterSpacing: 4 },
  footerEmojis: { fontSize: 16, textAlign: "center", marginTop: 6, opacity: 0.5, letterSpacing: 4 },
  headerWrap: { alignItems: "center", paddingTop: 20, paddingBottom: 4, zIndex: 1 },
  bigEmoji: { fontSize: 44, marginBottom: 4 },
  titlePill: { borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8, marginBottom: 6 },
  titleText: { fontFamily: "PlayfairDisplay_900Black", fontSize: 20, color: "#fff", letterSpacing: 1.5 },
  invitedBadge: { fontFamily: "Poppins_700Bold", fontSize: 11, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 3, overflow: "hidden", letterSpacing: 1 },
  emojiParade: { fontSize: 18, textAlign: "center", marginVertical: 6, zIndex: 1 },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, fontStyle: "italic", textAlign: "center", marginBottom: 2, zIndex: 1 },
  wavyLine: { fontSize: 8, textAlign: "center", marginVertical: 4 },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#3D2000", textAlign: "center", lineHeight: 22, marginVertical: 6, paddingHorizontal: 16, zIndex: 1 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 2, zIndex: 1 },
  detailsRow: { flexDirection: "row", gap: 6, paddingHorizontal: 12, marginVertical: 8, zIndex: 1 },
  detailBox: { flex: 1, borderWidth: 1.5, borderRadius: 12, padding: 8, alignItems: "center" },
  detailEmoji: { fontSize: 18, marginBottom: 2 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 7, letterSpacing: 1.5 },
  detailValue: { fontFamily: "Poppins_700Bold", fontSize: 10, color: "#2D1A00", textAlign: "center", marginTop: 2 },
  noteBubble: { marginHorizontal: 16, borderWidth: 1, borderRadius: 12, padding: 10, marginBottom: 8 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", textAlign: "center" },
  footer: { paddingVertical: 10, alignItems: "center" },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "#fff" },
});
