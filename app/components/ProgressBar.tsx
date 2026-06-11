type ProgressProps = {
  step: 1 | 2 | 3;
};

const ProgressBar = ({ step }: ProgressProps) => {
  return (
    <div className="flex gap-2 w-full max-w-md">
      <div
        className={`h-2 flex-1 rounded-md ${step >= 1 ? "bg-[#008080]" : "bg-[#A2F0EF]"}`}
      />
      <div
        className={`h-2 flex-1 rounded-md ${step >= 2 ? "bg-[#008080]" : "bg-[#A2F0EF]"}`}
      />
      <div
        className={`h-2 flex-1 rounded-md ${step >= 3 ? "bg-[#008080]" : "bg-[#A2F0EF]"}`}
      />
    </div>
  );
};

export { ProgressBar };
