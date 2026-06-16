"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { setToken } from "@/app/lib/auth";
import { getProfile } from "@/services/profile.service";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const finishGoogleLogin = async () => {
      try {
        await supabase.auth.getSession();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.replace("/sign-in");
          return;
        }

        setToken(session.access_token);

        const profile = await getProfile();

        if (!profile?.success) {
          router.replace("/sign-in");
          return;
        }

        const user = profile.data.user;

        if (user.profile_completed) {
          router.replace("/feed");
        } else {
          router.replace("/onboarding/persona");
        }
      } catch (error) {
        console.error(error);
        router.replace("/sign-in");
      }
    };

    finishGoogleLogin();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}
