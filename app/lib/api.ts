const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const API_URL = rawApiUrl.replace(/\/+$/, "");

export const buildApiUrl = (endpoint: string) => {
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${API_URL}${normalizedEndpoint}`;
};

// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Lock, ArrowRight, CheckCircle2 } from "lucide-react";
// import { resetPassword } from "@/services/auth.service";

// const ResetPassword = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const token = searchParams.get("token");
//   const email = searchParams.get("email") || "";

//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!formData.password || !formData.confirmPassword) {
//       setError("Please fill in both password fields.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     const res = await resetPassword({
//       email,
//       password: formData.password,
//       confirmPassword: formData.confirmPassword,
//       token,
//     });
//     setLoading(false);

//     if (!res.success) {
//       setError(res.message || "Unable to reset your password.");
//       return;
//     }

//     setSuccess(true);
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
//         <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-10 text-center">
//           <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080] mb-8">
//             <CheckCircle2 size={40} />
//           </div>
//           <h2 className="text-3xl font-semibold text-[#0F292A] mb-4">
//             Password changed successfully
//           </h2>
//           <p className="text-sm leading-7 text-[#4A4A4A] mb-8">
//             Your password has been updated. Use your new password to log in.
//           </p>
//           <button
//             onClick={() => router.push("/sign-in")}
//             className="bg-[#008080] text-white rounded-md px-6 py-3 text-lg font-semibold"
//           >
//             Log In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
//         <div className="flex flex-col items-center gap-4 mb-6">
//           <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080]">
//             <Lock size={36} />
//           </div>
//           <div className="text-center">
//             <h2 className="text-3xl font-semibold text-[#0F292A]">
//               Reset your password
//             </h2>
//             <p className="mt-2 text-sm text-[#4A4A4A]">
//               Please enter a strong password to reset your password
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-medium">New Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData((prev) => ({ ...prev, password: e.target.value }))
//                 }
//                 placeholder="Enter a new password"
//                 className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 <img
//                   src="/eye.png"
//                   alt="Toggle password visibility"
//                   className="h-5 w-5"
//                 />
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-medium">Confirm Password</label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={formData.confirmPassword}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     confirmPassword: e.target.value,
//                   }))
//                 }
//                 placeholder="Confirm your new password"
//                 className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                 aria-label={
//                   showConfirmPassword
//                     ? "Hide confirm password"
//                     : "Show confirm password"
//                 }
//               >
//                 <img
//                   src="/eye.png"
//                   alt="Toggle password visibility"
//                   className="h-5 w-5"
//                 />
//               </button>
//             </div>
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-lg font-semibold text-white ${
//               loading
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-[#008080]"
//             }`}
//           >
//             {loading ? "Resetting..." : "Send"}
//             <ArrowRight size={18} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export { ResetPassword };

// "use client";

// import { Mail } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { resendVerificationEmail } from "@/services/auth.service";

// const VerifyEmail = () => {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") ?? "";
//   const [statusMessage, setStatusMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleResend = async () => {
//     setErrorMessage(null);
//     setStatusMessage(null);

//     if (!email) {
//       setErrorMessage(
//         "Unable to resend verification email without your address.",
//       );
//       return;
//     }

//     setLoading(true);
//     const res = await resendVerificationEmail(email);
//     setLoading(false);

//     if (!res.success) {
//       setErrorMessage(res.message || "Failed to resend verification email.");
//       return;
//     }

//     setStatusMessage("Verification email resent. Please check your inbox.");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4 py-10">
//       <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-10 text-center">
//         <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080] mb-8">
//           <Mail size={40} />
//         </div>

//         <h2 className="text-3xl font-semibold text-[#0F292A] mb-4">
//           Check your Inbox!
//         </h2>

//         <p className="text-base leading-7 text-[#4A4A4A] max-w-2xl mx-auto mb-4">
//           A verification email has been sent to your registered email address.
//         </p>

