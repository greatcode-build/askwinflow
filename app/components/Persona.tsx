"use client";

import { useState } from "react";
import Image from "next/image";
import { interestOptions } from "@/constants";
import { ProgressBar } from "./ProgressBar";
import { updateProfile } from "@/services/profile.service";
import { useRouter } from "next/navigation";

const Persona = () => {
  const [selected, setSelected] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSelect = async (id: string) => {
    setError(null);
    setSelected(id);
    setLoadingId(id);

    const res = await updateProfile({ persona: id });

    setLoadingId(null);

    if (!res.success) {
      setError(res.message || "Failed to update persona.");
      return;
    }

    router.push("/onboarding/goals");
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-[#8B8C8C] px-4">
      <ProgressBar step={1} />

      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">Select your Persona</h1>
        </div>

        <div className="flex flex-col gap-3">
          {interestOptions.map((item) => {
            const isActive = selected === item.id;
            const isLoading = loadingId === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelect(item.id)}
                disabled={Boolean(loadingId)}
                className={`flex items-center gap-3 p-4 border rounded-md text-left cursor-pointer disabled:opacity-70
                  ${
                    isActive
                      ? "border-[#008080] bg-[#FFCDC266]"
                      : "border-gray-200"
                  }`}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={20}
                  height={20}
                />

                <div>
                  <h2>{item.title}</h2>
                  <p className="text-sm text-gray-600">
                    {isLoading ? "Saving..." : item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export { Persona };
