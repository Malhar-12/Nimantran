import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function BigButton({ onPress, gradient, disabled, loading, children, style }) {
  const content = (
    <Text style={styles.label}>
      {loading ? <ActivityIndicator color="#fff" size="small" /> : children}
    </Text>
  );

  if (disabled || loading) {
    return (
      <TouchableOpacity disabled style={[styles.btn, styles.disabled, style]}>
        {content}
      </TouchableOpacity>
    );
  }

  if (gradient) {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.btnWrap, style]} activeOpacity={0.85}>
        <LinearGradient colors={gradient} style={styles.btn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]} activeOpacity={0.85}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnWrap: { borderRadius: 14 },
  btn: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  label: {
    color: "#fff",
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    letterSpacing: 0.3,
  },
});
