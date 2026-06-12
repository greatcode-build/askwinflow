import { API_URL } from "@/app/lib/api";

export const getGoals = async () => {
  const res = await fetch(`${API_URL}/users/goals`);
  return res.json();
};

export const getTopics = async () => {
  const res = await fetch(`${API_URL}/users/topics`);
  return res.json();
};
