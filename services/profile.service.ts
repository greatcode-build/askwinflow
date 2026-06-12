import { apiFetch } from "@/app/lib/fetcher";

export const getProfile = async () => {
  const res = await apiFetch("/users/profile");
  return res.json();
};

export const updateProfile = async (payload: any) => {
  const res = await apiFetch("/users/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return res.json();
};
