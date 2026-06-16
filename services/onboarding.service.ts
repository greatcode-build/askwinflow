import { buildApiUrl } from "@/app/lib/api";

export const getGoals = async () => {
  const res = await fetch(buildApiUrl("users/goals"));
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: json?.message || res.statusText,
      data: json,
    };
  }

  return { success: true, status: res.status, data: json };
};

export const getTopics = async () => {
  const res = await fetch(buildApiUrl("users/topics"));
  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: json?.message || res.statusText,
      data: json,
    };
  }

  return { success: true, status: res.status, data: json };
};
