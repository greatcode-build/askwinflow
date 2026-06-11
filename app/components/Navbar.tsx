"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div>
      <nav className="bg-[#EEEEF0]">
        <div className="max-w-7xl mx-auto px-3 py-4 flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/askwinflow_logo.png"
              alt="AskWinFlow Logo"
              width={40}
              height={40}
            />
            <span className="font-semibold cursor-pointer">AskWinFlow</span>
          </div>
          <div className="ml-auto flex justify-between items-center gap-30">
            <ul className="hidden md:flex gap-10">
              <li>Home</li>
              <li>Features</li>
              <li>How it Works</li>
            </ul>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/sign-up")}
                className="font-medium cursor-pointer"
              >
                Login In
              </button>
              <button
                onClick={() => router.push("/sign-up")}
                className="px-4 py-2 bg-[#008080] text-white rounded-md font-medium cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export { Navbar };
