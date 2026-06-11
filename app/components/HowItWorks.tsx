import Image from "next/image";
import { HowItWorksData } from "@/constants";

const HowItWorks = () => {
  return (
    <section>
      <div className="bg-[#A2F0EF1A]">
        <div className="flex flex-col gap-8 items-center mt-20">
          <h1 className="font-bold text-3xl pt-10">How It Works</h1>
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
            {HowItWorksData.map(({ id, title, text, image }) => (
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
      </div>
    </section>
  );
};

export { HowItWorks };
