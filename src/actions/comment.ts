"use server";

import { revalidateTag } from "next/cache";

export async function applaudComment(
  id: string,
  address: string,
  payload: { userId: string }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/comment/${id}/applaud`,
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
      throw new Error(`Failed to applaud comment: ${response.statusText}`);
    }

    revalidateTag("comments");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to applaud comment" };
  }
}

export async function replyComment(
  address: string,
  payload: {
    author: string;
    community: string;
    content: string;
    comment: string;
  }
) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/comment/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to reply to comment: ${response.statusText}`);
    }

    revalidateTag("comments");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to reply to comment" };
  }
}

export async function applaudReply(
  id: string,
  address: string,
  payload: { userId: string }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/comment/reply/${id}/applaud`,
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
      throw new Error(`Failed to applaud reply: ${response.statusText}`);
    }

    revalidateTag("comments");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to applaud reply" };
  }
}
