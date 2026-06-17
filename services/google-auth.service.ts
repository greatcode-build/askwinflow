import { apiFetch } from "@/app/lib/fetcher";

export const signInWithGoogle = async () => {
  const res = await apiFetch("auth/google", {
    method: "GET",
  });

  if (!res.success) {
    throw new Error(res.message || "Unable to initiate Google sign-in.");
  }

  const url = res.data?.url;
  if (!url || typeof url !== "string") {
    throw new Error("Invalid redirect URL received from Google sign-in.");
  }

  if (typeof window !== "undefined") {
    window.location.assign(url);
  }

  return res;
};
