"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { sendPasswordResetEmail } from "@/services/auth.service";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim()) {
      setError("Please enter your email to receive a reset link.");
      return;
    }

    setLoading(true);
    const res = await sendPasswordResetEmail(email.trim());
    setLoading(false);

    if (!res.success) {
      setError(res.message || "Unable to send reset link.");
      return;
    }

    setMessage(
      "A password reset link has been sent to your email. Click it to reset your password.",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080]">
            <Lock size={36} />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[#0F292A]">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A]">
              Enter your details to reset your password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-lg font-medium">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address here"
              className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-teal-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-lg font-semibold text-white ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#008080]"
            }`}
          >
            {loading ? "Sending..." : "Send"}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export { ForgotPassword };
