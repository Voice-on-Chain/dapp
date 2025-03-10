"use client";
import { useQuery } from "@tanstack/react-query";

const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`).then((r) => r.json());

const useCommunity = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`community`, id],
    queryFn: () => fetcher(`/community/${id}`),
    enabled: !!id,
  });

  return {
    community: data,
    isLoading,
    isError: error,
  };
};

export default useCommunity;
