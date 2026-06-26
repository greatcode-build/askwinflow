import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  getProfile,
  getProfileUser,
  isUserOnboarded,
} from "@/services/profile.service";

export const redirectAuthenticatedUser = async (
  router: AppRouterInstance,
  fallbackUser?: unknown,
) => {
  if (fallbackUser && isUserOnboarded(fallbackUser)) {
    router.replace("/feed");
    return;
  }

  const profile = await getProfile();

  if (!profile.success) {
    router.replace("/sign-in");
    return;
  }

  const user = getProfileUser(profile);

  if (isUserOnboarded(user)) {
    router.replace("/feed");
  } else {
    router.replace("/onboarding/role");
  }
};
