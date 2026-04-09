// ═══════════════════════════════════════════════════════════════
// Firebase Auth — Phone OTP for Nimantran
// Uses @react-native-firebase/auth (native, supports OTP auto-fill)
// ═══════════════════════════════════════════════════════════════
import auth from "@react-native-firebase/auth";

/**
 * Send OTP to phone number.
 * @param {string} phoneE164  e.g. "+919876543210"
 * @returns confirmation object — call .confirm(code) to verify
 */
export async function sendOtp(phoneE164) {
  // forceResend = true so user can request a fresh code on retry
  return auth().signInWithPhoneNumber(phoneE164, true);
}

/**
 * Confirm OTP code with the confirmation object from sendOtp.
 * Returns Firebase ID token (JWT) — send this to our backend.
 */
export async function confirmOtp(confirmation, code) {
  const cred = await confirmation.confirm(code);
  return cred.user.getIdToken();
}

/**
 * Sign out from Firebase. Call this on app logout.
 */
export async function firebaseSignOut() {
  try {
    await auth().signOut();
  } catch {
    // ignore
  }
}

/**
 * Listen for auto-verification (Android only, when SMS Retriever succeeds).
 * Pass a callback that will receive the Firebase ID token.
 * Returns an unsubscribe function.
 */
export function onAutoVerify(callback) {
  return auth().onAuthStateChanged(async (user) => {
    if (user && user.phoneNumber) {
      try {
        const idToken = await user.getIdToken();
        callback(idToken, user.phoneNumber);
      } catch {
        // ignore
      }
    }
  });
}
