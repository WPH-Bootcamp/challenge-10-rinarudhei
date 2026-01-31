"use client";

import LoginForm from "@/features/auth/components/loginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RegisterPage() {
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    </div>
  );
}
