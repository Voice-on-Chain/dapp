import React from "react";

function Loading() {
  return (
    <div className="border flex items-center justify-center mt-4 lg:mt-5 h-dvh max-w-[62.125rem] bg-white border-white-smoke-4 rounded-lg py-6 px-5">
      <span className="border-2 border-accent rounded-full size-6 lg:size-12 border-r-transparent animate-spin block"></span>
    </div>
  );
}

export default Loading;
