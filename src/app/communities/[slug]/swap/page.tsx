import React from "react";
import Swap from "./_components/Swap";

function page() {
  return (
    <>
      <header className="mt-6 lg:mt-[2.25rem] mb-4">
        <h1 className="font-medium text-lg lg:text-s20 text-mako">
          Voice Token
        </h1>
      </header>
      <section className="w-full max-w-[62.125rem]">
        <Swap />
      </section>
    </>
  );
}

export default page;
