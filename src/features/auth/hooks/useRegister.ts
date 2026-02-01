import { useMutation } from "@tanstack/react-query";
import { register } from "../services/authService";
import { useRouter } from "next/navigation";

export default function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push("/login");
    },
  });
}
