// ═══════════════════════════════════════════════════════════════
// NameScreen — first-time user enters their name
// Shown only once, right after first phone verification
// ═══════════════════════════════════════════════════════════════
import React, { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { apiUpdateMe } from "../../api/client";
import { useInviteStore } from "../../store/inviteStore";
import BigButton from "../../components/BigButton";

export default function NameScreen({ navigation }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useInviteStore((s) => s.setUser);

  async function handleSave() {
    const trimmed = name.trim();
    if (trimmed.length < 1) {
      Alert.alert("Required", "Please enter your name");
      return;
    }
    if (trimmed.length > 50) {
      Alert.alert("Too long", "Please keep it under 50 characters");
      return;
    }
    setLoading(true);
    try {
      const { user } = await apiUpdateMe({ name: trimmed });
      setUser(user);
      navigation.replace("MainTabs");
    } catch (e) {
      Alert.alert("Could not save", e.message || "Please try again");
    } finally {
      setLoading(false);
    }
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
        <View style={styles.container}>
          <View style={styles.headerBlock}>
            <Text style={styles.emoji}>👋</Text>
            <Text style={styles.heading}>Welcome to Nimantran</Text>
            <Text style={styles.subheading}>What should we call you?</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>YOUR NAME</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Priya Sharma"
              placeholderTextColor="rgba(255,255,255,0.25)"
              autoFocus
              autoCapitalize="words"
              maxLength={50}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />

            <View style={{ marginTop: 22 }}>
              <BigButton
                gradient={["#C77DFF", "#7B2FBE"]}
                onPress={handleSave}
                loading={loading}
                disabled={!name.trim()}
              >
                Continue
              </BigButton>
            </View>

            <Text style={styles.hint}>
              We'll use this as your default sender name on invitations. You can change it anytime in Settings.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: "#0C0C14" },
  container: { flex: 1, padding: 24, justifyContent: "center" },
  headerBlock: { alignItems: "center", marginBottom: 32 },
  emoji: { fontSize: 56, marginBottom: 12 },
  heading: {
    fontFamily: "PlayfairDisplay_900Black",
    fontSize: 26,
    color: "#fff",
    marginBottom: 6,
  },
  subheading: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(199,125,255,0.18)",
    borderRadius: 24,
    padding: 22,
  },
  label: {
    fontFamily: "Poppins_700Bold",
    fontSize: 10,
    letterSpacing: 1.5,
    color: "#C77DFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1.5,
    borderColor: "rgba(199,125,255,0.35)",
    borderRadius: 14,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  hint: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    marginTop: 14,
    lineHeight: 16,
    textAlign: "center",
  },
});
