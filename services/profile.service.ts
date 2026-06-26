import { apiFetch } from "@/app/lib/fetcher";

export type UpdateProfilePayload = {
  full_name?: string;
  persona?: string;
  role?: string;
  goals?: string[];
  topics?: string[];
  avatar_url?: string;
  skipped_onboarding?: boolean;
};

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getBooleanValue = (value: unknown): boolean => {
  return typeof value === "boolean" ? value : false;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
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

export const getProfileUser = (response: unknown): unknown | null => {
  if (!isRecord(response)) return null;

  const data = isRecord(response.data) ? response.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return response.user || data?.user || nestedData?.user || null;
};

export const normalizeUser = (user: unknown) => {
  if (!isRecord(user)) return null;

  const goals = Array.isArray(user.goals) ? user.goals : [];
  const topics = Array.isArray(user.topics) ? user.topics : [];

  return {
    ...user,

    role: getStringValue(user.role) || getStringValue(user.persona),
    persona: getStringValue(user.persona) || getStringValue(user.role),

    goals,
    topics,

    profile_completed: getBooleanValue(user.profile_completed),
    onboarding_completed: getBooleanValue(user.onboarding_completed),
    skipped_onboarding: getBooleanValue(user.skipped_onboarding),
  };
};

export const isUserOnboarded = (user: unknown): boolean => {
  const normalizedUser = normalizeUser(user);

  if (!normalizedUser) return false;

  const hasRole = Boolean(normalizedUser.role || normalizedUser.persona);
  const hasGoals = normalizedUser.goals.length > 0;
  const hasTopics = normalizedUser.topics.length > 0;

  return Boolean(
    normalizedUser.profile_completed ||
    normalizedUser.onboarding_completed ||
    normalizedUser.skipped_onboarding ||
    (hasRole && hasGoals && hasTopics),
  );
};
