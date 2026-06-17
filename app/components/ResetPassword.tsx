"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/services/auth.service";

export const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenFromQuery = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-[#0F292A]">
            Reset Password
          </h1>
          <p className="text-sm text-[#4A4A4A] mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-[#C4BEBE] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-[#C4BEBE] rounded-md px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#008080]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008080] text-white rounded-md py-3 font-semibold disabled:bg-gray-300 disabled:text-gray-600"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 text-center shadow-xl">
            <h2 className="text-2xl font-semibold text-[#0F292A]">
              Password reset successful
            </h2>

            <p className="text-sm text-gray-600 mt-3">
              You can now sign in with your new password.
            </p>

            <button
              onClick={() => router.replace("/sign-in")}
              className="mt-6 w-full bg-[#008080] text-white rounded-md py-3 font-semibold"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
