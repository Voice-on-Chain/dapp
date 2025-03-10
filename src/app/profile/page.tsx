import React from "react";
import Profile from "./_components/Profile";

function page() {
  return (
    <>
      <header className="border-b border-alice-blue mt-8 lg:mt-[3.1875rem] mb-18 pb-3 max-w-[59.625rem]">
        <h1 className="font-medium text-lg lg:text-s20 text-mako">Profile</h1>
      </header>
      <Profile />
    </>
  );
}

export default page;
