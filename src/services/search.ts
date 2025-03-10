"use server";

export async function search(query: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/search?query=${query}`
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}
