import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getProfile } from "@/services/profile.service";
import { isUserOnboarded } from "@/services/profile.service";

export const redirectAuthenticatedUser = async (
  router: AppRouterInstance,
  fallbackUser?: any,
) => {
  if (fallbackUser) {
    if (isUserOnboarded(fallbackUser)) {
      router.replace("/feed");
    } else {
      router.replace("/onboarding/role");
    }

    return;
  }

  const profile = await getProfile();

  if (!profile.success) {
    router.replace("/sign-in");
    return;
  }

  const user = profile.data?.user;

  if (isUserOnboarded(user)) {
    router.replace("/feed");
  } else {
    router.replace("/onboarding/role");
  }
};
