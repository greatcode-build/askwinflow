"use client";

import { usageOptions } from "@/constants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const UsageStep = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const isSelected = (item: string) => selected.includes(item);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B8C8C] px-4">
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
          {usageOptions.map((item) => (
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
          <button className="px-4 flex text-center items-center gap-2 py-2 rounded-md text-sm">
            <ArrowLeft />
            Back
          </button>
          <button
            disabled={selected.length === 0}
            className={`px-4 py-2 rounded-md text-sm flex text-center gap-2 items-center
              ${
                selected.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#008080] text-white"
              }
            `}
          >
            Continue <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { UsageStep };
