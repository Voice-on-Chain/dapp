"use client";

import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`).then((r) => r.json());

const useFeed = (initialData: any, page: number = 1, limit: number = 30) => {
  return useQuery({
    queryKey: [`feed`],
    queryFn: () => fetcher(`/feed?page=${page}&limit=${limit}`),
    initialData,
    refetchOnWindowFocus: false,
  });
};

export default useFeed;
