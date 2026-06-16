import { apiFetch } from "@/app/lib/fetcher";

export const getGoals = async () => {
  return apiFetch("users/goals");
};

export const getTopics = async () => {
  return apiFetch("users/topics");
};
