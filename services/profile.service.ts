import { apiFetch } from "@/app/lib/fetcher";

export const getProfile = async () => {
  return apiFetch("/users/profile");
};

export const updateProfile = async (payload: any) => {
  return apiFetch("/users/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};
