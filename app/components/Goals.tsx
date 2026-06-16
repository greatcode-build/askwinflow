"use client";

import { usageOptions } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import {
  updateProfile,
  getProfile,
  isProfileCompleted,
} from "@/services/profile.service";
import { getGoals } from "@/services/onboarding.service";

const Goals = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<Array<{ id: string; label: string }>>(
    [],
  );
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const profile = await getProfile();
        if (profile?.success && isProfileCompleted(profile)) {
          router.push("/feed");
          return;
        }
      } catch (err) {
        console.error("Failed to check profile completion:", err);
      } finally {
        setCheckingProfile(false);
      }
    };

    checkProfile();
  }, [router]);

  // load server-provided goals (with UUIDs) if available
  useEffect(() => {
    if (checkingProfile) {
      return;
    }

    (async () => {
      try {
        const res = await getGoals();
        console.debug("getGoals response:", res);

        if (res && res.success) {
          const body = res.data?.data ?? res.data?.goals ?? res.data ?? null;

          if (Array.isArray(body) && body.length > 0) {
            const mapped = body.map((g: any) => ({
              id: g.id || g.uuid || g.value || String(g),
              label: g.label || g.name || g.title || g.value || String(g),
            }));
            setOptions(mapped);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load server goals:", err);
      }

      setOptions(usageOptions.map((label) => ({ id: label, label })));
    })();
  }, [checkingProfile]);

  const handleNext = async () => {
    setError(null);
    setLoading(true);

    if (!usingServerIds) {
      setError(
        "Waiting for server goal UUIDs before saving. Please try again in a moment.",
      );
      setLoading(false);
      return;
    }

    const payloadGoals = selected;
    console.debug("Goals payload (ids):", payloadGoals);

    const res = await updateProfile({ goals: payloadGoals });

    if (!res || !res.success) {
      console.error("updateProfile failed:", res);

      // Surface validation errors to the user and stop progression so they
      // can adjust their selections. Don't auto-advance on 400.
      const msg =
        res?.message ||
        (typeof res?.data === "string" ? res.data : "Failed to save goals");
      setError(msg);
      setLoading(false);
      return;
    }

    router.push("/onboarding/topics");
  };

  const toggleOption = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const isSelected = (item: string) => selected.includes(item);
  const isUuid = (s: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      s,
    );
  const usingServerIds =
    options.length > 0 && options.every((o) => isUuid(o.id));

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking onboarding status...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-[#8B8C8C] px-4">
      <ProgressBar step={2} />
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            How would you use AskWinFlow?
          </h1>
          <p className="text-lg text-[#5E5C5C]">
            Set your learning and contribution goals
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`p-3 border border-[#6E6E6F] rounded-md text-sm transition text-left
        ${isSelected(opt.id) ? "bg-[#FFCDC266] border-[#6E6E6F]" : "bg-white border-gray-300"}
      `}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={() => router.push("/onboarding/persona")}
            className="px-4 flex text-center items-center gap-2 py-2 rounded-md text-sm"
          >
            <ArrowLeft />
            Back
          </button>
          <div className="flex items-center gap-2">
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!usingServerIds && (
              <p className="text-sm text-yellow-600">
                Server goal IDs not loaded; saving is disabled until server
                options are available.
              </p>
            )}
            <button
              onClick={handleNext}
              disabled={selected.length === 0 || loading || !usingServerIds}
              className={`px-4 py-2 rounded-md text-sm flex text-center gap-2 items-center
              ${selected.length === 0 || loading || !usingServerIds ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-[#008080] text-white"}
            `}
            >
              {loading ? "Saving..." : "Continue"} <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Goals };
