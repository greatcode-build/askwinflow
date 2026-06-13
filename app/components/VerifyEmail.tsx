"use client";

import { Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { resendVerificationEmail } from "@/services/auth.service";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setErrorMessage(null);
    setStatusMessage(null);

    if (!email) {
      setErrorMessage(
        "Unable to resend verification email without your address.",
      );
      return;
    }

    setLoading(true);
    const res = await resendVerificationEmail(email);
    setLoading(false);

    if (!res.success) {
      setErrorMessage(res.message || "Failed to resend verification email.");
      return;
    }

    setStatusMessage("Verification email resent. Please check your inbox.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-10 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080] mb-8">
          <Mail size={40} />
        </div>

        <h2 className="text-3xl font-semibold text-[#0F292A] mb-4">
          Check your Inbox!
        </h2>

        <p className="text-base leading-7 text-[#4A4A4A] max-w-2xl mx-auto mb-4">
          A verification email has been sent to your registered email address.
        </p>

        <p className="text-sm leading-7 text-[#4A4A4A] max-w-2xl mx-auto mb-6">
          To activate your AskWinFlow account, click the verification link in
          the email. Once verified, you will be able to join discussions, share
          insights, and discover knowledge from professionals across various
          industries.
        </p>

        <p className="text-sm leading-7 text-[#6F6F6F] max-w-2xl mx-auto mb-4">
          Didn’t receive the email? Check your spam folder or
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="ml-1 font-bold text-[#008080] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            resend verification email.
          </button>
        </p>

        {statusMessage && (
          <p className="mt-4 text-sm text-teal-700">{statusMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export { VerifyEmail };
