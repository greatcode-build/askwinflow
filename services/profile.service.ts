import { apiFetch } from "@/app/lib/fetcher";

type UpdateProfilePayload = {
  full_name?: string;
  persona?: string;
  goals?: string[];
  topics?: string[];
  avatar_url?: string;
  skipped_onboarding?: boolean;
};

const getResponseBody = (response: any) => {
  if (!response || typeof response !== "object") {
    return null;
  }

  if (response.data && typeof response.data === "object") {
    return response.data;
  }

  return response;
};

const getNestedUser = (response: any) => {
  const body = getResponseBody(response);

  if (!body || typeof body !== "object") {
    return null;
  }

  if (body.user && typeof body.user === "object") {
    return body.user;
  }

  if (body.data && typeof body.data === "object" && body.data.user) {
    return body.data.user;
  }

  return null;
};

export const getProfileUser = (response: any) => {
  return (
    getNestedUser(response) ??
    response?.data?.user ??
    response?.data?.data?.user ??
    response?.data ??
    null
  );
};

export const isProfileCompleted = (response: any) => {
  const user = getNestedUser(response);
  if (user && typeof user.profile_completed !== "undefined") {
    return Boolean(user.profile_completed);
  }

  const body = getResponseBody(response);
  if (body && typeof body.profile_completed !== "undefined") {
    return Boolean(body.profile_completed);
  }

  return false;
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
