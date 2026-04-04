import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function ElegantCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const guestDisplay = form.recipName || "";

  return (
    <View style={styles.root}>
      {/* Gradient border effect */}
      <LinearGradient
        colors={[g1, g2, g1]}
        style={styles.gradBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.inner}>
          {/* Top ornament */}
          <Text style={styles.ornament}>❧</Text>

          {/* Title section */}
          <Text style={[styles.title, { color: g1 }]}>{occ.name.toUpperCase()}</Text>
          <Text style={styles.subtitleLine}>— {t.invitation} —</Text>

          {/* Emoji row */}
          <Text style={styles.emojiRow}>{occ.icons.slice(0, 5).join("  ")}</Text>

          {/* Ornamental divider */}
          <View style={styles.ornDivider}>
            <View style={[styles.ornLine, { backgroundColor: g1 + "33" }]} />
            <Text style={[styles.ornDiamond, { color: g1 }]}>◆</Text>
            <View style={[styles.ornLine, { backgroundColor: g1 + "33" }]} />
          </View>

          {/* Guest */}
          {guestDisplay ? (
            <Text style={[styles.guestText, { color: g1 }]}>{t.dear} {guestDisplay},</Text>
          ) : null}

          {/* Body */}
          <Text style={styles.bodyText}>{generatedText || ""}</Text>

          {/* Sender */}
          <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

          {/* Ornamental divider */}
          <View style={styles.ornDivider}>
            <View style={[styles.ornLine, { backgroundColor: g1 + "22" }]} />
            <Text style={[styles.ornDiamond, { color: g1 + "55" }]}>◆</Text>
            <View style={[styles.ornLine, { backgroundColor: g1 + "22" }]} />
          </View>

          {/* Details — elegant horizontal layout */}
          <View style={[styles.detailsWrap, { borderColor: g1 + "22" }]}>
            <View style={styles.detailCol}>
              <Text style={styles.detailEmoji}>📅</Text>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.date}</Text>
              <Text style={styles.detailValue}>{formatDate(form.date) || "—"}</Text>
            </View>
            <View style={[styles.detailVLine, { backgroundColor: g1 + "22" }]} />
            <View style={styles.detailCol}>
              <Text style={styles.detailEmoji}>⏰</Text>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.time}</Text>
              <Text style={styles.detailValue}>{formatTime(form.time) || "—"}</Text>
            </View>
            <View style={[styles.detailVLine, { backgroundColor: g1 + "22" }]} />
            <View style={styles.detailCol}>
              <Text style={styles.detailEmoji}>📍</Text>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.venue}</Text>
              <Text style={styles.detailValue} numberOfLines={2}>{form.location || "—"}</Text>
            </View>
          </View>

          {form.note ? (
            <Text style={styles.noteText}>✒️ "{form.note}"</Text>
          ) : null}

          {/* Bottom ornament */}
          <Text style={styles.ornament}>❧</Text>

          {/* Footer */}
          <Text style={[styles.footerText, { color: g1 + "44" }]}>Nimantran</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: 16, overflow: "hidden" },
  gradBorder: { padding: 3, borderRadius: 16 },
  inner: { backgroundColor: "#FAFAFA", borderRadius: 14, padding: 20, alignItems: "center" },
  ornament: { fontSize: 20, color: "#999", marginVertical: 4 },
  title: { fontFamily: "PlayfairDisplay_900Black", fontSize: 24, letterSpacing: 2, textAlign: "center", marginTop: 2 },
  subtitleLine: { fontFamily: "Poppins_500Medium", fontSize: 11, color: "#999", letterSpacing: 2, marginBottom: 6 },
  emojiRow: { fontSize: 20, marginVertical: 6, textAlign: "center" },
  ornDivider: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 10 },
  ornLine: { flex: 1, height: 1 },
  ornDiamond: { fontSize: 8, marginHorizontal: 10 },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, fontStyle: "italic", marginBottom: 6, textAlign: "center" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "#444", textAlign: "center", lineHeight: 22, marginVertical: 6, paddingHorizontal: 4 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 4 },
  detailsWrap: { flexDirection: "row", width: "100%", borderWidth: 1, borderRadius: 12, padding: 12, marginVertical: 6 },
  detailCol: { flex: 1, alignItems: "center" },
  detailVLine: { width: 1, alignSelf: "stretch" },
  detailEmoji: { fontSize: 16, marginBottom: 2 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 8, letterSpacing: 1 },
  detailValue: { fontFamily: "Poppins_600SemiBold", fontSize: 11, color: "#222", textAlign: "center", marginTop: 2 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", color: "#777", textAlign: "center", marginTop: 8 },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 10, letterSpacing: 1.5, marginTop: 4 },
});
