"use server";

export async function getPost(id: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/post/${id}`, {
      next: {
        tags: ["post"],
      },
    });
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getComments(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/comment/${id}?type=post`,
      {
        next: {
          tags: ["comments"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}
