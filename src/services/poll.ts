"use server";

export async function getPoll(id: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/poll/${id}`, {
      next: {
        tags: ["poll"],
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}
