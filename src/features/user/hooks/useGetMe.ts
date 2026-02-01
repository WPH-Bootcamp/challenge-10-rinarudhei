import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "../services/userService";
import { UserMe } from "../types/user";
import { ApiError } from "next/dist/server/api-utils";

export function useGetMe() {
  return useQuery<UserMe | null, ApiError>({
    queryKey: ["user-me"],
    queryFn: getUserMe,
    staleTime: 1000 * 3600 * 24,
  });
}
