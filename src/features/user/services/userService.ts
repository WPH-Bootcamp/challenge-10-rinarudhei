import { apiGet } from "@/shared/lib/api";
import {
  getStoredUser,
  getTokenFromCookies,
  saveUser,
} from "@/shared/lib/auth";
import { UserMe } from "../types/user";

export async function getUserMe(): Promise<UserMe | null> {
  const token = await getTokenFromCookies();
  if (!token) {
    return null;
  }

  const storedUser = getStoredUser();
  if (storedUser && storedUser.id) {
    return storedUser;
  }

  const response = await apiGet<UserMe>("/users/me", token);
  saveUser(response);

  return response;
}
