import { apiGet } from "@/shared/lib/api";
import { getTokenFromCookies } from "@/shared/lib/auth";
import { UserMe } from "../types/user";

export async function getUserMe(): Promise<UserMe | null> {
  const token = await getTokenFromCookies();
  if (!token) {
    return null;
  }

  return await apiGet<UserMe>("/users/me", token);
}
