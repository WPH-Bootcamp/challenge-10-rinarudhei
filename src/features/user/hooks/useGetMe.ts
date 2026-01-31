import { useQuery } from "@tanstack/react-query";
import { getUserMe } from "../services/userService";

export function useGetMe() {
  return useQuery({
    queryKey: ["user-me"],
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 24,
  });
}
