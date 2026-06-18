"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { discussionsData } from "@/constants";
import Link from "next/link";
import { logout } from "@/services/auth.service";
import { clearAuthTokens, getToken } from "@/app/lib/auth";
import {
  saveTokensFromSearchParams,
  saveTokensFromUrlHash,
} from "@/app/lib/googleAuth";

const Feed = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showMenu, setShowMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  useEffect(() => {
    const savedFromQuery = saveTokensFromSearchParams(searchParams);
    const savedFromHash = saveTokensFromUrlHash();
    const token = getToken();

    if (!savedFromQuery && !savedFromHash && !token) {
      router.replace("/sign-in");
      return;
    }

    if (savedFromQuery) {
      router.replace("/feed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <nav className="bg-[#EEEEF0]">
        <div className="max-w-7xl mx-auto px-1 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Link href="/">
              <Image
                src="/askwinflow_logo.png"
                alt="AskWinFlow Logo"
                width={40}
                height={40}
              />
            </Link>
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

            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <Image
                  src="/profile-image.png"
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

              {showMenu && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-md z-50 py-1">
                  <button
                    onClick={() => router.push("/profile")}
                    className="w-full px-3 py-2 flex items-center gap-3 text-sm hover:bg-gray-100"
                  >
                    <Image
                      src="/user.png"
                      alt="profile"
                      width={14}
                      height={14}
                    />
                    <span>Profile</span>
                  </button>

                  <button
                    onClick={async () => {
                      setLogoutError(null);
                      setLogoutLoading(true);

                      try {
                        const res = await logout();

                        clearAuthTokens();

                        if (
                          !res.success &&
                          res.status !== 401 &&
                          res.status !== 403
                        ) {
                          setLogoutError(res.message || "Logout failed");
                          return;
                        }

                        router.replace("/sign-in");
                      } catch (err) {
                        console.error(err);
                        clearAuthTokens();
                        router.replace("/sign-in");
                      } finally {
                        setLogoutLoading(false);
                      }
                    }}
                    disabled={logoutLoading}
                    className="w-full px-3 py-2 flex items-center gap-3 text-sm hover:bg-gray-100 text-[#3A3A3C] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Image
                      src="/sign_out.png"
                      alt="logout"
                      width={14}
                      height={14}
                    />
                    <span>{logoutLoading ? "Logging out..." : "Logout"}</span>
                  </button>

                  {logoutError && (
                    <div className="px-3 py-2 text-xs text-red-600">
                      {logoutError}
                    </div>
                  )}
                </div>
              )}
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
              onClick={() => setShowFilter((prev) => !prev)}
            />

            {showFilter && (
              <div className="absolute right-0 top-14 w-20 bg-white border-none rounded-lg shadow-md z-50 py-2">
                <button className="w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-100">
                  <span>Tech</span>
                </button>
                <button className="w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-100">
                  <span>Edu</span>
                </button>
                <button className="w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-100">
                  <span>Product</span>
                </button>
              </div>
            )}
          </div>

          <button className="bg-[#008080] text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2">
            <Plus size={18} />
            New Post
          </button>
        </div>

        <div className="rounded-md pt-10 pb-10">
          <Image src="/image_1.png" alt="feed" width={900} height={900} />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Image src="/pulse.png" alt="pulse" width={20} height={20} />
          <h2 className="text-xl">Discussions based on community ratings</h2>
        </div>

        <div className="space-y-4">
          {discussionsData.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-[#EEEEF0] p-5 rounded-xl border border-[#B4B4B699]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#A2F0EF66] text-[#076969] border border-[#076969] text-xs px-2 py-1 rounded-md">
                  Tech
                </span>

                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <Image src="/Clock.png" alt="clock" width={14} height={14} />
                  <span>3 days ago</span>
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
                  <Image src="/star.png" alt="rating" width={16} height={16} />
                  <span className="text-sm">{post.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-md pt-10 pb-10">
          <Image src="/frame_6.png" alt="feed" width={900} height={900} />
        </div>
        <div className="flex items-center gap-2 pb-5">
          <Image src="/question.png" alt="feed" width={30} height={30} />
          <h3 className="text-[#3A3A3C]">Share your thought</h3>
        </div>

        <div className="space-y-4">
          {discussionsData.slice(-3).map((post) => (
            <div
              key={post.id}
              className="bg-[#EEEEF0] p-5 rounded-xl border border-[#B4B4B699]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#A2F0EF66] text-[#076969] border border-[#076969] text-xs px-2 py-1 rounded-md">
                  Tech
                </span>

                <div className="flex items-center gap-1 text-sm text-gray-700">
                  <Image src="/Clock.png" alt="clock" width={14} height={14} />
                  <span>3 days ago</span>
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
                  <Image src="/star.png" alt="rating" width={16} height={16} />
                  <span className="text-sm">{post.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export { Feed };
