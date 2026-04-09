// ═══════════════════════════════════════════════════════════════
// PhoneScreen — enter phone number, send OTP via Firebase
// Premium dark + purple aesthetic, +91 prefix locked
// ═══════════════════════════════════════════════════════════════
import React, { useState, useRef } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { sendOtp } from "../../lib/firebase";
import BigButton from "../../components/BigButton";

export default function PhoneScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  function handlePhoneChange(text) {
    // Strip non-digits, max 10
    const digits = text.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  }

  async function handleSendOtp() {
    if (phone.length !== 10) {
      Alert.alert("Invalid number", "Please enter a 10-digit Indian mobile number");
      return;
    }
    if (!/^[6-9]/.test(phone)) {
      Alert.alert("Invalid number", "Indian mobile numbers start with 6, 7, 8 or 9");
      return;
    }
    setLoading(true);
    try {
      const e164 = `+91${phone}`;
      const confirmation = await sendOtp(e164);
      navigation.navigate("Otp", { phone: e164, confirmation });
    } catch (e) {
      console.log("sendOtp error:", e);
      const msg = e?.message || "Could not send OTP. Please try again.";
      if (/network/i.test(msg)) {
        Alert.alert("Network error", "Check your internet connection and try again.");
      } else if (/quota/i.test(msg) || /too-many/i.test(msg)) {
        Alert.alert("Too many attempts", "Please wait a few minutes and try again.");
      } else {
        Alert.alert("Could not send OTP", msg);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSkip() {
    navigation.replace("MainTabs");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#0C0C14", "#16101F", "#0C0C14"]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoBlock}>
            <Text style={styles.logoText}>Nimantran</Text>
            <View style={styles.divider}>
              <LinearGradient
                colors={["transparent", "#C77DFF", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, height: 1 }}
              />
            </View>
            <Text style={styles.logoSub}>निमंत्रण  •  Invitation Maker</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Enter your mobile number</Text>
            <Text style={styles.subheading}>
              We'll send you a 6-digit code to verify
            </Text>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.phoneRow}
              onPress={() => inputRef.current?.focus()}
            >
              <View style={styles.prefixBox}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.prefix}>+91</Text>
              </View>
              <TextInput
                ref={inputRef}
                style={styles.phoneInput}
                value={phone}
                onChangeText={handlePhoneChange}
                placeholder="98765 43210"
                placeholderTextColor="rgba(255,255,255,0.2)"
                keyboardType="number-pad"
                maxLength={10}
                autoFocus
              />
            </TouchableOpacity>

            <View style={{ marginTop: 24 }}>
              <BigButton
                gradient={["#C77DFF", "#7B2FBE"]}
                onPress={handleSendOtp}
                loading={loading}
                disabled={phone.length !== 10}
              >
                Send OTP
              </BigButton>
            </View>

            <View style={styles.legalRow}>
              <Text style={styles.legal}>
                By continuing, you agree to our{"\n"}
                <Text style={styles.legalLink}>Terms of Service</Text>
                {" "}and{" "}
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </Text>
            </View>
          </View>

          {/* Guest mode */}
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipTxt}>Continue as guest  →</Text>
          </TouchableOpacity>
          <Text style={styles.skipHint}>
            You can create invitations, but you'll need to sign in to save or share them
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { padding: 24, paddingBottom: 60, flexGrow: 1, justifyContent: "center" },
  logoBlock: { alignItems: "center", paddingVertical: 24, marginBottom: 12 },
  logoText: {
    fontFamily: "PlayfairDisplay_900Black",
    fontSize: 48,
    color: "#fff",
    letterSpacing: 0.5,
    textShadowColor: "rgba(199,125,255,0.4)",
    textShadowRadius: 18,
  },
  divider: { flexDirection: "row", width: 200, marginTop: 8, marginBottom: 6 },
  logoSub: {
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(199,125,255,0.18)",
    borderRadius: 24,
    padding: 22,
    shadowColor: "#C77DFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  heading: {
    fontFamily: "PlayfairDisplay_900Black",
    fontSize: 22,
    color: "#fff",
    marginBottom: 4,
  },
  subheading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 22,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(199,125,255,0.35)",
    borderRadius: 14,
    overflow: "hidden",
  },
  prefixBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: "rgba(199,125,255,0.25)",
  },
  flag: { fontSize: 18, marginRight: 6 },
  prefix: {
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    letterSpacing: 1.5,
  },
  legalRow: { marginTop: 18, alignItems: "center" },
  legal: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.35)",
    textAlign: "center",
    lineHeight: 16,
  },
  legalLink: { color: "#C77DFF", fontFamily: "Poppins_600SemiBold" },
  skipBtn: { alignSelf: "center", marginTop: 28, padding: 12 },
  skipTxt: {
    fontFamily: "Poppins_600SemiBold",
    color: "rgba(255,255,255,0.55)",
    fontSize: 14,
  },
  skipHint: {
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.3)",
    fontSize: 11,
    textAlign: "center",
    marginTop: 2,
    paddingHorizontal: 24,
  },
});
