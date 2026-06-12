"use client";

import { useState } from "react";
import Image from "next/image";
import { interestOptions } from "@/constants";
import { ProgressBar } from "./ProgressBar";
import { updateProfile } from "@/services/profile.service";
import { useRouter } from "next/navigation";

const Persona = () => {
  const [selected, setSelected] = useState("professional");
  const router = useRouter();

  const handleSelect = async (id: string) => {
    setSelected(id);

    await updateProfile({
      persona: id,
    });

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

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer
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
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Persona };
