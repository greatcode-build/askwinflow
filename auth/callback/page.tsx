"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { setToken } from "@/app/lib/auth";
import { getProfile } from "@/services/profile.service";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
        return;
      }

      setToken(session.access_token);

      const profile = await getProfile();

      if (profile.data.user.profile_completed) {
        router.push("/feed");
      } else {
        router.push("/onboarding/persona");
      }
    };

    handleCallback();
  }, [router]);

  return <div>Signing you in...</div>;
}
