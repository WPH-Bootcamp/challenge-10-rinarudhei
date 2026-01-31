import { HTTP_METHODS } from "next/dist/server/web/http";
import { HTTP_STATUS_UNAUTHORIZED } from "./constant";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. fetchAPI recieve string endpoint and options parameter where options are token and fetch builtin option
// 2. prepare headers "Content-Type": "application/json" and other headers defined in options
// 3. add auth token if provided, into Authorization headers
// 4. fetch url using fetch options and modified headers
// 5. handle non json response
// 6. handle error response -> throw custom APIError object with status code, error message and data
type FetchOptions = RequestInit & {
  token?: string | null;
};

class ApiError extends Error {
  constructor(
    public message: string,
    public code: number,
    public data?: unknown,
  ) {
    super(`ApiError: ${message} ${code}`);
    this.name = "ApiError";
  }
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token && typeof token === "string" && token.trim() !== "") {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(API_BASE_URL + endpoint, {
      ...fetchOptions,
      headers,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: T;
    if (isJson) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    if (!response.ok) {
      let errorMessage = response.statusText;
      if (data && typeof data === "object" && "messsage" in data) {
        errorMessage = String(data.messsage);
      } else if (data && typeof data === "string") {
        errorMessage = data;
      }

      if (response.status === HTTP_STATUS_UNAUTHORIZED) {
        errorMessage = "User unauthorized. Please login with valid user.";
      }

      throw new ApiError(errorMessage, response.status);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new Error(
      `Network Error: ${error instanceof Error ? error.message : "Unknown Error"}`,
    );
  }
}

export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  const data = await fetchAPI<T>(endpoint, {
    method: HTTP_METHODS[0],
    token,
  });

  return data;
}

export async function apiPost<T, V>(
  endpoint: string,
  body: V,
  token?: string,
): Promise<T> {
  const data = await fetchAPI<T>(endpoint, {
    method: HTTP_METHODS[3],
    body: JSON.stringify(body),
    token,
  });

  return data;
}

export async function apiPut<T, V>(
  endpoint: string,
  body: V,
  token?: string,
): Promise<T> {
  const data = await fetchAPI<T>(endpoint, {
    method: HTTP_METHODS[4],
    body: JSON.stringify(body),
    token,
  });

  return data;
}

export async function apiDelete<T>(
  endpoint: string,
  token?: string,
): Promise<T> {
  const data = await fetchAPI<T>(endpoint, {
    method: HTTP_METHODS[4],
    token,
  });

  return data;
}
