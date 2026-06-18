"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  saveTokensFromSearchParams,
  saveTokensFromUrlHash,
} from "@/app/lib/googleAuth";
import { getToken } from "@/app/lib/auth";
import { getProfile } from "@/services/profile.service";

const getUserFromProfileResponse = (res: any) => {
  return res?.data?.user || res?.data?.data?.user || res?.user || null;
};

const hasCompletedOnboarding = (user: any) => {
  if (!user) return false;

  const hasPersona = Boolean(user.persona);

  const hasGoals = Array.isArray(user.goals) && user.goals.length > 0;

  const hasTopics = Array.isArray(user.topics) && user.topics.length > 0;

  return Boolean(
    user.profile_completed ||
    user.onboarding_completed ||
    user.skipped_onboarding ||
    (hasPersona && hasGoals && hasTopics),
  );
};

export const OnboardingCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const savedFromQuery = saveTokensFromSearchParams(searchParams);
      const savedFromHash = saveTokensFromUrlHash();
      const token = getToken();

      if (!savedFromQuery && !savedFromHash && !token) {
        router.replace("/sign-in");
        return;
      }

      const profileRes = await getProfile();

      if (!profileRes.success) {
        router.replace("/onboarding/persona");
        return;
      }

      const user = getUserFromProfileResponse(profileRes);

      if (hasCompletedOnboarding(user)) {
        router.replace("/feed");
        return;
      }

      router.replace("/onboarding/persona");
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <h1 className="text-2xl font-semibold text-[#0F292A]">AskWinFlow</h1>
        <p className="mt-3 text-sm text-[#4A4A4A]">
          Preparing your onboarding...
        </p>
      </div>
    </div>
  );
};
