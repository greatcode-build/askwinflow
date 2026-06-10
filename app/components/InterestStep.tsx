"use client";

import { useState } from "react";
import Image from "next/image";
import { interestOptions } from "@/constants";
import { ProgressBar } from "./ProgressBar";

const InterestStep = () => {
  const [selected, setSelected] = useState("professional");

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-[#8B8C8C] px-4">
      <ProgressBar />
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold">
            Select your Area of Interest
          </h1>
          <p className="text-[#5E5C5C] text-sm text-center">
            Choose your role, this helps you personalize experience.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {interestOptions.map((item) => {
            const isActive = selected === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`flex items-center gap-3 p-4 border rounded-md cursor-pointer transition
                  ${isActive ? "border-[#B4B4B6] bg-[#FFCDC266]" : "border-gray-200"}
                `}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full
                    ${isActive ? "bg-[#FFCDC266]" : "bg-[#EEEEF0]"}
                  `}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={20}
                    height={20}
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-[#5E5C5C]">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { InterestStep };
