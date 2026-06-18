import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#313132]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 py-8 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="flex items-center gap-2">
              <Image
                src="/askwinflow_logo.png"
                alt="AskWinFlow Logo"
                width={40}
                height={40}
              />

              <span className="font-semibold">AskWinFlow</span>
            </div>

            <p className="mt-3 max-w-xs text-sm leading-6 text-white/80">
              Transforming questions, ideas, and discussions into lasting
              knowledge.
            </p>
          </div>

          <div className="text-center md:text-left">
            <p className="font-bold">Links</p>

            <ul className="mt-3 flex flex-col gap-2 text-sm text-white/80">
              <li>Home</li>
              <li>Features</li>
              <li>How it Works</li>
            </ul>
          </div>

          <div className="flex justify-center md:justify-end">
            <button className="rounded-md border border-[#FFFAFA] bg-[#FFFFFF1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:px-8">
              Get Experts Insights
            </button>
          </div>
        </div>

        <div className="border-t border-white/20 py-4">
          <p className="text-center text-sm text-white/80 md:text-left">
            2026 copyright by AskWinFlow. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
