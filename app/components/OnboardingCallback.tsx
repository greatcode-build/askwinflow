"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  saveTokensFromSearchParams,
  saveTokensFromUrlHash,
} from "@/app/lib/googleAuth";
import { getToken } from "@/app/lib/auth";

export const OnboardingCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedFromQuery = saveTokensFromSearchParams(searchParams);
    const savedFromHash = saveTokensFromUrlHash();
    const existingToken = getToken();

    if (!savedFromQuery && !savedFromHash && !existingToken) {
      router.replace("/sign-in");
      return;
    }

    router.replace("/onboarding/persona");
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
