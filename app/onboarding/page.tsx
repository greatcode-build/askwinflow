import { Suspense } from "react";
import { OnboardingCallback } from "../components/OnboardingCallback";

const page = () => {
  return (
    <Suspense fallback={<div>Preparing your onboarding...</div>}>
      <OnboardingCallback />
    </Suspense>
  );
};

export default page;
