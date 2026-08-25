import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Text, ScrollView } from "react-native";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: "#0C0C14", padding: 24 }}>
          <Text style={{ color: "#FF6B6B", fontSize: 18, fontWeight: "bold", marginTop: 60 }}>App Error</Text>
          <Text style={{ color: "#fff", marginTop: 12, fontSize: 13 }}>{this.state.error?.toString()}</Text>
          <Text style={{ color: "rgba(255,255,255,0.4)", marginTop: 12, fontSize: 11 }}>{this.state.error?.stack}</Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

import { useFonts } from "expo-font";
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black,
  PlayfairDisplay_700Bold_Italic,
} from "@expo-google-fonts/playfair-display";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useInviteStore } from "./src/store/inviteStore";
import { apiGetMe } from "./src/api/client";
import AppNavigator from "./src/navigation/AppNavigator";

try {
  SplashScreen.preventAutoHideAsync().catch(() => {});
} catch (e) {}

export default function App() {
  const setUser  = useInviteStore(s => s.setUser);
  const setToken = useInviteStore(s => s.setToken);
  const [ready, setReady] = useState(false);
  const [fontError, setFontError] = useState(false);

  const [fontsLoaded, fontLoadError] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
    PlayfairDisplay_700Bold_Italic,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
  });

  useEffect(() => {
    if (fontLoadError) {
      console.warn("Font loading failed:", fontLoadError);
      setFontError(true);
    }
  }, [fontLoadError]);

  useEffect(() => {
    async function init() {
      try {
        const token = await AsyncStorage.getItem("@invitewala_token");
        if (token) {
          setToken(token);
          try {
            const { user } = await apiGetMe();
            setUser(user);
          } catch {}
        }
      } catch {
        try { await AsyncStorage.removeItem("@invitewala_token"); } catch {}
      } finally {
        setReady(true);
      }
    }
    init();
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && ready) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded, fontError, ready]);

  if ((!fontsLoaded && !fontError) || !ready) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0C0C14", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#C77DFF" size="large" />
      </View>
    );
  }

  return <ErrorBoundary><AppNavigator /></ErrorBoundary>;
}
