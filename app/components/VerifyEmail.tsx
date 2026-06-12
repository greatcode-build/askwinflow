import { Mail } from "lucide-react";

const VerifyEmail = () => {
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

        <p className="text-sm leading-7 text-[#6F6F6F] max-w-2xl mx-auto">
          Didn’t receive the email? Check your spam folder or resend the
          verification email.
        </p>
      </div>
    </div>
  );
};

export { VerifyEmail };
