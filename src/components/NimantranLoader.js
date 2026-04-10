// ═══════════════════════════════════════════════════════════════
// NimantranLoader — flying pigeon carrying an invitation envelope
// On-brand loading indicator. Replaces ActivityIndicator.
// Usage: <NimantranLoader label="Loading..." />
// ═══════════════════════════════════════════════════════════════
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

const TRACK_WIDTH = 220;

export default function NimantranLoader({ label, sublabel, color = "#C77DFF" }) {
  const fly = useRef(new Animated.Value(0)).current;   // 0 → 1 horizontal travel
  const bob = useRef(new Animated.Value(0)).current;   // gentle vertical bob
  const dotPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Horizontal flight loop
    Animated.loop(
      Animated.timing(fly, {
        toValue: 1,
        duration: 2400,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Vertical bob (wing flap feel)
    Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: -4, duration: 300, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(bob, { toValue:  0, duration: 300, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    // Dotted path subtle pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, { toValue: 1, duration: 1200, useNativeDriver: true }),
        Animated.timing(dotPulse, { toValue: 0, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, [fly, bob, dotPulse]);

  // Pigeon travels from -10 to TRACK_WIDTH-30
  const translateX = fly.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, TRACK_WIDTH - 30],
  });

  // Tiny scale pop at start of each loop so it feels alive
  const scale = fly.interpolate({
    inputRange: [0, 0.05, 0.95, 1],
    outputRange: [0.7, 1, 1, 0.7],
  });

  const dotsOpacity = dotPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.15, 0.4],
  });

  // 14 dots evenly across the track
  const dots = Array.from({ length: 14 });

  return (
    <View style={styles.wrap}>
      <View style={[styles.track, { width: TRACK_WIDTH }]}>
        {/* Dotted flight path */}
        <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
          {dots.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: color }]} />
          ))}
        </Animated.View>

        {/* Pigeon + envelope */}
        <Animated.View
          style={[
            styles.pigeon,
            { transform: [{ translateX }, { translateY: bob }, { scale }] },
          ]}
        >
          <Text style={styles.pigeonEmoji}>🕊️</Text>
          <Text style={styles.envelope}>✉️</Text>
        </Animated.View>
      </View>

      {label ? <Text style={[styles.label, { color }]}>{label}</Text> : null}
      {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center", paddingVertical: 20 },
  track: {
    height: 56,
    justifyContent: "center",
    marginBottom: 14,
  },
  dotsRow: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dot: { width: 4, height: 4, borderRadius: 2 },
  pigeon: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  pigeonEmoji: { fontSize: 30 },
  envelope:    { fontSize: 14, marginLeft: -4, marginTop: 6 },
  label: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    letterSpacing: 0.3,
    textAlign: "center",
  },
  sublabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: 6,
    textAlign: "center",
  },
});
