"use client";

import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string) =>
  fetch(`https://voice-on-aptos.lm.r.appspot.com/api/v1${url}`).then((r) =>
    r.json()
  );

const useFeedSummarizer = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [`feed-summary`],
    queryFn: () => fetcher(`/feed/summary`),
    enabled,
  });
};

export default useFeedSummarizer;
