"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resendVerificationEmail, verifyEmail } from "@/services/auth.service";
import { setToken } from "@/app/lib/auth";

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const getStringValue = (value: unknown): string | null => {
  return typeof value === "string" ? value : null;
};

const extractAuthToken = (data: unknown): string | null => {
  if (!isRecord(data)) return null;

  const nestedData = isRecord(data.data) ? data.data : null;

  return (
    getStringValue(data.token) ||
    getStringValue(data.access_token) ||
    getStringValue(nestedData?.token) ||
    getStringValue(nestedData?.access_token) ||
    null
  );
};

export const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const tokenFromQuery = searchParams.get("token");

  const [message, setMessage] = useState(
    "Please check your email and click the verification link.",
  );
  const [error, setError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const runVerification = async () => {
      let token = tokenFromQuery;

      if (!token && typeof window !== "undefined") {
        const hashParams = new URLSearchParams(
          window.location.hash.replace("#", ""),
        );

        token =
          hashParams.get("token") ||
          hashParams.get("access_token") ||
          hashParams.get("confirmation_token");
      }

      if (!token) return;

      setMessage("Verifying your email...");
      setError(null);

      const res = await verifyEmail(token);

      if (!res.success) {
        setError(res.message || "Unable to verify email.");
        return;
      }

      const authToken = extractAuthToken(res.data);

      if (authToken) {
        setToken(authToken);
      }

      router.replace("/onboarding/role");
    };

    runVerification();
  }, [router, tokenFromQuery]);

  const handleResend = async () => {
    if (!email) {
      setError("Email address is missing. Please go back and sign up again.");
      return;
    }

    setError(null);
    setResending(true);

    const res = await resendVerificationEmail(email);

    setResending(false);

    if (!res.success) {
      setError(res.message || "Unable to resend verification email.");
      return;
    }

    setMessage("Verification link resent. Please check your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8 text-center">
        <h1 className="text-3xl font-semibold text-[#0F292A]">
          Verify your email
        </h1>

        <p className="mt-4 text-sm text-[#4A4A4A]">{message}</p>

        {email && <p className="mt-2 text-sm font-medium">{email}</p>}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleResend}
          disabled={resending}
          className="mt-6 w-full bg-[#008080] text-white rounded-md py-3 font-semibold disabled:bg-gray-300 disabled:text-gray-600"
        >
          {resending ? "Sending..." : "Resend verification link"}
        </button>
      </div>
    </div>
  );
};
