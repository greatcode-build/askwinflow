import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Image
            src="/frame_1.png"
            alt="Community members"
            width={100}
            height={100}
          />
          <p className="font-semibold">123+ Professionals Joined</p>
        </div>
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="max-w-5xl text-7xl font-bold leading-tight">
            Turn <span className="text-[#008080]">Questions</span> and{" "}
            <span className="text-[#008080]">Ideas</span> Into{" "}
            <span className="text-[#A10F05]">Lasting Knowledge</span>
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#29292B]">
            Ask, discuss, and discover expert insights in one place. AskWinFlow
            transforms
            <br />
            conversations into a searchable knowledge base through structured
            discussions,
            <br /> attachments, and community-driven ratings.
          </p>
          <button className="flex items-center gap-2 bg-[#008080] text-white px-6 py-3 rounded-md font-medium">
            Join A Community Now
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export { Hero };
