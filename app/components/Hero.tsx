"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-white pt-[60px] pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 pb-10">
          <Image
            src="/frame_1.png"
            alt="Community members"
            width={90}
            height={90}
            className="h-10 w-auto object-contain"
          />
          <p className="text-sm font-semibold text-[#29292B] sm:text-base">
            123+ Professionals Joined
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:items-start">
          {/* Text Side */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h1 className="max-w-none text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px]">
              <span className="block whitespace-nowrap">
                Turn Questions and
              </span>

              <span className="block whitespace-nowrap">
                Ideas Into <span className="text-[#A10F05]">Lasting</span>
              </span>

              <span className="block text-[#A10F05]">Knowledge</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#29292B] sm:text-lg">
              Ask, discuss, and discover expert insights in one place.
              AskWinFlow transforms conversations into a searchable
              <br /> knowledge base through structured discussions,
              <br /> attachments, and community-driven ratings.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={() => router.push("/sign-up")}
                className="inline-flex items-center gap-2 rounded-lg bg-[#008080] px-7 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#006666] hover:shadow-lg active:scale-95"
              >
                Explore Discussions
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="relative w-full max-w-[620px]">
              <Image
                src="/image_1.png"
                alt="Community members"
                width={800}
                height={800}
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
