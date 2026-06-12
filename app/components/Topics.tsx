"use client";

import { topicsOptions } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { updateProfile } from "@/services/profile.service";
import { getProfile } from "@/services/profile.service";

const Topics = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const handleFinish = async () => {
    await updateProfile({
      topics: selected,
    });

    const profile = await getProfile();

    if (profile.data.user.profile_completed) {
      router.push("/feed");
    }
  };
  const toggleOption = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const isSelected = (item: string) => selected.includes(item);

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
          {topicsOptions.map((item) => (
            <button
              key={item}
              onClick={() => toggleOption(item)}
              className={`p-3 border border-[#6E6E6F] rounded-md text-sm transition text-left
        ${
          isSelected(item)
            ? "bg-[#FFCDC266] border-[#6E6E6F]"
            : "bg-white border-gray-300"
        }
      `}
            >
              {item}
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
          <button
            onClick={handleFinish}
            disabled={selected.length === 0}
            className={`px-4 py-2 rounded-md text-sm flex text-center gap-2 items-center
              ${
                selected.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#008080] text-white"
              }
            `}
          >
            Got to Feed <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { Topics };
