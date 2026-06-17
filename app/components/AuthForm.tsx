"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register, startGoogleAuth } from "@/services/auth.service";
import { setToken } from "@/app/lib/auth";
import { redirectAuthenticatedUser } from "@/app/lib/authRedirect";
import { loginSchema, signUpSchema } from "@/app/lib/utils";

type AuthFormProps = {
  type: "Sign In" | "Sign Up";
};

const getLoginToken = (res: any) => {
  return (
    res?.token ||
    res?.data?.token ||
    res?.data?.data?.token ||
    res?.data?.access_token ||
    res?.data?.data?.access_token ||
    null
  );
};

const getLoginUser = (res: any) => {
  return res?.user || res?.data?.user || res?.data?.data?.user || null;
};

const getGoogleUrl = (res: any) => {
  return res?.url || res?.data?.url || res?.data?.data?.url || null;
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const isSignUp = type === "Sign Up";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    const validation = isSignUp
      ? signUpSchema.safeParse({ fullName, email, password })
      : loginSchema.safeParse({ email, password });

    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid form details.");
      setLoading(false);
      return;
    }

    if (isSignUp) {
      const res = await register({
        full_name: fullName.trim(),
        email: email.trim(),
        password,
      });

      setLoading(false);

      if (!res.success) {
        setError(res.message || "Unable to create account.");
        return;
      }

      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
      return;
    }

    const res = await login(email.trim(), password);

    setLoading(false);

    if (!res.success) {
      setError(res.message || "Incorrect email or password.");
      return;
    }

    const token = getLoginToken(res);
    const user = getLoginUser(res);

    if (!token) {
      setError("Login succeeded but no token was returned.");
      return;
    }

    setToken(token);
    await redirectAuthenticatedUser(router, user);
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setGoogleLoading(true);

    const res = await startGoogleAuth();

    setGoogleLoading(false);

    if (!res.success) {
      setError(res.message || "Unable to start Google authentication.");
      return;
    }

    const url = getGoogleUrl(res);

    if (!url) {
      setError("Google authentication URL was not returned.");
      return;
    }

    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-[#0F292A]">{type}</h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            {isSignUp
              ? "Create your AskWinFlow account"
              : "Welcome back to AskWinFlow"}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-[#C4BEBE] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-[#C4BEBE] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-[#C4BEBE] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
            />
          </div>

          {!isSignUp && (
            <Link
              href={`/forgot-password?email=${encodeURIComponent(email)}`}
              className="text-sm text-[#008080] text-right"
            >
              Forgot password?
            </Link>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-[#008080] text-white rounded-md py-3 font-semibold disabled:bg-gray-300 disabled:text-gray-600"
          >
            {loading ? "Please wait..." : type}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-500">or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading || googleLoading}
          className="w-full border border-[#C4BEBE] rounded-md py-3 font-semibold disabled:bg-gray-100"
        >
          {googleLoading
            ? "Redirecting..."
            : isSignUp
              ? "Sign up with Google"
              : "Sign in with Google"}
        </button>

        <p className="text-center text-sm mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="text-[#008080] font-medium"
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};
