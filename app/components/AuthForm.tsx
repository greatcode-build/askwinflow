"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/services/auth.service";
import { setToken } from "../lib/auth";
import { getProfile } from "@/services/profile.service";
import { signInWithGoogle } from "@/services/google-auth.service";

type AuthFormProps = {
  type: "Sign Up" | "Sign In";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [errors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "password" || name === "email") {
      setPasswordError(null);
      setFormError(null);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setFormError(null);
      setPasswordError(null);
      setLoading(true);

      if (type === "Sign Up") {
        const res = await register({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
        });

        if (!res.success) {
          setFormError(res.message || "Registration failed");
          setLoading(false);
          return;
        }

        router.push(
          `/verify-email?email=${encodeURIComponent(formData.email)}`,
        );
        return;
      }

      const res = await login(formData.email, formData.password);

      if (!res.success) {
        const message = res.message || "Login failed";
        if (message.toLowerCase().includes("password")) {
          setPasswordError("Incorrect password");
        } else {
          setFormError(message);
        }
        setLoading(false);
        return;
      }

      const token = res.data.token;

      if (!token) {
        setFormError("Missing token from server response");
        setLoading(false);
        return;
      }

      setToken(token);

      const profile = await getProfile();

      if (!profile || !profile.success) {
        setFormError(profile?.message || "Failed to fetch profile");
        setLoading(false);
        return;
      }

      if (profile.data.user.profile_completed) {
        router.push("/feed");
      } else {
        router.push("/onboarding/persona");
      }
    } catch (err) {
      console.error(err);
      setFormError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setFormError(null);
    setPasswordError(null);
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      setFormError("Unable to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-5">
          <Image
            src="/askwinflow_logo.png"
            alt="AskWinFlow Logo"
            width={70}
            height={70}
          />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold">
              {type === "Sign Up" ? "Create your account" : "Welcome Back!"}
            </h1>
            <p className="text-sm text-center">
              {type === "Sign Up"
                ? "Sign up to get started with AskWinFlow"
                : "Log in to your account to start exploring AskWinFlow"}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`border border-[#C4BEBE] rounded-md py-3 text-lg flex items-center justify-center gap-2 ${
              loading ? "cursor-not-allowed opacity-70" : "hover:bg-gray-50"
            }`}
          >
            <Image src="/google.png" alt="Google" width={25} height={25} />
            Continue with Google
          </button>
          <div className="flex items-center gap-1">
            <div className="h-px bg-[#C4BEBE] flex-1" />
            <span>Or</span>
            <div className="h-px bg-[#C4BEBE] flex-1" />
          </div>
          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}
          <div className="flex flex-col gap-1">
            {type === "Sign Up" ? (
              <>
                <label className="text-lg font-medium">Full Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Image src="/user.png" alt="user" width={20} height={20} />
                  </span>
                  <input
                    type="text"
                    name="full_name"
                    onChange={handleChange}
                    value={formData.full_name}
                    placeholder="Enter your surname first"
                    className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
                    required
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
              </>
            ) : null}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Email Address</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Image
                  src="/envelope_simple.png"
                  alt="user"
                  width={20}
                  height={20}
                />
              </span>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="Enter your email address here"
                className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">
              {type === "Sign Up" ? "Create Password" : "Enter Password"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Image src="/lock_key.png" alt="user" width={20} height={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Enter a strong password"
                className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
              {passwordError && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-red-500">{passwordError}</p>
                  <button
                    type="button"
                    onClick={() => {
                      const email = formData.email.trim();
                      if (!email) {
                        setFormError(
                          "Enter your email address to reset your password.",
                        );
                        return;
                      }
                      router.push(
                        `/forgot-password?email=${encodeURIComponent(email)}`,
                      );
                    }}
                    className="text-sm font-bold text-[#008080] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src="/eye.png"
                  alt="Toggle password visibility"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`text-lg py-3 rounded-md font-semibold hover:opacity-90 ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#008080] text-white"
            }`}
          >
            {loading
              ? "Please wait..."
              : type === "Sign Up"
                ? "Create Account"
                : "Log In"}
          </button>

          {type === "Sign Up" ? (
            <p className="text-xs text-center">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-xs text-[#008080] font-bold cursor-pointer"
              >
                Log In
              </Link>
            </p>
          ) : (
            <p className="text-xs text-center">
              Don’t have an account?
              <Link
                href="/sign-up"
                className="text-xs text-[#008080] font-bold cursor-pointer"
              >
                {" "}
                Sign Up
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export { AuthForm };
