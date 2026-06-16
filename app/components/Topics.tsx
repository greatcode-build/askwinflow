"use client";

import { topicsOptions } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import {
  updateProfile,
  getProfile,
  isProfileCompleted,
} from "@/services/profile.service";
import { getTopics } from "@/services/onboarding.service";

const Topics = () => {
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

  useEffect(() => {
    if (checkingProfile) {
      return;
    }

    (async () => {
      try {
        const res = await getTopics();
        console.debug("getTopics response:", res);

        if (res && res.success) {
          const body = res.data?.data ?? res.data?.topics ?? res.data ?? null;
          const topicArray = Array.isArray(body)
            ? body
            : body && typeof body === "object"
              ? (Object.values(body).find(Array.isArray) ?? [])
              : [];

          if (Array.isArray(topicArray) && topicArray.length > 0) {
            const mapped = topicArray.map((t: Record<string, unknown>) => {
              const idValue =
                t.uuid ||
                t.topic_uuid ||
                t.topicId ||
                t.topic_id ||
                t.id ||
                t.value ||
                t;
              const labelValue =
                t.label || t.name || t.title || t.value || t.text || t;

              return {
                id: String(idValue),
                label: String(labelValue),
              };
            });

            if (mapped.length > 0) {
              setOptions(mapped);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Failed to load server topics:", err);
      }

      setOptions(topicsOptions.map((t) => ({ id: t.id, label: t.label })));
    })();
  }, [checkingProfile]);

  const isUuid = (s: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      s,
    );
  const usingServerIds =
    options.length > 0 && options.every((o) => isUuid(o.id));

  const handleFinish = async () => {
    setError(null);
    setLoading(true);

    if (!usingServerIds) {
      setError(
        "Waiting for server topic UUIDs before saving. Please try again in a moment.",
      );
      setLoading(false);
      return;
    }

    const res = await updateProfile({ topics: selected });

    if (!res || !res.success) {
      console.error("updateProfile topics failed:", res);
      const msg =
        res?.message ||
        (typeof res?.data === "string" ? res.data : "Failed to save topics");
      setError(msg);
      setLoading(false);
      return;
    }

    const profile = await getProfile();

    if (!profile || !profile.success) {
      setError(profile?.message || "Failed to fetch profile");
      setLoading(false);
      return;
    }

    router.push("/feed");
  };
  const toggleOption = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const isSelected = (item: string) => selected.includes(item);

  if (checkingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking onboarding status...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-[#8B8C8C] px-4">
      <ProgressBar step={3} />
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">
            Follow Relevant Communities or Topics
          </h1>
          <p className="text-lg text-[#5E5C5C]">
            Follow topics and communities to get you started with AskWinFlow
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
            onClick={() => router.push("/onboarding/goals")}
            className="px-4 flex text-center items-center gap-2 py-2 rounded-md text-sm"
          >
            <ArrowLeft />
            Back
          </button>
          <div className="flex items-center gap-2">
            {error && <p className="text-sm text-red-500">{error}</p>}
            {!usingServerIds && (
              <p className="text-sm text-yellow-600">
                Server topic UUIDs are still loading or unavailable. Saving is
                disabled until valid IDs are loaded.
              </p>
            )}
            <button
              onClick={handleFinish}
              disabled={selected.length === 0 || loading || !usingServerIds}
              className={`px-4 py-2 rounded-md text-sm flex text-center gap-2 items-center
              ${
                selected.length === 0 || loading || !usingServerIds
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#008080] text-white"
              }
            `}
            >
              {loading ? "Saving..." : "Got to Feed"} <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Topics };
