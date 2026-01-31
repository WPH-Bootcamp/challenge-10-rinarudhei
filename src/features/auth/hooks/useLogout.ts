import { removeToken } from "@/shared/lib/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  return useCallback(() => {
    removeToken();
    router.push("/login");
  }, [router]);
};
