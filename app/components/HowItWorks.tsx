import Image from "next/image";
import { HowItWorksData } from "@/constants";

const HowItWorks = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 pt-14 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-[#111111] sm:text-3xl">
          How It Works
        </h1>

        <p className="max-w-3xl text-base leading-7 text-[#29292B] sm:text-lg sm:leading-8">
          A simple process designed to help you ask better questions,
          collaborate with experts, and find trusted insights faster.
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:px-8 lg:py-20">
        <div className="flex w-full justify-center lg:w-1/2">
          <div className="w-full max-w-[520px] overflow-hidden rounded-lg">
            <Image
              src="/image_4.png"
              alt="About Us"
              width={600}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 lg:w-1/2 lg:pl-10">
          {HowItWorksData.map(({ id, title, text, image }) => (
            <div
              key={id}
              className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Image src={image} alt={title} width={48} height={48} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#111111]">
                  {title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-[#3A3A3C] sm:text-base">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { HowItWorks };
