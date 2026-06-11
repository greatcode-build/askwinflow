import Image from "next/image";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#313132]">
        <div className="flex justify-between items-center py-5 px-15">
          <div className="flex flex-col items-start cursor-pointer">
            <div className="flex items-center">
              <Image
                src="/askwinflow_logo.png"
                alt="AskWinFlow Logo"
                width={40}
                height={40}
              />
              <span className="font-semibold cursor-pointer invert">
                AskWinFlow
              </span>
            </div>
            <p className="invert">
              Transforming questions,
              <br /> ideas, and discussions
              <br /> into lasting knowledge
            </p>
          </div>
          <div className="invert">
            <p className="font-bold">Links</p>
            <ul className="gap-10">
              <li>Home</li>
              <li>Features</li>
              <li>How it Works</li>
            </ul>
          </div>
          <button className="px-8 py-3 rounded-md bg-[#FFFFFF1F] text-[#FFFF] border border-[#FFFAFA]">
            Get Experts Insights
          </button>
        </div>
        <div className="border-t invert">
          <p className="text-white p-3 invert">
            2026 copyright by AskWinFlow. All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
