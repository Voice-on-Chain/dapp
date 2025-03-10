import Line from "@/components/custom-icons/Line";
import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import Modal from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const RetractVoice = () => {
  const [retract, setRetractState] = useState(false);
  const [retracted, setRetractedState] = useState(false);
  return (
    <>
      <button
        onClick={() => setRetractState(true)}
        className="rounded-md border border-gainsboro px-[1.0625rem] py-[0.5625rem] shadow-btn"
      >
        Retract Voice
      </button>
      <Modal isOpen={retract} closeHandler={() => setRetractState(false)}>
        <div className="flex items-center flex-col text-center">
          <span className="rounded-full size-9 lg:size-[3.5rem] mb-[0.875rem] bg-mako block"></span>
          <div className="mb-7">
            <h4 className="text-lg lg:text-xl font-medium text-mirage mb-[0.375rem]">
              {retracted ? "Voice retract success" : "Retract Voice"}
            </h4>
            {retracted ? null : (
              <h5 className="text-xs lg:text-sm text-tundora">
                You’re about to retract 30 Voice Token made to 0x4...89R. This
                would reduce the engagement and there would be no more rewards
                for you.
              </h5>
            )}
          </div>
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="text-xs text-left">
              <span className="flex items-center mb-1 space-x-1">
                <span className="*:size-6">
                  <VoiceCircleIcon />
                </span>
                <span className="text-xs lg:text-sm text-mako">30</span>
              </span>
              <h5 className="text-mako mb-0.5">VOICE TOKEN</h5>
              <h6 className="text-gray">0x4...5678</h6>
            </div>
            <Line />
            <div className="text-xs text-left">
              <span className="flex items-center mb-1 space-x-1">
                <span className="*:size-6">
                  <VoiceCircleIcon />
                </span>
                <span className="text-xs lg:text-sm text-mako">30</span>
              </span>
              <h5 className="text-mako mb-0.5">VOICE TOKEN</h5>
              <h6 className="text-gray">0x4...5678</h6>
            </div>
          </div>
          <button
            onClick={() => {
              if (retracted) {
                setRetractState(false);
                return;
              }
              setRetractedState(true);
            }}
            className={cn(
              "bg-accent px-4 py-2.5 w-full mt-7 ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
            )}
          >
            {retracted ? "Done" : "Retract Voice"}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default RetractVoice;
