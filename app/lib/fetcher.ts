import { getToken } from "./auth";
import { API_URL } from "./api";

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
};
