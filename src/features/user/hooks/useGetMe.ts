import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "../services/userService";
import { UserMe } from "../types/user";
import { ApiError } from "@/shared/lib/api";

export function useGetMe() {
  return useQuery<UserMe | null, ApiError>({
    queryKey: ["user-me"],
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
  });
}
