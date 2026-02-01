import { apiGet } from "@/shared/lib/api";
import { getToken } from "@/shared/lib/auth";
import { UserMe } from "../types/user";

export async function getUserMe(): Promise<UserMe | null> {
  const token = await getToken();
  if (!token) {
    return null;
  }

  return await apiGet<UserMe>("/users/me", token);
}
