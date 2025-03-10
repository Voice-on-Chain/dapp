import Image from "next/image";
import React from "react";

const EmptyState = ({ text = "No activities yet." }: { text?: string }) => {
  return (
    <div className="py-32 flex items-center flex-col justify-center lg:py-[12.5rem]">
      <Image
        src="/svgs/no-post.svg"
        alt="No activities"
        width={172}
        height={128}
        className=""
      />
      <p className="text-xs lg:text-sm text-mako mt-[0.9375rem]">{text}</p>
    </div>
  );
};

export default EmptyState;
