import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function LuxeCard({ occ, form, generatedText, t }) {
  const gold = "#C9A84C";
  const goldFade = "rgba(201,168,76,0.55)";
  const guestDisplay = form.recipName || "";

  return (
    <View style={styles.root}>
      {/* Corner decorations */}
      <Text style={[styles.corner, { top: 14, left: 14 }]}>✦</Text>
      <Text style={[styles.corner, { top: 14, right: 14 }]}>✦</Text>
      <Text style={[styles.corner, { bottom: 14, left: 14 }]}>✦</Text>
      <Text style={[styles.corner, { bottom: 14, right: 14 }]}>✦</Text>

      {/* Emoji strip header */}
      <Text style={styles.emojiRow}>{occ.icons.slice(0, 5).join(" ")}</Text>

      {/* Title */}
      <LinearGradient colors={[gold, "#F0D080", gold]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.titleGrad}>
        <Text style={styles.title}>{occ.name.toUpperCase()}</Text>
      </LinearGradient>

      <Text style={[styles.subtitle, { color: goldFade }]}>— {t.invitation} —</Text>

      <View style={styles.divider} />

      {/* Guest name on top */}
      {guestDisplay ? (
        <Text style={[styles.guestText, { color: "rgba(201,168,76,0.8)" }]}>
          {t.dear} {guestDisplay},
        </Text>
      ) : null}

      {/* Body text */}
      <Text style={styles.bodyText}>{generatedText || ""}</Text>

      {/* Sender at bottom */}
      <Text style={styles.senderName}>— {form.senderName || "Your Name"}</Text>

      {/* Details box */}
      <View style={styles.detailsBox}>
        <View style={styles.detailItem}>
          <Text style={styles.detailEmoji}>📅</Text>
          <Text style={[styles.detailLabel, { color: goldFade }]}>{t.date.toUpperCase()}</Text>
          <Text style={styles.detailValue}>{formatDate(form.date) || "—"}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailItem}>
          <Text style={styles.detailEmoji}>⏰</Text>
          <Text style={[styles.detailLabel, { color: goldFade }]}>{t.time.toUpperCase()}</Text>
          <Text style={styles.detailValue}>{formatTime(form.time) || "—"}</Text>
        </View>
        <View style={[styles.detailDivider, { width: "90%" }]} />
        <View style={styles.detailItem}>
          <Text style={styles.detailEmoji}>📍</Text>
          <Text style={[styles.detailLabel, { color: goldFade }]}>{t.venue.toUpperCase()}</Text>
          <Text style={styles.detailValue}>{form.location || "—"}</Text>
        </View>
      </View>

      {form.note ? (
        <Text style={[styles.noteText, { color: goldFade }]}>"{form.note}"</Text>
      ) : null}

      {/* Footer emojis */}
      <Text style={styles.emojiRow}>{occ.icons.join(" ")}</Text>

      {/* Footer */}
      <LinearGradient colors={["#0D0D0D", gold, gold, "#0D0D0D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.footer}>
        <Text style={styles.footerText}>✦  Nimantran  ✦</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#0D0D0D", borderWidth: 2, borderColor: "#C9A84C", borderRadius: 16, padding: 20, alignItems: "center", position: "relative" },
  corner: { position: "absolute", color: "#C9A84C", fontSize: 16, fontWeight: "700" },
  emojiRow: { fontSize: 22, marginVertical: 8, textAlign: "center" },
  titleGrad: { borderRadius: 4, paddingHorizontal: 8, marginBottom: 4 },
  title: { fontFamily: "PlayfairDisplay_900Black", fontSize: 26, color: "#C9A84C", textAlign: "center", letterSpacing: 1 },
  subtitle: { fontFamily: "Poppins_700Bold_Italic", fontSize: 13, marginBottom: 8, fontStyle: "italic" },
  divider: { width: "80%", height: 1, backgroundColor: "rgba(201,168,76,0.4)", marginVertical: 8 },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, fontStyle: "italic", marginTop: 4, marginBottom: 6, textAlign: "center" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#E0D5C5", textAlign: "center", lineHeight: 22, marginVertical: 8, paddingHorizontal: 8 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, color: "#C9A84C", textAlign: "center", marginBottom: 10 },
  detailsBox: { width: "100%", backgroundColor: "rgba(201,168,76,0.07)", borderWidth: 1, borderColor: "rgba(201,168,76,0.28)", borderRadius: 12, padding: 12, alignItems: "center", marginVertical: 10, gap: 6 },
  detailItem: { alignItems: "center" },
  detailEmoji: { fontSize: 18 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 9, letterSpacing: 1.5, marginTop: 2 },
  detailValue: { fontFamily: "Poppins_700Bold", fontSize: 13, color: "#fff", textAlign: "center" },
  detailDivider: { width: "60%", height: 1, backgroundColor: "rgba(201,168,76,0.2)", marginVertical: 4 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", textAlign: "center", marginVertical: 6 },
  footer: { width: "110%", paddingVertical: 10, alignItems: "center", borderBottomLeftRadius: 14, borderBottomRightRadius: 14, marginTop: 10, marginBottom: -20 },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 11, color: "#0D0D0D" },
});
