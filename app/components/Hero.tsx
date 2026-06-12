"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="mt-10 py-20 relative bg-[url('/home.png')]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-3">
            <Image
              src="/frame_1.png"
              alt="Community members"
              width={100}
              height={100}
            />
            <p className="font-semibold">123+ Professionals Joined</p>
          </div>
        </div>

        <div className="w-[150px] bg-[#FFFFFF] p-2 rounded-xl border border-[#B4B4B6] absolute top-[13%] right-37">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <span className="bg-[#EFFF1033] text-[#A3A303] border border-[#A3A303] text-[9px] px-1 py-[3px] rounded-md">
                Tech
              </span>

              <div className="flex items-center gap-1 text-[9px] text-gray-700">
                <Image src="/clock.png" alt="clock" width={9} height={9} />
                <span>3 days</span>
              </div>
            </div>
          </div>

          <h3 className="text-[9px] font-semibold text-black mb-2 leading-tight">
            Rust vs. Go for building CLI
          </h3>

          <div className="flex items-center gap-2 text-[10px]">
            <div className="flex items-center gap-1">
              <Image
                src="/image_9.png"
                alt="user"
                width={18}
                height={18}
                className="rounded-full"
              />
              <span>Kelvin Park</span>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/chat_tear_drop.png"
                alt="chat"
                width={11}
                height={11}
              />
              <span>200</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center gap-8 relative">
          <h1 className="max-w-5xl text-7xl font-bold leading-tight">
            Turn <span className="text-[#008080]">Questions</span> and{" "}
            <span className="text-[#008080]">Ideas</span> Into{" "}
            <span className="text-[#A10F05]">Lasting Knowledge</span>
          </h1>
          <div className="absolute top-[53%] left-40 -translate-x-1/2">
            <div className="w-[150px] bg-[#FFFFFF] p-2 rounded-xl border border-[#B4B4B6]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  <span className="bg-[#635DFF66] text-[#050F79] border border-[#050F79] text-[9px] px-1 py-[3px] rounded-md">
                    Edu
                  </span>

                  <div className="flex items-center gap-1 text-[9px] text-gray-700">
                    <Image src="/clock.png" alt="clock" width={9} height={9} />
                    <span>3 days</span>
                  </div>
                </div>
              </div>
              <h3 className="text-[9px] font-semibold text-black mb-2 leading-tight">
                Rust vs. Go for building CLI
              </h3>

              <div className="flex items-center gap-2 text-[10px]">
                <div className="flex items-center gap-1">
                  <Image
                    src="/image_9.png"
                    alt="user"
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                  <span>Kelvin Park</span>
                </div>

                <div className="flex items-center gap-1">
                  <Image
                    src="/chat_tear_drop.png"
                    alt="chat"
                    width={11}
                    height={11}
                  />
                  <span>200</span>
                </div>
              </div>
            </div>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-[#29292B]">
            Ask, discuss, and discover expert insights in one place. AskWinFlow
            transforms
            <br />
            conversations into a searchable knowledge base through structured
            discussions,
            <br /> attachments, and community-driven ratings.
          </p>

          <button
            onClick={() => router.push("/sign-up")}
            className="flex items-center gap-2 bg-[#008080] text-white px-6 py-3 rounded-md font-medium cursor-pointer"
          >
            Join A Community Now
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export { Hero };
