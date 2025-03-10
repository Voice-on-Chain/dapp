"use client";

import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string, address: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${address}`,
    },
  }).then((r) => r.json());

const useUserEngagements = (
  address: string,
  community: string,
  userId: string
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["engagement", community, userId, address],
    queryFn: () =>
      fetcher(`/community/${community}/engagements?userId=${userId}`, address),
    enabled: !!address && !!community && !!userId,
  });

  return {
    engagements: data,
    isLoading,
    isError: error,
  };
};

export default useUserEngagements;
