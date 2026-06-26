"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { updateProfile } from "@/services/profile.service";
import { getTopics } from "@/services/onboarding.service";

type Option = {
  id: string;
  label: string;
};

type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord => {
  return typeof value === "object" && value !== null;
};

const isOption = (value: unknown): value is Option => {
  if (!isRecord(value)) return false;

  return typeof value.id === "string" && typeof value.label === "string";
};

const extractTopics = (data: unknown): Option[] => {
  if (!isRecord(data)) return [];

  const topics = data.topics;

  if (!Array.isArray(topics)) return [];

  return topics.filter(isOption);
};

const Topics = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      setFetching(true);
      setError(null);

      const res = await getTopics();

      setFetching(false);

      if (!res.success) {
        setError(res.message || "Failed to load topics.");
        return;
      }

      const topics = extractTopics(res.data);
      setOptions(topics);
    };

    fetchTopics();
  }, []);

  const handleFinish = async () => {
    if (selected.length === 0) return;

    setError(null);
    setLoading(true);

    const res = await updateProfile({ topics: selected });

    setLoading(false);

    if (!res.success) {
      setError(res.message || "Failed to save topics.");
      return;
    }

    router.push("/feed");
  };

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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

        {fetching ? (
          <p className="text-center text-sm">Loading topics...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {options.map((item) => {
              const isSelected = selected.includes(item.id);

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleOption(item.id)}
                  className={`p-3 border rounded-md text-sm transition text-left
                    ${
                      isSelected
                        ? "bg-[#FFCDC266] border-[#6E6E6F]"
                        : "bg-white border-gray-300"
                    }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {!fetching && options.length === 0 && !error && (
          <p className="text-sm text-red-500">No topics found.</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/goals")}
            className="px-4 flex items-center gap-2 py-2 rounded-md text-sm"
          >
            <ArrowLeft />
            Back
          </button>

          <button
            type="button"
            onClick={handleFinish}
            disabled={selected.length === 0 || loading || fetching}
            className={`px-4 py-2 rounded-md text-sm flex gap-2 items-center
              ${
                selected.length === 0 || loading || fetching
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#008080] text-white"
              }`}
          >
            {loading ? "Saving..." : "Go to Feed"} <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { Topics };
