"use client";

import RegisterForm from "@/features/auth/components/registerForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

export default function RegisterPage() {
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <RegisterForm />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