//         <p className="text-sm leading-7 text-[#4A4A4A] max-w-2xl mx-auto mb-6">
//           To activate your AskWinFlow account, click the verification link in
//           the email. Once verified, you will be able to join discussions, share
//           insights, and discover knowledge from professionals across various
//           industries.
//         </p>

//         <p className="text-sm leading-7 text-[#6F6F6F] max-w-2xl mx-auto mb-4">
//           Didn’t receive the email? Check your spam folder or
//           <button
//             type="button"
//             onClick={handleResend}
//             disabled={loading}
//             className="ml-1 font-bold text-[#008080] hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
//           >
//             resend verification email.
//           </button>
//         </p>

//         {statusMessage && (
//           <p className="mt-4 text-sm text-teal-700">{statusMessage}</p>
//         )}
//         {errorMessage && (
//           <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export { VerifyEmail };

// "use client";

// import { topicsOptions } from "@/constants";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { ProgressBar } from "./ProgressBar";
// import {
//   updateProfile,
//   getProfile,
//   isProfileCompleted,
// } from "@/services/profile.service";
// import { getTopics } from "@/services/onboarding.service";

// const Topics = () => {
//   const [selected, setSelected] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [checkingProfile, setCheckingProfile] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [options, setOptions] = useState<Array<{ id: string; label: string }>>(
//     [],
//   );
//   const router = useRouter();

//   useEffect(() => {
//     const checkProfile = async () => {
//       try {
//         const profile = await getProfile();
//         if (profile?.success && isProfileCompleted(profile)) {
//           router.push("/feed");
//           return;
//         }
//       } catch (err) {
//         console.error("Failed to check profile completion:", err);
//       } finally {
//         setCheckingProfile(false);
//       }
//     };

//     checkProfile();
//   }, [router]);

//   useEffect(() => {
//     if (checkingProfile) {
//       return;
//     }

//     (async () => {
//       try {
//         const res = await getTopics();
//         console.debug("getTopics response:", res);

//         if (res && res.success) {
//           const body = res.data?.data ?? res.data?.topics ?? res.data ?? null;
//           const topicArray = Array.isArray(body)
//             ? body
//             : body && typeof body === "object"
//               ? (Object.values(body).find(Array.isArray) ?? [])
//               : [];

//           if (Array.isArray(topicArray) && topicArray.length > 0) {
//             const mapped = topicArray.map((t: Record<string, unknown>) => {
//               const idValue =
//                 t.uuid ||
//                 t.topic_uuid ||
//                 t.topicId ||
//                 t.topic_id ||
//                 t.id ||
//                 t.value ||
//                 t;
//               const labelValue =
//                 t.label || t.name || t.title || t.value || t.text || t;

//               return {
//                 id: String(idValue),
//                 label: String(labelValue),
//               };
//             });

//             if (mapped.length > 0) {
//               setOptions(mapped);
//               return;
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Failed to load server topics:", err);
//       }

//       setOptions(topicsOptions.map((t) => ({ id: t.id, label: t.label })));
//     })();
//   }, [checkingProfile]);

//   const isUuid = (s: string) =>
//     /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
//       s,
//     );
//   const usingServerIds =
//     options.length > 0 && options.every((o) => isUuid(o.id));

//   const handleFinish = async () => {
//     setError(null);
//     setLoading(true);

//     if (!usingServerIds) {
//       setError(
//         "Waiting for server topic UUIDs before saving. Please try again in a moment.",
//       );
//       setLoading(false);
//       return;
//     }

//     const res = await updateProfile({ topics: selected });

//     if (!res || !res.success) {
//       console.error("updateProfile topics failed:", res);
//       const msg =
//         res?.message ||
//         (typeof res?.data === "string" ? res.data : "Failed to save topics");
//       setError(msg);
//       setLoading(false);
//       return;
//     }

//     const profile = await getProfile();

//     if (!profile || !profile.success) {
//       setError(profile?.message || "Failed to fetch profile");
//       setLoading(false);
//       return;
//     }

