import { getToken } from "./auth";
import { buildApiUrl } from "./api";

const ERROR_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: "Please check your details and try again.",
  EMAIL_ALREADY_EXISTS:
    "An account with this email already exists. Log in instead.",
  INVALID_CREDENTIALS: "Incorrect email or password.",
  EMAIL_NOT_VERIFIED: "Please verify your email before continuing.",
  VERIFICATION_LINK_EXPIRED:
    "This verification link has expired. Request a new one.",
  INVALID_VERIFICATION_LINK:
    "This verification link is invalid or already used.",
  PROFILE_INCOMPLETE: "Please complete your profile before continuing.",
  UNAUTHORIZED: "Your session has expired. Please log in again.",
  GOOGLE_ACCOUNT_NO_PASSWORD:
    "This account uses Google Sign-In. Sign in with Google instead.",
  RESET_TOKEN_INVALID: "This reset link is invalid. Request a new one.",
  RESET_TOKEN_EXPIRED:
    "This reset link has expired. Reset links are valid for 1 hour.",
  RATE_LIMIT_EXCEEDED: "Too many attempts. Please wait a few minutes.",
  SERVER_ERROR: "Something went wrong on our end. Please try again.",
};

type ApiSuccessResponse<T = unknown> = {
  success: true;
  status: number;
  data: T;
};

type ApiErrorResponse = {
  success: false;
  status: number;
  code: string;
  message: string;
  data: unknown;
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};

const getErrorCode = (json: unknown): string => {
  if (!isRecord(json)) return "SERVER_ERROR";

  const error = isRecord(json.error) ? json.error : null;

  return (
    getStringValue(error?.code) || getStringValue(json.code) || "SERVER_ERROR"
  );
};

const getErrorMessage = (json: unknown): string | null => {
  if (!isRecord(json)) return null;

  const error = isRecord(json.error) ? json.error : null;

  return getStringValue(error?.message) || getStringValue(json.message);
};

const getSuccessData = (json: unknown, fallbackText: string): unknown => {
  if (!isRecord(json)) return json ?? fallbackText;

  return json.data ?? json ?? fallbackText;
};

const headersFromInit = (headersInit?: HeadersInit): Record<string, string> => {
  if (!headersInit) return {};

  if (headersInit instanceof Headers) {
    const headersObject: Record<string, string> = {};

    headersInit.forEach((value, key) => {
      headersObject[key] = value;
    });

    return headersObject;
  }

  if (Array.isArray(headersInit)) {
    return Object.fromEntries(headersInit);
  }

  return headersInit;
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse> => {
  const token = getToken();
  const incomingHeaders = headersFromInit(options.headers);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...incomingHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const url = endpoint.startsWith("http") ? endpoint : buildApiUrl(endpoint);

  let res: Response;

  try {
    res = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";

    return {
      success: false,
      status: 0,
      code: "NETWORK_ERROR",
      message,
      data: null,
    };
  }

  const text = await res.text().catch(() => "");

  let json: unknown = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const code = getErrorCode(json);
    const backendMessage = getErrorMessage(json);

    return {
      success: false,
      status: res.status,
      code,
      message:
        backendMessage ||
        ERROR_MESSAGES[code] ||
        text ||
        res.statusText ||
        "Request failed",
      data: json ?? text,
    };
  }

  return {
    success: true,
    status: res.status,
    data: getSuccessData(json, text),
  };
};
