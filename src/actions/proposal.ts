"use server";

import { revalidateTag } from "next/cache";

interface CreateProposalProps {
  title: string;
  description: string;
  type: string;
  options: string[];
  startDate: Date;
  endDate: Date;
  author: string;
  community: string;
}

export async function createProposal(
  address: string,
  payload: CreateProposalProps
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/proposal/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${address}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create proposal: ${response.statusText}`);
    }

    revalidateTag("community-proposals");
    revalidateTag("community-stats");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to create proposal" };
  }
}

export async function voteOnProposal(
  id: string,
  address: string,
  payload: { userId: string; vote: string }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/proposal/${id}/vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${address}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to vote on proposal: ${response.statusText}`);
    }

    revalidateTag("proposal");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to vote on proposal" };
  }
}
