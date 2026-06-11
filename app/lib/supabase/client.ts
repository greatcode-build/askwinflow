import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

supabase.auth.signInWithOAuth({
  provider: "google",
});

async function signUpNewUser() {
  const { data, error } = await supabase.auth.signUp({
    email: "",
    password: "",
    options: {
      emailRedirectTo: "http://localhost:3000/onboarding",
    },
  });
}

//  signUp()

// ---cut---
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "valid.email@supabase.io",
    password: "example-password",
  });
}

// signInWithPassword()

async function signOut() {
  const { error } = await supabase.auth.signOut();
}

// // ---cut---
// await supabase.auth.resetPasswordForEmail("valid.email@supabase.io", {
//   redirectTo: "http://example.com/account/update-password",
// });

// await supabase.auth.updateUser({ password: "new_password" });

// await supabase.auth.updateUser({
//   password: 'new_password',
//   currentPassword: 'old_password',
// })
