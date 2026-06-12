import { API_URL } from "@/app/lib/api";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
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

export const register = async (payload: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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

export const logout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
