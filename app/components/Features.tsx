import { keyFeatures } from "@/constants";

const Features = () => {
  return (
    <section>
      <div className="p-4">
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
                <div className="w-15 h-15 flex justify-center items-center bg-[#A2F0EF] border border-[#008080] text-[#008080] rounded-2xl">
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
  );
};

export { Features };
