"use server";

import { revalidatePath, revalidateTag } from "next/cache";

interface UserProps {
  email: string;
  address: string;
  country: string;
  username: string;
}

export async function updateUser(address: string, payload: Partial<UserProps>) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    revalidatePath("/", "layout");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to update user" };
  }
}

export async function joinCommunity(address: string, communityId: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/user/communities/${communityId}/join/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${address}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to join community: ${response.statusText}`);
    }
    revalidateTag("community");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to join community" };
  }
}

export async function leaveCommunity(address: string, communityId: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/user/communities/${communityId}/leave/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${address}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to leave community: ${response.statusText}`);
    }

    revalidateTag("community");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to leave community" };
  }
}

export async function updateProfilePhoto(address: string, payload: FormData) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/user/photo`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile photo: ${response.statusText}`);
    }

    revalidatePath("/", "layout");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to update profile photo" };
  }
}

export async function deleteProfilePhoto(address: string, id: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/user/photo`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${address}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete profile photo: ${response.statusText}`);
    }

    revalidatePath("/", "layout");
    return await response.json();
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }

    return { error: "Failed to delete profile photo" };
  }
}
