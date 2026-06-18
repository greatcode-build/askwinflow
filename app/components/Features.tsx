import { keyFeatures } from "@/constants";

const Features = () => {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="text-2xl font-bold text-[#111111] sm:text-3xl">
            Key Features
          </h1>

          <p className="max-w-3xl text-base leading-7 text-[#29292B] sm:text-lg sm:leading-8">
            Everything you need to ask better questions, share expertise, and
            turn valuable discussions into a lasting knowledge base.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-10">
          {keyFeatures.map(({ id, title, text, icon: Icon }) => (
            <div
              key={id}
              className="h-full rounded-2xl border border-[#B4B4B6] bg-[#FFFBFA] p-5 sm:p-6"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#008080] bg-[#A2F0EF] text-[#008080] sm:h-15 sm:w-15">
                <Icon size={26} />
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#111111] sm:text-2xl">
                {title}
              </h2>

              <p className="mt-2 text-base leading-7 text-[#29292B] sm:text-lg">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Features };
