import { apiFetch } from "@/app/lib/fetcher";
import { getToken } from "@/app/lib/auth";

export const login = async (email: string, password: string) => {
  const res = await apiFetch("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.success) return res;

  const token =
    res.data?.token || res.data?.data?.token || res.data?.access_token || null;

  const user = res.data?.user || res.data?.data?.user || null;

  return { ...res, token, user };
};

export const register = async (payload: {
  full_name: string;
  email: string;
  password: string;
}) => {
  return apiFetch("auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const verifyEmail = async (token: string) => {
  return apiFetch("auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
};

export const resendVerificationEmail = async (email: string) => {
  return apiFetch("auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const logout = async () => {
  const token = getToken();

  if (!token) {
    return {
      success: false,
      status: 401,
      code: "UNAUTHORIZED",
      message: "No active session found",
      data: null,
    };
  }

  return apiFetch("auth/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  return apiFetch("auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const resetPassword = async (payload: {
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  return apiFetch("auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const startGoogleAuth = async () => {
  const res = await apiFetch("auth/google", {
    method: "GET",
  });

  if (!res.success) return res;

  const url = res.data?.url || res.data?.data?.url;

  return {
    ...res,
    url,
  };
};
