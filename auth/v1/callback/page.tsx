"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { setToken } from "@/app/lib/auth";
import { getProfile } from "@/services/profile.service";

export default function CallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/sign-in");
          return;
        }

        setToken(session.access_token);

        const profile = await getProfile();

        if (!profile || !profile.success) {
          setError(profile?.message || "Failed to fetch profile");
          return;
        }

        const user = profile.data?.user ?? profile.data;

        if (!user || typeof user.profile_completed !== "boolean") {
          setError("Unable to determine profile completion status.");
          return;
        }

        if (user.profile_completed) {
          router.push("/feed");
        } else {
          router.push("/onboarding/persona");
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred during sign-in");
      }
    };

    handleCallback();
  }, [router]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}
