import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressDots({ step, total, color }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              width: i === step ? 24 : 8,
              backgroundColor:
                i === step ? color : i < step ? color + "77" : "rgba(255,255,255,0.12)",
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
});
