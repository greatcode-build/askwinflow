import { getToken } from "./auth";
import { buildApiUrl } from "./api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildApiUrl(endpoint), {
    ...options,
    headers,
  });

  // Read text then attempt to parse JSON to preserve raw body on parse errors
  const text = await res.text().catch(() => "");
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch (err) {
    // keep json as null and preserve raw text in data
  }

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: json?.message || text || res.statusText,
      data: json ?? text,
    };
  }

  return { success: true, status: res.status, data: json ?? text };
};
