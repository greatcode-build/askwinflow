import { apiFetch } from "@/app/lib/fetcher";

export type UpdateProfilePayload = {
  full_name?: string;
  role?: string;
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

export const getProfileUser = (response: any) => {
  return response?.data?.user || response?.user || null;
};

export const isUserOnboarded = (user: any) => {
  return Boolean(user?.onboarding_completed || user?.profile_completed);
};
