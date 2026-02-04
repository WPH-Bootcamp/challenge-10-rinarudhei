import { apiPost } from "@/shared/lib/api";
import {
  LoginParam,
  LoginResponse,
  RegisterParam,
  RegisterResponse,
} from "../types/auth";

export async function register(data: RegisterParam): Promise<RegisterResponse> {
  const response = await apiPost<RegisterResponse, RegisterParam>({
    endpoint: "/auth/register",
    body: data,
  });
  return response;
}

export async function login(data: LoginParam): Promise<LoginResponse> {
  const response = await apiPost<LoginResponse, LoginParam>({
    endpoint: "/auth/login",
    body: data,
  });

  return response;
}
