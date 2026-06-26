import { apiFetch } from "@/app/lib/fetcher";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};

const extractGoogleUrl = (res: unknown): string | null => {
  if (!isRecord(res)) return null;

  const data = isRecord(res.data) ? res.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return (
    getStringValue(res.url) ||
    getStringValue(data?.url) ||
    getStringValue(nestedData?.url) ||
    null
  );
};

export const signInWithGoogle = async () => {
  const res = await apiFetch("auth/google", {
    method: "GET",
  });

  if (!res.success) {
    throw new Error(res.message || "Unable to initiate Google sign-in.");
  }

  const url = extractGoogleUrl(res);

  if (!url) {
    throw new Error("Invalid redirect URL received from Google sign-in.");
  }

  if (typeof window !== "undefined") {
    window.location.assign(url);
  }

  return res;
};
