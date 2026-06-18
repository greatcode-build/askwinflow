"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import { sendPasswordResetEmail } from "@/services/auth.service";
import Image from "next/image";

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
    <div className="flex min-h-screen items-center justify-center bg-[#8B8C8C] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-[#D9D9D9] bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080]">
            <Lock size={36} />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#0F292A] sm:text-3xl">
              Forgot Password
            </h2>

            <p className="mt-2 text-sm text-[#4A4A4A]">
              Enter your details to reset your password
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#29292B] sm:text-base">
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
                placeholder="Enter your email address here"
                className="w-full rounded-md border border-[#C4BEBE] py-3 pl-11 pr-4 text-sm text-[#696868] outline-none focus:ring-1 focus:ring-[#008080]"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm text-teal-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-base font-semibold text-white transition sm:text-lg ${
              loading
                ? "cursor-not-allowed bg-gray-300 text-gray-600"
                : "bg-[#008080] hover:bg-[#006666]"
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
