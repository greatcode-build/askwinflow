import { HowItWorks, keyFeatures } from "@/constants";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <header>
        <nav className="bg-[#EEEEF0]">
          <div className="max-w-7xl mx-auto px-3 py-4 flex items-center justify-between">
            <div className="flex items-center cursor-pointer">
              <Image
                src="/askwinflow_logo.png"
                alt="AskWinFlow Logo"
                width={25}
                height={25}
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
                <button className="font-medium cursor-pointer">Login In</button>
                <button className="px-4 py-2 bg-[#D01406] text-white rounded-md font-medium cursor-pointer">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
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
              Turn Questions and Ideas Into{" "}
              <span className="text-[#A10F05]">Lasting Knowledge</span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#29292B]">
              Ask, discuss, and discover expert insights in one place.
              AskWinFlow transforms conversations <br /> into a searchable
              knowledge base through structured discussions,
              <br /> attachments, and community-driven ratings.
            </p>
            <button className="flex items-center gap-2 bg-[#A10F05] text-white px-6 py-3 rounded-md font-medium">
              Join A Community Now
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-[#FFCDC233] p-4">
          <div className="flex flex-col gap-8 items-center">
            <h1 className="font-bold text-3xl">Key Features</h1>
            <p className="max-w-3xl text-lg leading-8 text-[#29292B]">
              Everything you need to ask better questions, share expertise,
              <br /> and turn valuable discussions into a lasting knowledge base
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-4">
            {keyFeatures.map(({ id, title, text, icon: Icon }) => (
              <div key={id} className="h-full">
                <div className="bg-[#FFFBFA] border border-[#B4B4B6] rounded-2xl p-5 h-full flex flex-col">
                  <div className="w-15 h-15 flex justify-center items-center bg-[#FFCDC2] border border-[#850000] text-[#850000] rounded-2xl">
                    <Icon />
                  </div>
                  <h2 className="font-bold text-2xl mt-4">{title}</h2>
                  <p className="text-lg mt-2">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col gap-8 items-center mt-20">
          <h1 className="font-bold text-3xl">How It Works</h1>
          <p className="max-w-3xl text-lg leading-8 text-[#29292B]">
            A simple process designed to help you ask better questions,
            collaborate
            <br /> with experts, and find trusted insights faster.
          </p>
        </div>
        <div className="container mx-auto flex flex-wrap items-center px-5 py-24">
          <div className="lg:w-1/2 flex items-center lg:mb-0 mb-10 w-full rounded-lg overflow-hidden">
            <Image
              src="/image.png"
              alt="About Us"
              width={400}
              height={400}
              className="w-full"
            />
          </div>
          <div className="flex flex-col lg:py-6 -mb-10 lg:w-1/2 lg:pl-12">
            {HowItWorks.map(({ id, title, text, image }) => (
              <div
                key={id}
                className="flex gap-5 justify-center lg:items-start items-center mb-10"
              >
                <div className="w-12 h-12 inline-flex items-center justify-center rounded-full">
                  <Image src={image} alt={title} width={48} height={48} />
                </div>
                <div className="grow">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="text-[#3A3A3C]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
