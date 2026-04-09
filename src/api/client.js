// ═══════════════════════════════════════════════════════════════
// API client — talks to Nimantran backend
// JWT lives in SecureStore (was AsyncStorage)
// ═══════════════════════════════════════════════════════════════
import { setSecure, getSecure, removeSecure } from "../lib/secureStorage";

const BASE_URL = "https://invitewala-backend-1.onrender.com";
const TOKEN_KEY = "@nimantran_session_token";

// ── Token helpers (exported for store init) ─────────────
export async function getStoredToken() {
  return getSecure(TOKEN_KEY);
}

export async function setStoredToken(token) {
  return setSecure(TOKEN_KEY, token);
}

export async function clearStoredToken() {
  return removeSecure(TOKEN_KEY);
}

// ── Core request ────────────────────────────────────────
async function request(path, options = {}) {
  const token = await getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  } catch (e) {
    throw new Error("Network error — check your internet connection");
  }
  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }
  if (!res.ok) {
    const err = new Error(data.error || data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// ═══ AUTH ════════════════════════════════════════════════
/**
 * Exchange a Firebase ID token for our backend session JWT.
 * Backend verifies the Firebase token and creates/fetches the user.
 */
export async function apiVerifyPhone(firebaseIdToken) {
  const data = await request("/auth/phone/verify", {
    method: "POST",
    body: JSON.stringify({ idToken: firebaseIdToken }),
  });
  if (data.token) await setStoredToken(data.token);
  return data;
}

export async function apiGetMe() {
  return request("/auth/me");
}

export async function apiUpdateMe(patch) {
  return request("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function apiDeleteAccount() {
  const data = await request("/auth/account", { method: "DELETE" });
  await clearStoredToken();
  return data;
}

export async function apiLogout() {
  await clearStoredToken();
}

// ═══ GENERATE ════════════════════════════════════════════
export async function apiGenerate(payload) {
  return request("/generate", { method: "POST", body: JSON.stringify(payload) });
}

// ═══ INVITES ═════════════════════════════════════════════
export async function apiGetInvites() {
  return request("/invites");
}

export async function apiSaveInvite(payload) {
  return request("/invites", { method: "POST", body: JSON.stringify(payload) });
}

export async function apiDeleteInvite(id) {
  return request(`/invites/${id}`, { method: "DELETE" });
}

// ═══ RSVP (no auth) ══════════════════════════════════════
export async function apiGetRsvp(shortCode) {
  return request(`/rsvp/${shortCode}`);
}

export async function apiSubmitRsvp(shortCode, payload) {
  return request(`/rsvp/${shortCode}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
