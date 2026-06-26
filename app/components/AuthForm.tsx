"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, register, startGoogleAuth } from "@/services/auth.service";
import { setToken } from "@/app/lib/auth";
import { redirectAuthenticatedUser } from "@/app/lib/authRedirect";
import { loginSchema, signUpSchema } from "@/app/lib/utils";
import Image from "next/image";

type AuthFormProps = {
  type: "Sign In" | "Sign Up";
};

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};

const getLoginToken = (res: unknown): string | null => {
  if (!isRecord(res)) return null;

  const data = isRecord(res.data) ? res.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return (
    getStringValue(res.token) ||
    getStringValue(data?.token) ||
    getStringValue(nestedData?.token) ||
    getStringValue(data?.access_token) ||
    getStringValue(nestedData?.access_token) ||
    null
  );
};

const getLoginUser = (res: unknown): unknown | null => {
  if (!isRecord(res)) return null;

  const data = isRecord(res.data) ? res.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return res.user || data?.user || nestedData?.user || null;
};

const getGoogleUrl = (res: unknown): string | null => {
  if (!isRecord(res)) return null;

  const data = isRecord(res.data) ? res.data : null;
  const nestedData = data && isRecord(data.data) ? data.data : null;

  return (
    getStringValue(res.url) ||
    getStringValue(data?.url) ||
    getStringValue(nestedData?.url) ||
    null
  );
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const isSignUp = type === "Sign Up";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex min-h-screen items-center justify-center bg-[#8B8C8C] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-[#D9D9D9] bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-5 flex justify-center">
          <Image
            src="/askwinflow_logo.png"
            alt="AskWinFlow Logo"
            width={75}
            height={75}
            priority
            className="h-auto w-17.5 object-contain sm:w-18.75"
          />
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#0F292A] sm:text-3xl">
            {isSignUp ? "Create your Account" : "Welcome Back!"}
          </h1>

          <p className="mt-2 text-sm text-[#29292B]">
            {isSignUp
              ? "Sign up to get started with AskWinFlow"
              : "Log in to your account to start exploring AskWinFlow"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-[#C4BEBE] py-3 text-sm font-semibold text-[#29292B] transition hover:bg-gray-50 disabled:bg-gray-100 sm:text-base"
        >
          <Image src="/google.png" alt="Google" width={22} height={22} />
          <span>
            {googleLoading
              ? "Redirecting..."
              : isSignUp
                ? "Sign up with Google"
                : "Sign in with Google"}
          </span>
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#C4BEBE]" />
          <span className="text-sm text-gray-500">Or</span>
          <div className="h-px flex-1 bg-[#C4BEBE]" />
        </div>

        <form onSubmit={handleEmailAuth} className="flex flex-col gap-4">
          {isSignUp && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-[#29292B]">
                Full Name
              </label>

              <div className="relative">
                <Image
                  src="/user.png"
                  alt="User"
                  width={20}
                  height={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                />

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-md border border-[#C4BEBE] py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#29292B]">
              Email Address
            </label>

            <div className="relative">
              <Image
                src="/envelope_simple.png"
                alt="Email"
                width={20}
                height={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md border border-[#C4BEBE] py-3 pl-11 pr-4 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#29292B]">
              Password
            </label>

            <div className="relative">
              <Image
                src="/lock_key.png"
                alt="Password"
                width={20}
                height={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-md border border-[#C4BEBE] py-3 pl-11 pr-12 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src={showPassword ? "/eye-off.svg" : "/eye.svg"}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {!isSignUp && (
            <Link
              href={`/forgot-password?email=${encodeURIComponent(email)}`}
              className="text-right text-sm text-[#008080]"
            >
              Forgot password?
            </Link>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-md bg-[#008080] py-3 font-semibold text-white transition hover:bg-[#006666] disabled:bg-gray-300 disabled:text-gray-600"
          >
            {loading
              ? "Please wait..."
              : isSignUp
                ? "Create Account"
                : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-medium text-[#008080]"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};
