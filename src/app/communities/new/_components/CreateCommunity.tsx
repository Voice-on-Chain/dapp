"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BasicDetails } from "./BasicDetails";
import { Configuration } from "./Configuration";
import { RewardPool } from "./RewardPool";

export interface StepProps {
  nextHandler: () => void;
}

const steps = ["Basic Details", "Configuration", "Reward Pool"];

const CreateCommunity = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextHandler = () => {
    setCurrentStep((prev) => ++prev);
  };
  return (
    <div className="lg:flex lg:space-x-4">
      <aside className="border-b gap-3 lg:flex lg:flex-col lg:border-b-0 pb-4 lg:pb-0 lg:pr-4 lg:border-r border-athens-2">
        {steps.map((step, index) => (
          <button
            key={index}
            className={cn(
              "hover:bg-azure lg:w-[16.875rem] max-w-full lg:text-left font-medium rounded-lg text-xs lg:text-sm capitalize text-mako border border-athens-2 py-3 px-[0.875rem]",
              {
                "bg-azure text-accent border-transparent":
                  currentStep === index,
              }
            )}
          >
            {step}
          </button>
        ))}
      </aside>
      <div className="relative w-full">
        {currentStep === 0 ? (
          <BasicDetails nextHandler={nextHandler} />
        ) : currentStep === 1 ? (
          <Configuration nextHandler={nextHandler} />
        ) : currentStep === 2 ? (
          <RewardPool />
        ) : null}
      </div>
    </div>
  );
};

export default CreateCommunity;
