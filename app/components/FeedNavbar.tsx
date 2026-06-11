"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { discussionsData } from "@/constants";

const Feed = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <nav className="bg-[#EEEEF0]">
        <div className="max-w-7xl mx-auto px-1 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/askwinflow_logo.png"
              alt="AskWinFlow Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-lg">AskWinFlow</span>
          </div>

          <div className="flex items-center gap-10">
            <ul className="hidden md:flex items-center gap-8">
              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <Image src="/house.png" alt="home" width={20} height={20} />
                <span className="text-sm">Home</span>
              </li>

              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <Image
                  src="/users_three.png"
                  alt="community"
                  width={20}
                  height={20}
                />
                <span className="text-sm">My Community</span>
              </li>

              <li className="flex flex-col items-center gap-1 cursor-pointer">
                <Image
                  src="/bell.png"
                  alt="notifications"
                  width={20}
                  height={20}
                />
                <span className="text-sm">Notifications</span>
              </li>
            </ul>

            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                src="/image_9.png"
                alt="profile"
                width={40}
                height={40}
                className="rounded-full"
              />

              <Image
                src="/caret_down.png"
                alt="dropdown"
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Image
              src="/magnifying_glass.png"
              alt="search"
              width={20}
              height={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
            />

            <input
              type="text"
              placeholder="Search Discussions"
              className="w-full bg-white border border-[#48484A] rounded-xl py-3 pl-12 pr-12 text-black outline-none"
            />

            <Image
              src="/faders.png"
              alt="filter"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </div>

          <button className="bg-[#008080] text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2">
            <Plus size={18} />
            New Post
          </button>
        </div>
        <section>
          <div className="flex">
            <Image
              src="/pulse.png"
              alt="pulse"
              width={20}
              height={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            />
            <h2 className="text-xl mb-6">
              Discussions based on community ratings
            </h2>
          </div>

          <div className="space-y-4">
            {discussionsData.map((post) => (
              <div
                key={post.id}
                className="bg-[#EEEEF0] p-5 rounded-xl border border-[#B4B4B699]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#A2F0EF66] text-[#076969] border border-[#076969] text-xs px-1 py-1 rounded-md">
                    Tech
                  </span>

                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Image
                      src="/clock.png"
                      alt="clock"
                      width={14}
                      height={14}
                    />
                    <span className="text-sm">3 days ago</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-black mb-4">
                  {post.text}
                </h3>
                <div className="flex items-center gap-4">
                  <Image
                    src={post.image}
                    alt={post.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />

                  <p className="text-sm font-medium">{post.name}</p>

                  <div className="flex items-center gap-1">
                    <Image
                      src="/chat_tear_drop.png"
                      alt="comments"
                      width={16}
                      height={16}
                    />
                    <span className="text-sm">{post.comment}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/star.png"
                      alt="rating"
                      width={16}
                      height={16}
                    />
                    <span className="text-sm">{post.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export { Feed };
