import React, { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Modal, FlatList,
} from "react-native";
import { findOccasion } from "../constants/occasions";
import { useInviteStore } from "../store/inviteStore";
import ProgressDots from "../components/ProgressDots";
import BigButton from "../components/BigButton";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

// ─── Date Picker Modal ──────────────────
function DatePickerModal({ visible, onClose, onSelect, accentColor }) {
  const now = new Date();
  const [selDay, setSelDay] = useState(now.getDate());
  const [selMonth, setSelMonth] = useState(now.getMonth() + 1);
  const [selYear, setSelYear] = useState(now.getFullYear());

  const years = [];
  for (let y = now.getFullYear(); y <= now.getFullYear() + 5; y++) years.push(y);
  const daysCount = getDaysInMonth(selMonth, selYear);
  const days = [];
  for (let d = 1; d <= daysCount; d++) days.push(d);

  // Adjust day if exceeds month days
  const validDay = selDay > daysCount ? daysCount : selDay;

  function confirm() {
    const dd = String(validDay).padStart(2, "0");
    const mm = String(selMonth).padStart(2, "0");
    onSelect(`${dd}-${mm}-${selYear}`);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={mp.overlay}>
        <View style={mp.container}>
          <Text style={[mp.title, { color: accentColor }]}>Select Date</Text>

          <View style={mp.row}>
            {/* Day */}
            <View style={mp.col}>
              <Text style={mp.colLabel}>Day</Text>
              <ScrollView style={mp.scroll} showsVerticalScrollIndicator={false}>
                {days.map(d => (
                  <TouchableOpacity key={d} style={[mp.item, validDay === d && { backgroundColor: accentColor + "33" }]} onPress={() => setSelDay(d)}>
                    <Text style={[mp.itemText, validDay === d && { color: accentColor, fontWeight: "700" }]}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Month */}
            <View style={[mp.col, { flex: 1.5 }]}>
              <Text style={mp.colLabel}>Month</Text>
              <ScrollView style={mp.scroll} showsVerticalScrollIndicator={false}>
                {MONTHS.map((m, i) => (
                  <TouchableOpacity key={m} style={[mp.item, selMonth === i + 1 && { backgroundColor: accentColor + "33" }]} onPress={() => setSelMonth(i + 1)}>
                    <Text style={[mp.itemText, selMonth === i + 1 && { color: accentColor, fontWeight: "700" }]}>{m}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Year */}
            <View style={mp.col}>
              <Text style={mp.colLabel}>Year</Text>
              <ScrollView style={mp.scroll} showsVerticalScrollIndicator={false}>
                {years.map(y => (
                  <TouchableOpacity key={y} style={[mp.item, selYear === y && { backgroundColor: accentColor + "33" }]} onPress={() => setSelYear(y)}>
                    <Text style={[mp.itemText, selYear === y && { color: accentColor, fontWeight: "700" }]}>{y}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={mp.preview}>
            <Text style={mp.previewText}>{String(validDay).padStart(2,"0")}-{String(selMonth).padStart(2,"0")}-{selYear}</Text>
          </View>

          <View style={mp.btnRow}>
            <TouchableOpacity style={mp.cancelBtn} onPress={onClose}>
              <Text style={mp.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[mp.confirmBtn, { backgroundColor: accentColor }]} onPress={confirm}>
              <Text style={mp.confirmTxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Time Picker Modal ──────────────────
function TimePickerModal({ visible, onClose, onSelect, accentColor }) {
  const [selHour, setSelHour] = useState(10);
  const [selMin, setSelMin] = useState(0);
  const [selPeriod, setSelPeriod] = useState("AM");

  const hours = [1,2,3,4,5,6,7,8,9,10,11,12];
  const minutes = [];
  for (let m = 0; m < 60; m += 5) minutes.push(m);

  function confirm() {
    let h24 = selHour;
    if (selPeriod === "AM" && h24 === 12) h24 = 0;
    if (selPeriod === "PM" && h24 !== 12) h24 += 12;
    const hh = String(h24).padStart(2, "0");
    const mm = String(selMin).padStart(2, "0");
    onSelect(`${hh}:${mm}`);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={mp.overlay}>
        <View style={mp.container}>
          <Text style={[mp.title, { color: accentColor }]}>Select Time</Text>

          <View style={mp.row}>
            {/* Hour */}
            <View style={mp.col}>
              <Text style={mp.colLabel}>Hour</Text>
              <ScrollView style={mp.scroll} showsVerticalScrollIndicator={false}>
                {hours.map(h => (
                  <TouchableOpacity key={h} style={[mp.item, selHour === h && { backgroundColor: accentColor + "33" }]} onPress={() => setSelHour(h)}>
                    <Text style={[mp.itemText, selHour === h && { color: accentColor, fontWeight: "700" }]}>{h}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Minute */}
            <View style={mp.col}>
              <Text style={mp.colLabel}>Min</Text>
              <ScrollView style={mp.scroll} showsVerticalScrollIndicator={false}>
                {minutes.map(m => (
                  <TouchableOpacity key={m} style={[mp.item, selMin === m && { backgroundColor: accentColor + "33" }]} onPress={() => setSelMin(m)}>
                    <Text style={[mp.itemText, selMin === m && { color: accentColor, fontWeight: "700" }]}>{String(m).padStart(2,"0")}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* AM/PM */}
            <View style={[mp.col, { flex: 0.8 }]}>
              <Text style={mp.colLabel}>Period</Text>
              <View style={{ paddingTop: 10 }}>
                {["AM","PM"].map(p => (
                  <TouchableOpacity key={p} style={[mp.item, mp.periodItem, selPeriod === p && { backgroundColor: accentColor + "33" }]} onPress={() => setSelPeriod(p)}>
                    <Text style={[mp.itemText, { fontSize: 16 }, selPeriod === p && { color: accentColor, fontWeight: "700" }]}>{p}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={mp.preview}>
            <Text style={mp.previewText}>{selHour}:{String(selMin).padStart(2,"0")} {selPeriod}</Text>
          </View>

          <View style={mp.btnRow}>
            <TouchableOpacity style={mp.cancelBtn} onPress={onClose}>
              <Text style={mp.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[mp.confirmBtn, { backgroundColor: accentColor }]} onPress={confirm}>
              <Text style={mp.confirmTxt}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Form Screen ──────────────────
export default function FormScreen({ navigation }) {
  const occId  = useInviteStore(s => s.occasionId);
  const form   = useInviteStore(s => s.form);
  const setForm = useInviteStore(s => s.setForm);
  const occ    = findOccasion(occId);
  const [g1]   = occ.gradient;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function validate() {
    if (!form.senderName.trim()) { alert("Please enter your name!"); return false; }
    if (!form.date)              { alert("Please pick a date!");       return false; }
    if (!form.time)              { alert("Please pick a time!");       return false; }
    if (!form.location.trim())   { alert("Please enter a venue!");     return false; }
    return true;
  }

  // Format display for date
  function displayDate() {
    if (!form.date) return "";
    const parts = form.date.split("-");
    if (parts.length !== 3) return form.date;
    const [d, m, y] = parts;
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${+d} ${monthNames[+m - 1]} ${y}`;
  }

  // Format display for time
  function displayTime() {
    if (!form.time) return "";
    const parts = form.time.split(":");
    if (parts.length !== 2) return form.time;
    const hr = parseInt(parts[0], 10);
    const min = parts[1];
    return `${hr % 12 || 12}:${min} ${hr >= 12 ? "PM" : "AM"}`;
  }

  const inputStyle = [styles.input, { borderColor: g1 + "33" }];
  const labelStyle = [styles.label, { color: g1 }];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0C0C14" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backTxt}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headCenter}>
            <Text style={styles.occIcon}>{occ.icons[0]}</Text>
            <Text style={styles.occName}>{occ.name}</Text>
            <Text style={styles.sub}>Fill in the details</Text>
            <ProgressDots step={1} total={5} color={g1} />
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <Text style={labelStyle}>YOUR NAME *</Text>
            <TextInput
              style={inputStyle} value={form.senderName} placeholderTextColor="rgba(255,255,255,0.25)"
              onChangeText={v => setForm({ senderName: v })} placeholder="e.g. Priya Sharma"
            />

            <Text style={[labelStyle, { marginTop: 14 }]}>GUEST NAME <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
              style={inputStyle} value={form.recipName} placeholderTextColor="rgba(255,255,255,0.25)"
              onChangeText={v => setForm({ recipName: v })} placeholder="e.g. All Friends / Rahul"
            />

            {/* Date & Time row with pickers */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={[labelStyle, { marginTop: 14 }]}>DATE *</Text>
                <TouchableOpacity style={[inputStyle, styles.pickerBtn]} onPress={() => setShowDatePicker(true)} activeOpacity={0.7}>
                  <Text style={styles.pickerIcon}>📅</Text>
                  <Text style={[styles.pickerText, !form.date && styles.placeholderText]}>
                    {form.date ? displayDate() : "Select Date"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[labelStyle, { marginTop: 14 }]}>TIME *</Text>
                <TouchableOpacity style={[inputStyle, styles.pickerBtn]} onPress={() => setShowTimePicker(true)} activeOpacity={0.7}>
                  <Text style={styles.pickerIcon}>🕐</Text>
                  <Text style={[styles.pickerText, !form.time && styles.placeholderText]}>
                    {form.time ? displayTime() : "Select Time"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[labelStyle, { marginTop: 14 }]}>VENUE *</Text>
            <TextInput
              style={inputStyle} value={form.location} placeholderTextColor="rgba(255,255,255,0.25)"
              onChangeText={v => setForm({ location: v })} placeholder="e.g. Community Hall, Pune"
            />

            <Text style={[labelStyle, { marginTop: 14 }]}>SPECIAL NOTE <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
              style={[inputStyle, { height: 64, textAlignVertical: "top" }]}
              value={form.note} placeholderTextColor="rgba(255,255,255,0.25)"
              onChangeText={v => setForm({ note: v })} placeholder="e.g. Please bring sweets! Dress traditionally."
              multiline
            />

            <View style={{ marginTop: 18 }}>
              <BigButton gradient={[occ.gradient[0], occ.gradient[1]]} onPress={() => validate() && navigation.navigate("Templates")}>
                Choose Template →
              </BigButton>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Picker Modals */}
      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSelect={(d) => setForm({ date: d })}
        accentColor={g1}
      />
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSelect={(t) => setForm({ time: t })}
        accentColor={g1}
      />
    </SafeAreaView>
  );
}

// ─── Modal Picker Styles ──────────────────
const mp = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "flex-end" },
  container: { backgroundColor: "#1A1A2E", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 36, maxHeight: "70%" },
  title: { fontFamily: "Poppins_700Bold", fontSize: 18, textAlign: "center", marginBottom: 16 },
  row: { flexDirection: "row", gap: 10, height: 220 },
  col: { flex: 1 },
  colLabel: { fontFamily: "Poppins_600SemiBold", fontSize: 10, color: "rgba(255,255,255,0.4)", textAlign: "center", letterSpacing: 1, marginBottom: 6 },
  scroll: { flex: 1, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.05)" },
  item: { paddingVertical: 10, paddingHorizontal: 8, alignItems: "center", borderRadius: 8, marginHorizontal: 4, marginVertical: 1 },
  periodItem: { paddingVertical: 20, marginVertical: 4 },
  itemText: { fontFamily: "Poppins_500Medium", fontSize: 14, color: "rgba(255,255,255,0.6)" },
  preview: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 12, paddingVertical: 12, alignItems: "center", marginTop: 16 },
  previewText: { fontFamily: "Poppins_700Bold", fontSize: 20, color: "#fff" },
  btnRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.15)", alignItems: "center" },
  cancelTxt: { fontFamily: "Poppins_600SemiBold", fontSize: 14, color: "rgba(255,255,255,0.5)" },
  confirmBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  confirmTxt: { fontFamily: "Poppins_700Bold", fontSize: 14, color: "#fff" },
});

// ─── Form Styles ──────────────────
const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: "#0C0C14" },
  scroll: { padding: 16, paddingBottom: 40 },
  backBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.12)", alignSelf: "flex-start", marginBottom: 14 },
  backTxt: { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.45)", fontSize: 11 },
  headCenter: { alignItems: "center", marginBottom: 16 },
  occIcon: { fontSize: 30, marginBottom: 4 },
  occName: { fontFamily: "PlayfairDisplay_700Bold", fontSize: 18, color: "#fff" },
  sub:     { fontFamily: "Poppins_400Regular", color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 2 },
  card:    { backgroundColor: "rgba(255,255,255,0.04)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 20, padding: 18 },
  label:   { fontFamily: "Poppins_700Bold", fontSize: 10, letterSpacing: 1.5, marginBottom: 6 },
  optional:{ color: "rgba(255,255,255,0.25)", fontSize: 9, fontFamily: "Poppins_400Regular" },
  input:   { backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1.5, borderRadius: 10, padding: 12, color: "#fff", fontSize: 13, fontFamily: "Poppins_400Regular", justifyContent: "center" },
  row:     { flexDirection: "row", gap: 10 },
  pickerBtn: { flexDirection: "row", alignItems: "center", paddingVertical: 13 },
  pickerIcon: { fontSize: 16, marginRight: 8 },
  pickerText: { color: "#fff", fontSize: 13, fontFamily: "Poppins_500Medium" },
  placeholderText: { color: "rgba(255,255,255,0.25)" },
});
