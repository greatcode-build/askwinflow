"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-20 lg:px-8">
        <h1 className="max-w-3xl text-2xl font-semibold text-[#111111] sm:text-3xl lg:text-4xl">
          Start Building Knowledge That Lasts
        </h1>

        <p className="max-w-3xl text-base leading-7 text-[#29292B] sm:text-lg">
          Join a community of professionals, educators, and experts sharing
          insights, solving challenges, and transforming everyday discussions
          into a searchable knowledge base.
        </p>

        <button
          onClick={() => router.push("/sign-up")}
          className="inline-flex items-center gap-2 rounded-md bg-[#008080] px-8 py-3 text-sm font-semibold text-[#FFF9F9] transition hover:bg-[#006666] sm:px-12"
        >
          Get Started Free
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
};

export { CTA };
