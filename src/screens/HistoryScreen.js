import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  SafeAreaView, StatusBar, Alert, ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { apiGetInvites, apiDeleteInvite } from "../api/client";
import { findOccasion } from "../constants/occasions";
import { formatDate, formatTime } from "../utils/formatters";

export default function HistoryScreen({ navigation }) {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const { invites: data } = await apiGetInvites();
      setInvites(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => { load(); }, []));

  async function handleDelete(id) {
    Alert.alert("Delete Invite", "Remove this invite from history?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive",
        onPress: async () => {
          try {
            await apiDeleteInvite(id);
            setInvites(prev => prev.filter(i => i.id !== id));
          } catch {
            Alert.alert("Error", "Could not delete. Please try again.");
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator color="#C77DFF" size="large" style={{ marginTop: 60 }} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>{"\u{1F512}"}</Text>
          <Text style={styles.emptyTitle}>Not logged in</Text>
          <Text style={styles.emptySub}>Log in to see your saved invitations.</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (invites.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>{"\u{1F4ED}"}</Text>
          <Text style={styles.emptyTitle}>No invites yet</Text>
          <Text style={styles.emptySub}>Create your first invite to save it here.</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.loginTxt}>Create Invite</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <View style={styles.header}>
        <Text style={styles.heading}>My Invites {"\u{1F5C2}\uFE0F"}</Text>
        <Text style={styles.count}>{invites.length} saved</Text>
      </View>
      <FlatList
        data={invites}
        keyExtractor={i => String(i.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const occ = findOccasion(item.occasion_id);
          const [g1] = occ.gradient;
          return (
            <View style={[styles.card, { borderColor: g1 + "33" }]}>
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>{occ.icons[0]}</Text>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardOcc, { color: g1 }]}>{item.occasion_name}</Text>
                  <Text style={styles.cardSender}>From: {item.sender_name}</Text>
                  {item.recip_name ? <Text style={styles.cardRecip}>To: {item.recip_name}</Text> : null}
                  <Text style={styles.cardDate}>
                    {formatDate(item.event_date)} {item.event_time ? "\u00B7 " + formatTime(item.event_time) : ""}
                  </Text>
                  {item.location ? <Text style={styles.cardVenue}>{"\u{1F4CD}"} {item.location}</Text> : null}
                </View>
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                  <Text style={styles.deleteTxt}>{"\u{1F5D1}"}</Text>
                </TouchableOpacity>
              </View>
              {item.generated_text ? (
                <Text style={styles.cardBody} numberOfLines={2}>{item.generated_text}</Text>
              ) : null}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heading:{ fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, color: "#fff" },
  count:  { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 12 },
  list:   { padding: 16, gap: 12 },
  card:   { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderRadius: 16, padding: 14 },
  cardTop:{ flexDirection: "row", gap: 12, alignItems: "flex-start" },
  cardIcon: { fontSize: 28 },
  cardInfo: { flex: 1 },
  cardOcc:  { fontFamily: "Poppins_700Bold", fontSize: 13 },
  cardSender: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.6)", fontSize: 12 },
  cardRecip:  { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.5)", fontSize: 11 },
  cardDate:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 },
  cardVenue:  { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.35)", fontSize: 11 },
  deleteBtn:  { padding: 6 },
  deleteTxt:  { fontSize: 18 },
  cardBody:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 8, fontStyle: "italic", lineHeight: 16 },
  emptyWrap:  { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 22, color: "#fff", marginBottom: 8 },
  emptySub:   { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.4)", fontSize: 13, textAlign: "center", marginBottom: 24 },
  loginBtn:   { backgroundColor: "#C77DFF22", borderWidth: 1.5, borderColor: "#C77DFF55", borderRadius: 12, paddingHorizontal: 28, paddingVertical: 12 },
  loginTxt:   { fontFamily: "Poppins_700Bold", color: "#C77DFF", fontSize: 14 },
});
