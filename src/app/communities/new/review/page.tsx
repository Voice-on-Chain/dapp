import React from "react";
import ReviewCommunity from "./_components/ReviewCommunity";

function page() {
  return (
    <>
      <header className="border-b border-alice-blue mt-8 lg:mt-[3.1875rem] mb-3 pb-3 max-w-[59.625rem]">
        <h1 className="font-medium text-lg lg:text-s20 text-mako">
          Create Community
        </h1>
      </header>
      <ReviewCommunity />
    </>
  );
}

export default page;
