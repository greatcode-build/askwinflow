"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();
  return (
    <section>
      <div className="flex bg-[#FFCDC233] p-15 text-center flex-col gap-6 items-center mt-20 mb-15">
        <h1 className="font-semibold text-3xl">
          Start Building Knowledge That Lasts
        </h1>
        <p className="max-w-3xl text-center text-lg leading-7 text-[#29292B]">
          Join a community of professionals, educators, and experts sharing
          insights, solving,
          <br /> challenges, and transforming everyday discussions into a
          searchable knowledge base.
        </p>
        <button
          onClick={() => router.push("/sign-up")}
          className="flex text-sm items-center gap-2 bg-[#008080] text-[#FFF9F9] px-15 py-3 rounded-md font-semibold cursor-pointer"
        >
          Get Started Free
          <ArrowRight />
        </button>
      </div>
    </section>
  );
};

export { CTA };
