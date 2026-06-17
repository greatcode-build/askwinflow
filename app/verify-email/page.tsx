import { Suspense } from "react";
import { VerifyEmail } from "../components/VerifyEmail";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default page;
