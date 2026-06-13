import { Suspense } from "react";
import { VerifyEmail } from "../components/VerifyEmail";

const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    </div>
  );
};

export default page;
