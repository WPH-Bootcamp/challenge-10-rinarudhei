import { UserMe } from "@/features/user/types/user";
import {
  AUTH_COOKIE_TOKEN_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "./constant";

/* 
  Provide functions for authentication
*/

export async function saveToken(token: string) {
  if (typeof window === undefined) return;

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  await cookieStore.set({
    expires: expirationDate.getTime(),
    name: AUTH_COOKIE_TOKEN_KEY,
    path: "/",
    sameSite: "lax",
    value: token,
  });
}

export function getToken(): string | null {
  if (typeof window == undefined) return null;

  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export async function removeToken() {
  if (typeof window !== undefined) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    await cookieStore.delete(AUTH_COOKIE_TOKEN_KEY);
  }
}

/*
 * Get token from cookies (server-side)
 */
export async function getTokenFromCookies(): Promise<string | null> {
  const cookie = await cookieStore.get(AUTH_COOKIE_TOKEN_KEY);

  if (cookie && cookie.value) {
    return cookie.value;
  }

  return null;
}

export function saveUser(user: UserMe) {
  if (typeof window === undefined) return;

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

export function getStoredUser(): UserMe | null {
  if (typeof window === undefined) return null;

  const userString = localStorage.getItem(AUTH_USER_KEY);
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch {
      console.log("error parsing user string from local storage");
      return null;
    }
  }

  return null;
}

export function isAuthenticated() {
  return getTokenFromCookies() !== null;
}
