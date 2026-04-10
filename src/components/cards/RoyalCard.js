import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate, formatTime } from "../../utils/formatters";

export default function RoyalCard({ occ, form, generatedText, t }) {
  const [g1, g2] = occ.gradient;
  const guestDisplay = form.recipName || "";

  return (
    <View style={styles.root}>
      {/* Royal border */}
      <View style={[styles.innerBorder, { borderColor: g1 + "55" }]}>
        {/* Crown header */}
        <View style={styles.crownRow}>
          <Text style={styles.crownEmoji}>👑</Text>
        </View>

        {/* Title banner */}
        <LinearGradient colors={[g1, g2]} style={styles.titleBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <Text style={styles.titleText}>{occ.name.toUpperCase()}</Text>
          <Text style={styles.subtitleText}>{t.invitation}</Text>
        </LinearGradient>

        {/* Decorative line */}
        <View style={styles.decoRow}>
          <View style={[styles.decoLine, { backgroundColor: g1 + "44" }]} />
          <Text style={styles.decoEmoji}>{occ.icons[0]}</Text>
          <View style={[styles.decoLine, { backgroundColor: g1 + "44" }]} />
        </View>

        {/* Emoji row */}
        <Text style={styles.emojiRow}>{occ.icons.slice(0, 5).join("  ")}</Text>

        {/* Guest name */}
        {guestDisplay ? (
          <Text style={[styles.guestText, { color: g1 }]}>{t.dear} {guestDisplay},</Text>
        ) : null}

        {/* Body */}
        <Text style={styles.bodyText}>{generatedText || ""}</Text>

        {/* Sender */}
        <Text style={[styles.senderName, { color: g1 }]}>— {form.senderName || "Your Name"}</Text>

        {/* Decorative divider */}
        <View style={styles.decoRow}>
          <View style={[styles.decoLine, { backgroundColor: g1 + "33" }]} />
          <Text style={styles.decoStar}>✦</Text>
          <View style={[styles.decoLine, { backgroundColor: g1 + "33" }]} />
        </View>

        {/* Details */}
        <View style={[styles.detailsCard, { backgroundColor: g1 + "0D", borderColor: g1 + "22" }]}>
          <View style={styles.detailRow}>
            <Text style={styles.detailEmoji}>📅</Text>
            <View>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.date}</Text>
              <Text style={styles.detailValue}>{formatDate(form.date) || "—"}</Text>
            </View>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: g1 + "22" }]} />
          <View style={styles.detailRow}>
            <Text style={styles.detailEmoji}>⏰</Text>
            <View>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.time}</Text>
              <Text style={styles.detailValue}>{formatTime(form.time) || "—"}</Text>
            </View>
          </View>
          <View style={[styles.detailDivider, { backgroundColor: g1 + "22" }]} />
          <View style={styles.detailRow}>
            <Text style={styles.detailEmoji}>📍</Text>
            <View>
              <Text style={[styles.detailLabel, { color: g1 }]}>{t.venue}</Text>
              <Text style={styles.detailValue}>{form.location || "—"}</Text>
            </View>
          </View>
        </View>

        {form.note?.trim() ? (
          <Text style={[styles.noteText, { color: g1 + "88" }]}>"{form.note.trim()}"</Text>
        ) : null}

        {/* Footer */}
        <View style={styles.footerRow}>
          <View style={[styles.footerLine, { backgroundColor: g1 + "33" }]} />
          <Text style={[styles.footerText, { color: g1 + "66" }]}>Nimantran</Text>
          <View style={[styles.footerLine, { backgroundColor: g1 + "33" }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: "#1A0A2E", borderRadius: 16, padding: 6 },
  innerBorder: { borderWidth: 2, borderRadius: 14, padding: 18, alignItems: "center", borderStyle: "solid" },
  crownRow: { marginBottom: 6 },
  crownEmoji: { fontSize: 28 },
  titleBanner: { borderRadius: 8, paddingHorizontal: 24, paddingVertical: 10, marginBottom: 8, alignItems: "center" },
  titleText: { fontFamily: "PlayfairDisplay_900Black", fontSize: 22, color: "#fff", letterSpacing: 2 },
  subtitleText: { fontFamily: "Poppins_500Medium", fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2 },
  decoRow: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 8 },
  decoLine: { flex: 1, height: 1 },
  decoEmoji: { fontSize: 18, marginHorizontal: 10 },
  decoStar: { fontSize: 12, color: "rgba(255,255,255,0.3)", marginHorizontal: 10 },
  emojiRow: { fontSize: 20, marginVertical: 6, textAlign: "center" },
  guestText: { fontFamily: "PlayfairDisplay_700Bold_Italic", fontSize: 18, fontStyle: "italic", marginTop: 4, marginBottom: 6, textAlign: "center" },
  bodyText: { fontFamily: "Poppins_500Medium", fontSize: 13, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 22, marginVertical: 8, paddingHorizontal: 4 },
  senderName: { fontFamily: "PlayfairDisplay_900Black", fontSize: 18, textAlign: "center", marginBottom: 6 },
  detailsCard: { width: "100%", borderWidth: 1, borderRadius: 12, padding: 14, marginVertical: 10 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 },
  detailEmoji: { fontSize: 18 },
  detailLabel: { fontFamily: "Poppins_700Bold", fontSize: 8, letterSpacing: 1.5 },
  detailValue: { fontFamily: "Poppins_600SemiBold", fontSize: 13, color: "#fff" },
  detailDivider: { height: 1, width: "100%", marginVertical: 6 },
  noteText: { fontFamily: "Poppins_500Medium", fontSize: 12, fontStyle: "italic", textAlign: "center", marginVertical: 6 },
  footerRow: { flexDirection: "row", alignItems: "center", width: "100%", marginTop: 8 },
  footerLine: { flex: 1, height: 1 },
  footerText: { fontFamily: "Poppins_700Bold", fontSize: 10, marginHorizontal: 10 },
});
