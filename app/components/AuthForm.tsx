"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signUpSchema, loginSchema } from "../lib/utils";
import { supabase } from "../lib/supabase/client";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  type: "Sign Up" | "Sign In";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const schema = type === "Sign Up" ? signUpSchema : loginSchema;
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (type === "Sign Up") {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/onboarding/1`,
        },
      });

      if (!error) {
        router.push("/check-email");
      }

      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (!error) {
      router.push("/feed");
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/feed`,
      },
    });
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
            onClick={handleGoogleLogin}
            className="border border-[#C4BEBE] rounded-md py-3 text-lg flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <Image src="/google.png" alt="Google" width={25} height={25} />
            Continue with Google
          </button>
          <div className="flex items-center gap-1">
            <div className="h-px bg-[#C4BEBE] flex-1" />
            <span>Or</span>
            <div className="h-px bg-[#C4BEBE] flex-1" />
          </div>
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
                    name="fullName"
                    onChange={handleChange}
                    value={formData.fullName}
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
                type="password"
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
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <Image src="/eye.png" alt="user" width={20} height={20} />
              </button>
            </div>
          </div>
          {type === "Sign Up" ? (
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-1 border-[#008080]"
                required
              />
              {errors.acceptTerms && (
                <p className="text-sm text-red-500">{errors.acceptTerms}</p>
              )}
              <p className="text-xs text-gray-600 leading-5">
                I agree to the
                <span className="text-[#008080]">
                  {" "}
                  Terms and Conditions
                </span>{" "}
                and have reviewed the
                <span className="text-[#008080]"> Privacy Policy</span>
              </p>
            </div>
          ) : null}
          <button
            type="submit"
            onClick={() => router.push("/onboarding/1")}
            className="text-lg bg-[#008080] text-white py-3 rounded-md font-semibold hover:opacity-90"
          >
            {type === "Sign Up" ? "Create Account" : "Log In"}
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
