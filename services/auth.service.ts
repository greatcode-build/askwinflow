import { apiFetch } from "@/app/lib/fetcher";
import { getToken } from "@/app/lib/auth";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};

const getNestedData = (value: unknown): UnknownRecord | null => {
  if (!isRecord(value)) return null;

  const data = isRecord(value.data) ? value.data : null;

  return data;
};

const extractToken = (res: unknown): string | null => {
  if (!isRecord(res)) return null;

  const data = getNestedData(res);
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return (
    getStringValue(res.token) ||
    getStringValue(data?.token) ||
    getStringValue(nestedData?.token) ||
    getStringValue(data?.access_token) ||
    getStringValue(nestedData?.access_token) ||
    null
  );
};

const extractUser = (res: unknown): unknown | null => {
  if (!isRecord(res)) return null;

  const data = getNestedData(res);
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return res.user || data?.user || nestedData?.user || null;
};

const extractGoogleUrl = (res: unknown): string | null => {
  if (!isRecord(res)) return null;

  const data = getNestedData(res);
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return (
    getStringValue(res.url) ||
    getStringValue(data?.url) ||
    getStringValue(nestedData?.url) ||
    null
  );
};

export const login = async (email: string, password: string) => {
  const res = await apiFetch("auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.success) {
    return {
      ...res,
      token: null,
      user: null,
    };
  }

  const token = extractToken(res);
  const user = extractUser(res);

  return {
    ...res,
    token,
    user,
  };
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

  if (!res.success) {
    return {
      ...res,
      url: null,
    };
  }

  const url = extractGoogleUrl(res);

  return {
    ...res,
    url,
  };
};
