// ═══════════════════════════════════════════════════════════════
// OtpScreen — 6 boxes, auto-fill on Android via SMS Retriever
// Auto-verifies via Firebase onAuthStateChanged when SMS arrives
// ═══════════════════════════════════════════════════════════════
import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { confirmOtp, sendOtp, onAutoVerify } from "../../lib/firebase";
import { apiVerifyPhone, apiGetMe } from "../../api/client";
import { useInviteStore } from "../../store/inviteStore";
import BigButton from "../../components/BigButton";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function OtpScreen({ navigation, route }) {
  const { phone, confirmation: initialConfirmation } = route.params || {};
  const [confirmation, setConfirmation] = useState(initialConfirmation);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoVerifying, setAutoVerifying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRef = useRef(null);

  const setUser = useInviteStore((s) => s.setUser);
  const setToken = useInviteStore((s) => s.setToken);

  // ── Resend countdown ────────────────────────────────
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  // ── Auto-verify (Android SMS Retriever) ─────────────
  useEffect(() => {
    const unsub = onAutoVerify(async (idToken) => {
      setAutoVerifying(true);
      await finishLogin(idToken);
    });
    return () => unsub && unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Auto-submit when 6 digits entered ───────────────
  useEffect(() => {
    if (code.length === OTP_LENGTH && !loading && !autoVerifying) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  async function finishLogin(firebaseIdToken) {
    try {
      // Exchange Firebase token for our backend session JWT
      const { user, token } = await apiVerifyPhone(firebaseIdToken);
      setToken(token);
      setUser(user);
      // First-time user has no name → ask
      if (!user.name) {
        navigation.replace("Name");
      } else {
        navigation.replace("MainTabs");
      }
    } catch (e) {
      console.log("verifyPhone backend error:", e);
      Alert.alert("Login failed", e.message || "Could not verify with server. Please try again.");
      setLoading(false);
      setAutoVerifying(false);
    }
  }

  async function handleVerify() {
    if (code.length !== OTP_LENGTH) return;
    if (!confirmation) {
      Alert.alert("Session expired", "Please request a new OTP.");
      return;
    }
    setLoading(true);
    try {
      const idToken = await confirmOtp(confirmation, code);
      await finishLogin(idToken);
    } catch (e) {
      console.log("confirmOtp error:", e);
      const msg = e?.message || "";
      if (/invalid-verification-code/i.test(msg) || /code is invalid/i.test(msg)) {
        Alert.alert("Wrong code", "The OTP you entered is incorrect. Please check and try again.");
      } else if (/expired/i.test(msg)) {
        Alert.alert("Code expired", "Please request a new OTP.");
      } else {
        Alert.alert("Verification failed", msg || "Please try again.");
      }
      setCode("");
      setLoading(false);
    }
  }

  async function handleResend() {
    if (secondsLeft > 0) return;
    setLoading(true);
    try {
      const newConfirmation = await sendOtp(phone);
      setConfirmation(newConfirmation);
      setSecondsLeft(RESEND_SECONDS);
      setCode("");
      Alert.alert("OTP sent", `A new code has been sent to ${phone}`);
    } catch (e) {
      Alert.alert("Could not resend", e.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Render OTP boxes ────────────────────────────────
  const boxes = Array.from({ length: OTP_LENGTH }).map((_, i) => {
    const char = code[i] || "";
    const isActive = code.length === i;
    return (
      <View key={i} style={[styles.box, isActive && styles.boxActive, char && styles.boxFilled]}>
        <Text style={styles.boxChar}>{char}</Text>
      </View>
    );
  });

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
        <View style={styles.container}>
          <View style={styles.headerBlock}>
            <Text style={styles.heading}>Verify your number</Text>
            <Text style={styles.subheading}>
              Enter the 6-digit code sent to{"\n"}
              <Text style={styles.phoneText}>{phone}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.editBtn}
            >
              <Text style={styles.editTxt}>✎  Change number</Text>
            </TouchableOpacity>
          </View>

          {/* OTP boxes */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.boxRow}
          >
            {boxes}
            {/* Hidden input that captures the actual code */}
            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={(t) => {
                const digits = t.replace(/\D/g, "").slice(0, OTP_LENGTH);
                setCode(digits);
              }}
              keyboardType="number-pad"
              maxLength={OTP_LENGTH}
              autoFocus
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              style={styles.hiddenInput}
            />
          </TouchableOpacity>

          {(loading || autoVerifying) && (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="#C77DFF" />
              <Text style={styles.loadingTxt}>
                {autoVerifying ? "Auto-verifying…" : "Verifying…"}
              </Text>
            </View>
          )}

          {/* Resend */}
          <View style={styles.resendRow}>
            {secondsLeft > 0 ? (
              <Text style={styles.resendWaiting}>
                Resend code in <Text style={styles.resendTimer}>{secondsLeft}s</Text>
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={loading}>
                <Text style={styles.resendActive}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ marginTop: 32 }}>
            <BigButton
              gradient={["#C77DFF", "#7B2FBE"]}
              onPress={handleVerify}
              loading={loading}
              disabled={code.length !== OTP_LENGTH}
            >
              Verify & Continue
            </BigButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: "#0C0C14" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  headerBlock: { alignItems: "center", marginBottom: 36 },
  heading: {
    fontFamily: "PlayfairDisplay_900Black",
    fontSize: 28,
    color: "#fff",
    marginBottom: 8,
  },
  subheading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    textAlign: "center",
    lineHeight: 20,
  },
  phoneText: { color: "#C77DFF", fontFamily: "Poppins_700Bold" },
  editBtn: { marginTop: 12, padding: 6 },
  editTxt: { fontFamily: "Poppins_600SemiBold", color: "rgba(199,125,255,0.85)", fontSize: 12 },
  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    position: "relative",
  },
  box: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(199,125,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
  boxActive: {
    borderColor: "#C77DFF",
    backgroundColor: "rgba(199,125,255,0.1)",
    shadowColor: "#C77DFF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  boxFilled: { borderColor: "rgba(199,125,255,0.6)" },
  boxChar: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#fff",
  },
  hiddenInput: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0,
    color: "transparent",
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loadingTxt: {
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginLeft: 8,
  },
  resendRow: { alignItems: "center", marginTop: 28 },
  resendWaiting: {
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
  },
  resendTimer: { color: "#C77DFF", fontFamily: "Poppins_700Bold" },
  resendActive: {
    fontFamily: "Poppins_700Bold",
    color: "#C77DFF",
    fontSize: 14,
  },
});
