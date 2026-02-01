import { apiPost } from "@/shared/lib/api";
import {
  LoginParam,
  LoginResponse,
  RegisterParam,
  RegisterResponse,
} from "../types/auth";

export async function register(data: RegisterParam): Promise<RegisterResponse> {
  const response = await apiPost<RegisterResponse, RegisterParam>(
    "/auth/register",
    data,
  );
  return response;
}

export async function login(data: LoginParam): Promise<LoginResponse> {
  const response = await apiPost<LoginResponse, LoginParam>(
    "/auth/login",
    data,
  );

  return response;
}
