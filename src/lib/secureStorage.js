// ═══════════════════════════════════════════════════════════════
// Secure storage for sensitive data (JWT, refresh tokens)
// Falls back to AsyncStorage if SecureStore isn't available
// ═══════════════════════════════════════════════════════════════
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const secureAvailable = (() => {
  try {
    return typeof SecureStore.setItemAsync === "function";
  } catch {
    return false;
  }
})();

export async function setSecure(key, value) {
  if (value == null) return removeSecure(key);
  try {
    if (secureAvailable) {
      await SecureStore.setItemAsync(key, String(value));
      return;
    }
  } catch {
    // fall through to AsyncStorage
  }
  await AsyncStorage.setItem(key, String(value));
}

export async function getSecure(key) {
  try {
    if (secureAvailable) {
      const v = await SecureStore.getItemAsync(key);
      if (v != null) return v;
    }
  } catch {
    // fall through
  }
  return AsyncStorage.getItem(key);
}

export async function removeSecure(key) {
  try {
    if (secureAvailable) {
      await SecureStore.deleteItemAsync(key);
    }
  } catch {
    // ignore
  }
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}
