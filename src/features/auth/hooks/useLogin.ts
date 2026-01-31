import { useRouter } from "next/navigation";
import { login } from "../services/authService";
import { useMutation } from "@tanstack/react-query";
import { saveToken } from "@/shared/lib/auth";
import { LoginResponse } from "../types/auth";
import { toast } from "sonner";

export default function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: login,
    onSuccess: async (data: LoginResponse) => {
      await saveToken(data.token);
      router.push("/");
    },
    onError: () => {
      toast.error("Failed login. Please try again");
    },
  });
}
