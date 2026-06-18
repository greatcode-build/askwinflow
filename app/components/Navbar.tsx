"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="bg-[#EEEEF0]">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-1"
          >
            <Image
              src="/askwinflow_logo.png"
              alt="AskWinFlow Logo"
              width={40}
              height={40}
            />
            <span className="font-semibold">AskWinFlow</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-20 md:flex">
            <ul className="flex items-center gap-10">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Features</li>
              <li className="cursor-pointer">How it Works</li>
            </ul>

            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/sign-in")}
                className="cursor-pointer font-medium"
              >
                Log In
              </button>

              <button
                onClick={() => router.push("/sign-up")}
                className="cursor-pointer rounded-md bg-[#008080] px-4 py-2 font-medium text-white"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            onClick={() => setOpenMenu((prev) => !prev)}
            className="flex items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            {openMenu ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {openMenu && (
          <div className="mt-5 rounded-xl bg-white p-5 shadow-md md:hidden">
            <ul className="flex flex-col gap-4 text-center font-medium">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">Features</li>
              <li className="cursor-pointer">How it Works</li>
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/sign-up");
                }}
                className="w-full rounded-md bg-[#008080] px-4 py-3 font-medium text-white"
              >
                Get Started
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  router.push("/sign-in");
                }}
                className="w-full rounded-md border border-[#008080] px-4 py-3 font-medium text-[#008080]"
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export { Navbar };
