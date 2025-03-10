"use server";

export async function getProposal(id: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/proposal/${id}`, {
      next: {
        tags: ["proposal"],
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}
