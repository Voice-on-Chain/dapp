"use server";

import { revalidateTag } from "next/cache";

interface CreatePollProps {
  question: string;
  options: string[];
  multiple: boolean;
  author: string;
  community: string;
}

export async function createPoll(address: string, payload: CreatePollProps) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/poll/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create poll: ${response.statusText}`);
    }

    revalidateTag("community-polls");
    revalidateTag("community-stats");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to create poll" };
  }
}

export async function voteOnPoll(
  id: string,
  address: string,
  payload: { userId: string; vote: string }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/poll/${id}/vote`,
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
      throw new Error(`Failed to vote on poll: ${response.statusText}`);
    }

    revalidateTag("poll");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to vote on poll" };
  }
}
