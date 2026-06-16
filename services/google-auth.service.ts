import { supabase } from "@/app/lib/supabase";

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/v1/callback`,
    },
  });

  if (error) {
    throw error;
  }
};
