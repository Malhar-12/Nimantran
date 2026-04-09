import React, { useEffect, useRef } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, StatusBar, SafeAreaView, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CATEGORIES } from "../constants/occasions";
import { useInviteStore } from "../store/inviteStore";
import { firebaseSignOut } from "../lib/firebase";

const HEADER_EMOJIS = ["\u{1FA94}","\u{1F382}","\u{1F389}","\u{1F4CB}","\u{1F30D}","\u2B50"];

export default function HomeScreen({ navigation }) {
  const setCategoryId = useInviteStore(s => s.setCategoryId);
  const resetFlow     = useInviteStore(s => s.resetFlow);
  const user          = useInviteStore(s => s.user);
  const logout        = useInviteStore(s => s.logout);
  const bounceAnims   = useRef(HEADER_EMOJIS.map(() => new Animated.Value(0))).current;

  function handleAccount() {
    if (!user) {
      navigation.navigate("Phone");
      return;
    }
    Alert.alert(
      user.name || "Account",
      `${user.phone}${user.tier === "free" ? "" : `\nTier: ${user.tier.toUpperCase()}`}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign out",
          style: "destructive",
          onPress: async () => {
            await logout();
            await firebaseSignOut();
          },
        },
      ]
    );
  }

  // First letter for the avatar circle
  const initial = (user?.name || "G").trim().charAt(0).toUpperCase();

  useEffect(() => {
    const anims = bounceAnims.map((val, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, { toValue: -6, duration: 600, delay: i * 100, useNativeDriver: true }),
          Animated.timing(val, { toValue: 0,  duration: 600, useNativeDriver: true }),
        ])
      )
    );
    anims.forEach(a => a.start());
    return () => anims.forEach(a => a.stop());
  }, []);

  function handleCategory(cat, idx) {
    resetFlow();
    setCategoryId(cat.id);
    navigation.navigate("Occasions", { catId: cat.id, catIdx: idx });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      {/* Top-right account button */}
      <TouchableOpacity
        onPress={handleAccount}
        activeOpacity={0.85}
        style={styles.accountBtn}
      >
        <LinearGradient
          colors={user ? ["#C77DFF", "#7B2FBE"] : ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.04)"]}
          style={styles.accountInner}
        >
          <Text style={[styles.accountInitial, !user && { color: "rgba(255,255,255,0.5)" }]}>
            {user ? initial : "↪"}
          </Text>
        </LinearGradient>
        {!user && <Text style={styles.accountLabel}>Sign in</Text>}
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.emojiRow}>
            {HEADER_EMOJIS.map((e, i) => (
              <Animated.Text key={i} style={[styles.headerEmoji, { transform: [{ translateY: bounceAnims[i] }] }]}>
                {e}
              </Animated.Text>
            ))}
          </View>
          <LinearGradient colors={["#C77DFF","#7B2FBE","#FF6B9D"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.titleGrad}>
            <Text style={styles.title}>Nimantran</Text>
          </LinearGradient>
          <Text style={styles.tagline}>SMART INVITATION MAKER {"\u2728"}</Text>
        </View>

        <View style={styles.catList}>
          {CATEGORIES.map((cat, ci) => (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              style={[styles.catCard, { borderColor: cat.color + "33", backgroundColor: cat.color + "0D" }]}
              onPress={() => handleCategory(cat, ci)}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <View style={styles.catInfo}>
                <Text style={[styles.catLabel, { color: cat.color }]}>{cat.label}</Text>
                <Text style={styles.catCount}>{cat.occasions.length} occasions</Text>
              </View>
              <Text style={styles.arrow}>{"\u203A"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.footer}>36+ occasions {"\u00B7"} 28 languages {"\u00B7"} 4 templates {"\u00B7"} Direct share {"\u{1F4F2}"}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { paddingHorizontal: 16, paddingBottom: 40 },
  header: { alignItems: "center", paddingVertical: 24 },
  emojiRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  headerEmoji: { fontSize: 22 },
  titleGrad:  { borderRadius: 4, paddingHorizontal: 2 },
  title: { fontFamily: "PlayfairDisplay_900Black", fontSize: 38, color: "#fff" },
  tagline: { fontFamily: "Poppins_500Medium", color: "rgba(200,150,255,0.4)", fontSize: 10, letterSpacing: 2.5, marginTop: 4 },
  catList: { gap: 10 },
  catCard: { flexDirection: "row", alignItems: "center", gap: 14, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 16, borderWidth: 1.5 },
  catEmoji: { fontSize: 28, width: 38, textAlign: "center" },
  catInfo:  { flex: 1 },
  catLabel: { fontFamily: "Poppins_700Bold", fontSize: 14 },
  catCount: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 },
  arrow:    { color: "rgba(255,255,255,0.2)", fontSize: 22 },
  footer:   { textAlign: "center", marginTop: 18, color: "rgba(255,255,255,0.12)", fontSize: 10, fontFamily: "Poppins_400Regular" },
  accountBtn: {
    position: "absolute",
    top: 50,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  accountInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(199,125,255,0.3)",
  },
  accountInitial: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#fff",
  },
  accountLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "rgba(255,255,255,0.55)",
    marginLeft: 8,
  },
});
