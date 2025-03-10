"use server";

import { revalidateTag } from "next/cache";

interface CreatePostProps {
  content: string;
  author: string;
  community: string;
}

export async function createPost(address: string, payload: CreatePostProps) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.statusText}`);
    }

    revalidateTag("community-posts");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to create post" };
  }
}

export async function applaudPost(
  id: string,
  address: string,
  payload: { userId: string }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/post/${id}/applaud`,
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
      throw new Error(`Failed to applaud post: ${response.statusText}`);
    }

    revalidateTag("post");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to applaud post" };
  }
}

export async function commentOnPost(
  id: string,
  address: string,
  payload: {
    author: string;
    community: string;
    content: string;
    parentId: string;
  }
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/post/${id}/comments`,
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
      throw new Error(`Failed to comment post: ${response.statusText}`);
    }

    revalidateTag("post");
    revalidateTag("comments");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to comment post" };
  }
}
