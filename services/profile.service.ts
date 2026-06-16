import { apiFetch } from "@/app/lib/fetcher";

type UpdateProfilePayload = {
  full_name?: string;
  persona?: string;
  goals?: string[];
  topics?: string[];
  avatar_url?: string;
  skipped_onboarding?: boolean;
};

export const getProfile = async () => {
  return apiFetch("users/profile");
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  return apiFetch("users/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};
