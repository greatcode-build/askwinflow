import { Suspense } from "react";
import { Feed } from "../components/Feed";

const page = () => {
  return (
    <Suspense fallback={<div>Loading feed...</div>}>
      <Feed />
    </Suspense>
  );
};

export default page;
