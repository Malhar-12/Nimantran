import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import { useInviteStore } from "../store/inviteStore";

import HomeScreen      from "../screens/HomeScreen";
import OccasionsScreen from "../screens/OccasionsScreen";
import FormScreen      from "../screens/FormScreen";
import TemplatesScreen from "../screens/TemplatesScreen";
import LanguagesScreen from "../screens/LanguagesScreen";
import PreviewScreen   from "../screens/PreviewScreen";
import HistoryScreen   from "../screens/HistoryScreen";

import PhoneScreen from "../screens/auth/PhoneScreen";
import OtpScreen   from "../screens/auth/OtpScreen";
import NameScreen  from "../screens/auth/NameScreen";

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: "#0C0C14" },
  animation: "slide_from_right",
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#13131F",
          borderTopColor: "rgba(255,255,255,0.06)",
          borderTopWidth: 1,
          paddingBottom: 6,
          height: 60,
        },
        tabBarActiveTintColor:   "#C77DFF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarLabelStyle: { fontFamily: "Poppins_600SemiBold", fontSize: 11, marginTop: -2 },
      }}
    >
      <Tab.Screen
        name="Home" component={HomeScreen}
        options={{ tabBarLabel: "Create", tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>{"\u2728"}</Text> }}
      />
      <Tab.Screen
        name="History" component={HistoryScreen}
        options={{ tabBarLabel: "My Invites", tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>{"\u{1F5C2}\uFE0F"}</Text> }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const hydrateAuth = useInviteStore((s) => s.hydrateAuth);
  const authChecked = useInviteStore((s) => s.authChecked);

  // Boot: try to load existing session token from SecureStore
  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  if (!authChecked) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0C0C14", justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#C77DFF" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        // Always start at MainTabs (guest-friendly).
        // PhoneScreen is reachable from anywhere via navigation.navigate("Phone").
        initialRouteName="MainTabs"
      >
        <Stack.Screen name="MainTabs"  component={MainTabs} />
        <Stack.Screen name="Occasions" component={OccasionsScreen} />
        <Stack.Screen name="Form"      component={FormScreen} />
        <Stack.Screen name="Templates" component={TemplatesScreen} />
        <Stack.Screen name="Languages" component={LanguagesScreen} />
        <Stack.Screen name="Preview"   component={PreviewScreen} />

        {/* Auth flow — pushed when login is required */}
        <Stack.Screen name="Phone" component={PhoneScreen} options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="Otp"   component={OtpScreen} />
        <Stack.Screen name="Name"  component={NameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
