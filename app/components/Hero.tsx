"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-white pt-15 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2">
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

        <div className="flex flex-col items-center justify-between gap-14 lg:flex-row">
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#111111] sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Questions and
              <br /> Ideas Into <span className="text-[#A10F05]">Lasting</span>
              <br />
              <span className="text-[#A10F05]">Knowledge</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#29292B] sm:text-lg">
              Ask, discuss, and discover expert insights in one place.
              AskWinFlow transforms conversations into a searchable knowledge
              base through structured discussions, attachments, and
              community-driven ratings.
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
          <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="relative w-full max-w-130">
              <Image
                src="/image_1.png"
                alt="Community members"
                width={600}
                height={600}
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
