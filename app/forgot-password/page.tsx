import { Suspense } from "react";
import { ForgotPassword } from "../components/ForgotPassword";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPassword />
    </Suspense>
  );
};

export default page;
