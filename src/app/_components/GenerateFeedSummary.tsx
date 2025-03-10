"use client";
import Modal from "@/components/ui/modal";
import useFeedSummarizer from "@/hooks/use-feed-summary";
import React, { useState } from "react";
import { RiAiGenerate } from "react-icons/ri";

const GenerateFeedSummary = () => {
  const [showSummary, setState] = useState(false);
  const { data, isLoading, isFetching, isError } =
    useFeedSummarizer(showSummary);

  return (
    <>
      <button
        onClick={() => setState(true)}
        className="rounded-md border flex items-center space-x-2 px-4 py-3 hover:bg-accent hover:text-white w-fit border-athens text-xs lg:text-sm text-accent"
      >
        <span>
          <RiAiGenerate />
        </span>
        <span>Generate summary</span>
      </button>
      <Modal
        title="Summary of recent feed contents"
        isOpen={showSummary}
        closeHandler={() => setState(false)}
        className="w-[34.375rem]"
      >
        <div className="mt-4">
          {isLoading || isFetching ? (
            <span className="rounded-[0.125rem] block bg-dove-gray min-h-32 animate-pulse"></span>
          ) : isError ? (
            <p className="text-xs lg:text-sm text-scarlet text-center whitespace-pre-wrap">
              Couldn&apos;t generate feed summary
            </p>
          ) : (
            <p className="text-xs lg:text-sm text-mako whitespace-pre-wrap">
              {data?.summary}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default GenerateFeedSummary;
