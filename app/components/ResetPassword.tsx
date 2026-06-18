"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth.service";
import Image from "next/image";

export const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenFromQuery = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const getToken = () => {
    if (tokenFromQuery) return tokenFromQuery;

    if (typeof window === "undefined") return null;

    const hashParams = new URLSearchParams(
      window.location.hash.replace("#", ""),
    );

    return (
      hashParams.get("token") ||
      hashParams.get("access_token") ||
      hashParams.get("recovery_token")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    const token = getToken();

    if (!token) {
      setError("Reset token is missing. Please request a new reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const res = await resetPassword({
      token,
      password,
      confirmPassword,
    });

    setLoading(false);

    if (!res.success) {
      setError(res.message || "Unable to reset password.");
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#8B8C8C] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-[#D9D9D9] bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#0F292A] sm:text-3xl">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-[#4A4A4A]">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#29292B]">
              New Password
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
                placeholder="Enter new password"
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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#29292B]">
              Confirm Password
            </label>

            <div className="relative">
              <Image
                src="/lock_key.png"
                alt="Confirm Password"
                width={20}
                height={20}
                className="absolute left-4 top-1/2 -translate-y-1/2"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-md border border-[#C4BEBE] py-3 pl-11 pr-12 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <Image
                  src={showConfirmPassword ? "/eye-off.svg" : "/eye.svg"}
                  alt={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#008080] py-3 font-semibold text-white transition hover:bg-[#006666] disabled:bg-gray-300 disabled:text-gray-600"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="text-2xl font-semibold text-[#0F292A]">
              Password reset successful
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              You can now sign in with your new password.
            </p>

            <button
              onClick={() => router.replace("/sign-in")}
              className="mt-6 w-full rounded-md bg-[#008080] py-3 font-semibold text-white"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
