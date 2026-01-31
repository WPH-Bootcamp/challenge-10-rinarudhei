import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { saveToken } from "@/shared/lib/auth";
import { LoginResponse } from "../types/auth";

export default function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      saveToken(data.token);
      router.push("/");
    },
  });
}
