"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { resetPassword } from "@/services/auth.service";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await resetPassword({
      email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      token,
    });
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Unable to reset your password.");
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-10 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080] mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-semibold text-[#0F292A] mb-4">
            Password changed successfully
          </h2>
          <p className="text-sm leading-7 text-[#4A4A4A] mb-8">
            Your password has been updated. Use your new password to log in.
          </p>
          <button
            onClick={() => router.push("/sign-in")}
            className="bg-[#008080] text-white rounded-md px-6 py-3 text-lg font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080]">
            <Lock size={36} />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#0F292A]">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              Please enter a strong password to reset your password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">New Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Enter a new password"
              className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              placeholder="Confirm your new password"
              className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-lg font-semibold text-white ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#008080]"
            }`}
          >
            {loading ? "Resetting..." : "Send"}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export { ResetPassword };
