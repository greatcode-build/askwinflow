"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveTokensFromUrlHash } from "@/app/lib/googleAuth";
import { redirectAuthenticatedUser } from "@/app/lib/authRedirect";

const OnboardingCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      saveTokensFromUrlHash();
      await redirectAuthenticatedUser(router);
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Preparing your onboarding...
    </div>
  );
};

export default OnboardingCallbackPage;
