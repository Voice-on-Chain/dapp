"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const fetcher = (url: string, address: string) =>
  fetch(`https://voice-on-aptos.lm.r.appspot.com/api/v1${url}`, {
    headers: {
      Authorization: `Bearer ${address}`,
    },
  }).then((r) => r.json());

export const useGeneratePost = () => {
  const { address } = useAccount();

  return useMutation({
    mutationKey: ["generate-post-content"],
    mutationFn: async () => {
      try {
        const response = await fetcher("/generate/post", address!);
        return response;
      } catch (error) {
        throw new Error("Failed to generate post content");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to generate post content", {
        className: "error-message",
      });
    },
  });
};

export const useGenerateProposal = () => {
  const { address } = useAccount();

  return useMutation({
    mutationKey: ["generate-proposal-content"],
    mutationFn: async () => {
      try {
        const response = await fetcher("/generate/proposal", address!);
        return response;
      } catch (error) {
        throw new Error("Failed to generate proposal content");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to generate proposal content", {
        className: "error-message",
      });
    },
  });
};

export const useGeneratePoll = () => {
  const { address } = useAccount();

  return useMutation({
    mutationKey: ["generate-poll-content"],
    mutationFn: async () => {
      try {
        const response = await fetcher("/generate/poll", address!);
        return response;
      } catch (error) {
        throw new Error("Failed to generate poll content");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to generate poll content", {
        className: "error-message",
      });
    },
  });
};
