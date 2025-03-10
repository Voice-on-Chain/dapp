"use server";

import { revalidateTag } from "next/cache";

interface CreateCommunityProps {
  name: string;
  description: string;
  contract_address: string;
  twitter: string;
  website: string;
  criterias: string[];
  creator: string;
  logo: {
    url: string;
    id: string;
  };
  banner: {
    url: string;
    id: string;
  };
  voice_power_rate: number;
  minimum_voice_power_required_to_join: number;
  post: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  comment: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  proposal: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  poll: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  token_to_distribute: number;
  distribution_date: string;
}

export async function createCommunity(
  address: string,
  payload: Partial<CreateCommunityProps>
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/create`,
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
      throw new Error(`Failed to create community: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (typeof error === "string") {
      return { error };
    }
    // console.log(error);
    return { error: "Failed to create community" };
  }
}
