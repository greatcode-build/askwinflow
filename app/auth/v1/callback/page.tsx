"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { setToken } from "@/app/lib/auth";
import { getProfile, isProfileCompleted } from "@/services/profile.service";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      const session = data.session;

      if (!session) {
        router.replace("/sign-in");
        return;
      }

      await setToken(session.access_token);

      const profile = await getProfile();

      if (isProfileCompleted(profile)) {
        router.replace("/feed");
      } else {
        router.replace("/onboarding/persona");
      }
    };

    run();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}
