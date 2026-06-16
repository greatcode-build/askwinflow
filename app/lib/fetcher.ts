import { getToken } from "./auth";
import { buildApiUrl } from "./api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(buildApiUrl(endpoint), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: json?.message || res.statusText,
      data: json,
    };
  }

  return { success: true, status: res.status, data: json };
};
