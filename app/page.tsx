import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header>
        <nav className="bg-[#EEEEF0]">
          <div className="p-4 flex justify-between items-center">
            <div className="pl-10 flex items-center">
              <Image
                src="/logo.png"
                alt="AskWinFlow Logo"
                width={25}
                height={25}
              />
              <span className="text-sm font-medium">AskWinFlow</span>
            </div>
            <div className="flex justify-between items-center gap-5 ">
              <div>
                <ul className="flex items-center justify-between gap-4">
                  <li>Home</li>
                  <li>Features</li>
                  <li>How it works</li>
                </ul>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-medium">Login In </p>
                <button className="px-4 py-2 bg-[#D01406] text-[#FFF9F9] rounded-md font-medium cursor-pointer">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </main>
  );
}
