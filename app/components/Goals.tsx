"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { updateProfile } from "@/services/profile.service";
import { getGoals } from "@/services/onboarding.service";

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

const extractGoals = (data: unknown): Option[] => {
  if (!isRecord(data)) return [];

  const goals = data.goals;

  if (!Array.isArray(goals)) return [];

  return goals.filter(isOption);
};

const Goals = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchGoals = async () => {
      setFetching(true);
      setError(null);

      const res = await getGoals();

      setFetching(false);

      if (!res.success) {
        setError(res.message || "Failed to load goals.");
        return;
      }

      const goals = extractGoals(res.data);
      setOptions(goals);
    };

    fetchGoals();
  }, []);

  const handleNext = async () => {
    if (selected.length === 0) return;

    setError(null);
    setLoading(true);

    const res = await updateProfile({ goals: selected });

    setLoading(false);

    if (!res.success) {
      setError(res.message || "Failed to save goals.");
      return;
    }

    router.push("/onboarding/topics");
  };

  const toggleOption = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

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

        {fetching ? (
          <p className="text-center text-sm">Loading goals...</p>
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
          <p className="text-sm text-red-500">No goals found.</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push("/onboarding/role")}
            className="px-4 flex items-center gap-2 py-2 rounded-md text-sm"
          >
            <ArrowLeft />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={selected.length === 0 || loading || fetching}
            className={`px-4 py-2 rounded-md text-sm flex gap-2 items-center
              ${
                selected.length === 0 || loading || fetching
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#008080] text-white"
              }`}
          >
            {loading ? "Saving..." : "Continue"} <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { Goals };
