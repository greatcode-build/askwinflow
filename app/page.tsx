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
              AskWinFlow transforms
              <br />
              conversations into a searchable knowledge base through structured
              discussions,
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
          <p className="max-w-3xl text-center text-lg leading-8 text-[#29292B]">
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
      <section>
        <div className="flex flex-col gap-2 items-center mt-20">
          <h1 className="font-bold text-3xl">
            Got Questions?
            <span className="text-[#A10F05]"> We’ve Got Answers</span>
          </h1>
          <p className="max-w-3xl text-center text-lg leading-8 text-[#29292B]">
            Everything you need to know about AskWinFlow from getting started
            <br />
            to advanced collaboration with experts
          </p>
        </div>
        <div className="space-y-2 m-5 pb-5">
          <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span>What is AskWinFlow?</span>
              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>
            <div className="p-4">
              <p className="text-gray-700">
                AskWinFlow is a structured knowledge-sharing platform where
                professionals, educators, and tech enthusiasts can ask
                questions, share ideas, participate in discussions, and discover
                valuable insights from a growing community
              </p>
            </div>
          </details>
          <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span>How is AskWinFlow different from chat groups?</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>

            <div className="p-4">
              <p className="text-gray-700">
                Unlike traditional chat platforms where conversations quickly
                get buried, AskWinFlow organizes discussions into searchable
                threads, making it easy to find and revisit valuable knowledge
                whenever you need it.
              </p>
            </div>
          </details>

          <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span> Who can use AskWinFlow?</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>

            <div className="p-4">
              <p className="text-gray-700">
                AskWinFlow is designed for professionals, educators, students,
                product managers, developers, HR specialists, and anyone looking
                to learn, share expertise, or collaborate with others
              </p>
            </div>
          </details>
          <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span>Can I attach files to my questions or ideas?</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>

            <div className="p-4">
              <p className="text-gray-700">
                Yes. You can add supporting documents, images, presentations,
                and other relevant attachments to provide context and help
                others better understand your post.
              </p>
            </div>
          </details>
          <details className="group [&amp;_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span>Is AskWinFlow free to use?</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </summary>

            <div className="p-4">
              <p className="text-gray-700">
                Yes. The MVP version of AskWinFlow is free to join, allowing
                users to ask questions, share ideas, engage in discussions, and
                access community knowledge.
              </p>
            </div>
          </details>
        </div>
      </section>
      <footer>
        <div className="bg-[#111111]">
          <div className="flex justify-between items-center p-5">
            <div className="flex flex-col items-start cursor-pointer">
              <div className="flex">
                <Image
                  src="/askwinflow_logo.png"
                  alt="AskWinFlow Logo"
                  width={25}
                  height={25}
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
            <div className="flex justify-between gap-3">
              <button className="px-6 py-3 rounded-md bg-[#FF907E33] text-[#EEEEF0]">
                Get Experts Insights
              </button>
              <button className="flex items-center px-6 py-3 gap-2 rounded-md text-center text-[#FFF9F9] bg-[#A10F05] ">
                Subscribe
                <ArrowRight />
              </button>
            </div>
          </div>
          <div className="border-t invert">
            <p className="text-white p-3 invert">
              2026 copyright by AskWinFlow. All Right Reserved
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
