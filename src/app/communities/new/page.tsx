import React from "react";
import CreateCommunity from "./_components/CreateCommunity";

function page() {
  return (
    <>
      <header className="border-b border-alice-blue mt-8 lg:mt-[3.1875rem] mb-3 pb-3 max-w-[59.625rem]">
        <h1 className="font-medium text-lg lg:text-s20 text-mako">
          Create Community
        </h1>
      </header>
      <section className="bg-white p-4 lg:p-6 rounded-xl border border-alice-blue">
        <CreateCommunity />
      </section>
    </>
  );
}

export default page;