//     router.push("/feed");
//   };
//   const toggleOption = (item: string) => {
//     setSelected((prev) =>
//       prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
//     );
//   };

//   const isSelected = (item: string) => selected.includes(item);

//   if (checkingProfile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Checking onboarding status...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-[#8B8C8C] px-4">
//       <ProgressBar step={3} />
//       <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-semibold">
//             Follow Relevant Communities or Topics
//           </h1>
//           <p className="text-lg text-[#5E5C5C]">
//             Follow topics and communities to get you started with AskWinFlow
//           </p>
//         </div>
//         <div className="flex flex-col gap-3">
//           {options.map((opt) => (
//             <button
//               key={opt.id}
//               onClick={() => toggleOption(opt.id)}
//               className={`p-3 border border-[#6E6E6F] rounded-md text-sm transition text-left
//         ${isSelected(opt.id) ? "bg-[#FFCDC266] border-[#6E6E6F]" : "bg-white border-gray-300"}
//       `}
//             >
//               {opt.label}
//             </button>
//           ))}
//         </div>

//         <div className="flex justify-between pt-4">
//           <button
//             onClick={() => router.push("/onboarding/goals")}
//             className="px-4 flex text-center items-center gap-2 py-2 rounded-md text-sm"
//           >
//             <ArrowLeft />
//             Back
//           </button>
//           <div className="flex items-center gap-2">
//             {error && <p className="text-sm text-red-500">{error}</p>}
//             {!usingServerIds && (
//               <p className="text-sm text-yellow-600">
//                 Server topic UUIDs are still loading or unavailable. Saving is
//                 disabled until valid IDs are loaded.
//               </p>
//             )}
//             <button
//               onClick={handleFinish}
//               disabled={selected.length === 0 || loading || !usingServerIds}
//               className={`px-4 py-2 rounded-md text-sm flex text-center gap-2 items-center
//               ${
//                 selected.length === 0 || loading || !usingServerIds
//                   ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                   : "bg-[#008080] text-white"
//               }
//             `}
//             >
//               {loading ? "Saving..." : "Got to Feed"} <ArrowRight />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Topics };

// "use client";

// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { Lock, ArrowRight } from "lucide-react";
// import { sendPasswordResetEmail } from "@/services/auth.service";

// const ForgotPassword = () => {
//   const searchParams = useSearchParams();
//   const [email, setEmail] = useState(searchParams.get("email") ?? "");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     if (!email.trim()) {
//       setError("Please enter your email to receive a reset link.");
//       return;
//     }

//     setLoading(true);
//     const res = await sendPasswordResetEmail(email.trim());
//     setLoading(false);

//     if (!res.success) {
//       setError(res.message || "Unable to send reset link.");
//       return;
//     }

//     setMessage(
//       "A password reset link has been sent to your email. Click it to reset your password.",
//     );
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-[#D9D9D9] p-8">
//         <div className="flex flex-col items-center gap-4 mb-6">
//           <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E6FFFE] text-[#008080]">
//             <Lock size={36} />
//           </div>
//           <div className="text-center">
//             <h2 className="text-3xl font-semibold text-[#0F292A]">
//               Forgot Password
//             </h2>
//             <p className="mt-2 text-sm text-[#4A4A4A]">
//               Enter your details to reset your password
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-medium">Email Address</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email address here"
//               className="text-[#696868] w-full border border-[#C4BEBE] rounded-md pl-4 pr-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#008080]"
//               required
//             />
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}
//           {message && <p className="text-sm text-teal-700">{message}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`flex items-center justify-center gap-2 rounded-md px-4 py-3 text-lg font-semibold text-white ${
//               loading
//                 ? "bg-gray-300 text-gray-600 cursor-not-allowed"
//                 : "bg-[#008080]"
//             }`}
//           >
//             {loading ? "Sending..." : "Send"}
//             <ArrowRight size={18} />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export { ForgotPassword };
