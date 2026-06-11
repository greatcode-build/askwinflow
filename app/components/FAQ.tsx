const FAQ = () => {
  return (
    <section>
      <div className="flex flex-col gap-2 items-center mt-20">
        <h1 className="font-bold text-3xl">
          <span className="text-[#008080]">Got Questions?</span>
          <span className="text-[#A10F05]"> We’ve Got Answers</span>
        </h1>
        <p className="max-w-3xl text-center text-lg leading-8 text-[#29292B]">
          Everything you need to know about AskWinFlow from getting started
          <br />
          to advanced collaboration with experts
        </p>
      </div>
      <div className="space-y-2 m-5 pb-5">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
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
              professionals, educators, and tech enthusiasts can ask questions,
              share ideas, participate in discussions, and discover valuable
              insights from a growing community
            </p>
          </div>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
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
              Unlike traditional chat platforms where conversations quickly get
              buried, AskWinFlow organizes discussions into searchable threads,
              making it easy to find and revisit valuable knowledge whenever you
              need it.
            </p>
          </div>
        </details>

        <details className="group [&_summary::-webkit-details-marker]:hidden">
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
        <details className="group [&_summary::-webkit-details-marker]:hidden">
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
              Yes. You can add supporting documents, images, presentations, and
              other relevant attachments to provide context and help others
              better understand your post.
            </p>
          </div>
        </details>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
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
              Yes. The MVP version of AskWinFlow is free to join, allowing users
              to ask questions, share ideas, engage in discussions, and access
              community knowledge.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
};

export { FAQ };
