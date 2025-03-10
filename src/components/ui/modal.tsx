"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  closeHandler: () => void;
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, closeHandler, title, className, children }: Props) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.body;
  }, []);

  return (
    <>
      {ref?.current
        ? createPortal(
            <div
              className={cn(
                "fixed top-0 left-0 !m-0 h-dvh w-screen bg-wood-smoke/90 z-50 scale-0 opacity-0 overflow-hidden flex items-center justify-center",
                {
                  "scale-100 opacity-100": isOpen,
                }
              )}
            >
              <div
                className={cn(
                  "relative bg-white rounded-2xl p-4 lg:p-6 lg:pb-[2.375rem] pb-7 w-[28.8125rem] max-w-full h-auto",
                  className
                )}
              >
                <header className="flex items-center justify-between">
                  <h5 className="text-lg lg:text-s20 font-medium">{title}</h5>

                  <IoClose size={24} onClick={closeHandler} role="button" />
                </header>
                {children}
              </div>
            </div>,
            ref?.current
          )
        : null}
    </>
  );
};

export default Modal;
