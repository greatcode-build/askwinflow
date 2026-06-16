import { apiFetch } from "@/app/lib/fetcher";
import { buildApiUrl } from "@/app/lib/api";
import { getToken } from "@/app/lib/auth";

export const login = async (email: string, password: string) => {
  const res = await fetch(buildApiUrl("auth/login"), {
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

  return {
    success: true,
    status: res.status,
    data: json,
    token:
      json?.token ||
      json?.data?.token ||
      json?.access_token ||
      json?.data?.access_token ||
      null,
  };
};

export const register = async (payload: {
  full_name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(buildApiUrl("auth/register"), {
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
  const token = getToken();

  if (!token) {
    return {
      success: false,
      status: 401,
      message: "No active session found",
      data: null,
    };
  }

  return apiFetch("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  const res = await fetch(buildApiUrl("auth/forgot-password"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
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

export const resendVerificationEmail = async (email: string) => {
  const res = await fetch(buildApiUrl("auth/resend-verification"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
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

export const resetPassword = async (payload: {
  email?: string;
  password: string;
  confirmPassword: string;
  token?: string | null;
}) => {
  const res = await fetch(buildApiUrl("auth/reset-password"), {
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
