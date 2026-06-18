"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 sm:pt-15 not-last:sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 pb-8 sm:pb-10">
          <Image
            src="/frame_1.png"
            alt="Community members"
            width={90}
            height={90}
            className="h-9 w-auto object-contain sm:h-10"
          />

          <p className="text-sm font-semibold text-[#29292B] sm:text-base">
            123+ Professionals Joined
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-start">
          {/* Text Side */}
          <div className="w-full text-center lg:w-[45%] lg:text-left">
            <h1 className="max-w-none text-[32px] font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl md:text-[54px] lg:text-[54px] xl:text-[60px]">
              <span className="block whitespace-nowrap">
                Turn Questions and
              </span>

              <span className="block whitespace-nowrap">
                Ideas Into <span className="text-[#A10F05]">Lasting</span>
              </span>

              <span className="block text-[#A10F05]">Knowledge</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#29292B] sm:text-lg sm:leading-8 lg:mx-0">
              Ask, discuss, and discover expert insights in one place.
              AskWinFlow transforms conversations into a searchable knowledge
              base through structured discussions, attachments, and
              community-driven ratings.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={() => router.push("/sign-up")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#008080] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#006666] hover:shadow-lg active:scale-95 sm:px-7 sm:py-4 sm:text-base"
              >
                Explore Discussions
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex w-full justify-center lg:w-[55%] lg:justify-end">
            <div className="relative w-full max-w-130 sm:max-w-155 lg:max-w-180">
              <Image
                src="/image_1.png"
                alt="Community members"
                width={900}
                height={900}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
