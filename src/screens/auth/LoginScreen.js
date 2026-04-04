import React, { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiLogin } from "../../api/client";
import { useInviteStore } from "../../store/inviteStore";
import BigButton from "../../components/BigButton";

export default function LoginScreen({ navigation }) {
  const setUser  = useInviteStore(s => s.setUser);
  const setToken = useInviteStore(s => s.setToken);

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) { Alert.alert("Required", "Enter email and password"); return; }
    setLoading(true);
    try {
      const { user, token } = await apiLogin(email.trim(), password);
      setUser(user);
      setToken(token);
      navigation.replace("MainTabs");
    } catch (e) {
      Alert.alert("Login failed", e.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.logo}>
            <Text style={styles.logoText}>Nimantran</Text>
            <Text style={styles.logoSub}>Sign in to save & access your invites</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input} value={email} onChangeText={setEmail}
              placeholder="you@example.com" placeholderTextColor="rgba(255,255,255,0.25)"
              keyboardType="email-address" autoCapitalize="none"
            />
            <Text style={[styles.label, { marginTop: 14 }]}>PASSWORD</Text>
            <TextInput
              style={styles.input} value={password} onChangeText={setPassword}
              placeholder="********" placeholderTextColor="rgba(255,255,255,0.25)"
              secureTextEntry
            />
            <View style={{ marginTop: 22 }}>
              <BigButton gradient={["#C77DFF","#7B2FBE"]} onPress={handleLogin} loading={loading}>
                Sign In
              </BigButton>
            </View>
            <TouchableOpacity style={styles.switchRow} onPress={() => navigation.navigate("Register")}>
              <Text style={styles.switchTxt}>Don't have an account? <Text style={styles.switchLink}>Sign Up</Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipRow} onPress={() => navigation.replace("MainTabs")}>
              <Text style={styles.skipTxt}>Continue without account {"\u2192"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { padding: 24, paddingBottom: 40 },
  logo:   { alignItems: "center", paddingVertical: 32 },
  logoText: { fontFamily: "PlayfairDisplay_900Black", fontSize: 36, color: "#C77DFF" },
  logoSub:  { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 6, textAlign: "center" },
  card:   { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 20 },
  label:  { fontFamily: "Poppins_700Bold", fontSize: 10, letterSpacing: 1.5, color: "#C77DFF", marginBottom: 6 },
  input:  { backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1.5, borderColor: "rgba(199,125,255,0.33)", borderRadius: 10, padding: 12, color: "#fff", fontSize: 14, fontFamily: "Poppins_400Regular" },
  switchRow: { alignItems: "center", marginTop: 20 },
  switchTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.4)", fontSize: 13 },
  switchLink: { color: "#C77DFF", fontFamily: "Poppins_600SemiBold" },
  skipRow: { alignItems: "center", marginTop: 10 },
  skipTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.2)", fontSize: 12 },
});
