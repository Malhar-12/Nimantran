import React from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar,
} from "react-native";
import { CATEGORIES, findCategory } from "../constants/occasions";
import { useInviteStore } from "../store/inviteStore";
import { useT } from "../i18n";
import ProgressDots from "../components/ProgressDots";
import BigButton from "../components/BigButton";

export default function OccasionsScreen({ route, navigation }) {
  const { catId } = route.params;
  const cat = findCategory(catId);
  const t = useT();

  const occId      = useInviteStore(s => s.occasionId);
  const setOccId   = useInviteStore(s => s.setOccasionId);

  function handleContinue() {
    if (!occId) {
      alert(t("pleaseSelectOccasion"));
      return;
    }
    navigation.navigate("Form");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backTxt}>{"\u2190"} {t("back")}</Text>
        </TouchableOpacity>
        <Text style={styles.catEmoji}>{cat.emoji}</Text>
        <Text style={styles.catLabel}>{cat.label}</Text>
        <Text style={styles.catSub}>{t("pickOccasion")}</Text>
        <ProgressDots step={0} total={5} color={cat.color} />
      </View>
      <FlatList
        data={cat.occasions}
        keyExtractor={o => o.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item: o }) => {
          const selected = occId === o.id;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.occCard,
                {
                  borderColor: selected ? o.gradient[0] : "rgba(255,255,255,0.07)",
                  backgroundColor: selected ? o.gradient[0] + "22" : "rgba(255,255,255,0.03)",
                },
              ]}
              onPress={() => setOccId(o.id)}
            >
              <Text style={styles.occIcon}>{o.icons[0]}</Text>
              <Text style={[styles.occName, { color: selected ? o.gradient[0] : "rgba(255,255,255,0.5)", fontFamily: selected ? "Poppins_700Bold" : "Poppins_400Regular" }]}>
                {o.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.bottom}>
        <BigButton gradient={[cat.color, cat.color + "bb"]} onPress={handleContinue}>
          {t("continue")} {"\u2192"}
        </BigButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:  { flex: 1, backgroundColor: "#0C0C14" },
  header: { paddingHorizontal: 16, paddingTop: 10, alignItems: "center" },
  backBtn: { alignSelf: "flex-start", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", marginBottom: 12 },
  backTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.45)", fontSize: 11 },
  catEmoji: { fontSize: 30, marginBottom: 4 },
  catLabel: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#fff" },
  catSub:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 },
  grid: { padding: 12, gap: 8 },
  occCard: { flex: 1, margin: 4, paddingVertical: 14, paddingHorizontal: 6, borderRadius: 13, borderWidth: 2, alignItems: "center", minWidth: 100 },
  occIcon: { fontSize: 28, marginBottom: 5 },
  occName: { fontSize: 9, textAlign: "center", lineHeight: 13 },
  bottom: { padding: 16, paddingTop: 8 },
});
