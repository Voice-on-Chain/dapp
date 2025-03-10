"use server";

export async function getAllCommunities(page = 1, limit: number = 30) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["all-communities"],
          revalidate: 60,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getPopularCommunities(page = 1, limit: number = 30) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/popular?page=${page}&limit=${limit}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getNewCommunities(page = 1, limit: number = 30) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/new?page=${page}&limit=${limit}`,
      {
        next: {
          tags: ["new-communities"],
          revalidate: 60,
        },
      }
    );
    return await response.json();
  } catch (error) {
    // console.error(error);
    return null;
  }
}

export async function getCommunity(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}`,
      {
        next: {
          tags: ["community"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getCommunityStatistics(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}/statistics`,
      {
        next: {
          tags: ["community-stats"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getCommunityMembers(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}/members`,
      {
        next: {
          tags: ["community-members"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getCommunityProposals(
  id: string,
  page: number = 1,
  status: string = ""
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}/proposals?page=${page}&status=${status}`,
      {
        next: {
          tags: ["community-proposals"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getCommunityPolls(
  id: string,
  page: number = 1,
  status: string = ""
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}/polls?page=${page}&status=${status}`,
      {
        next: {
          tags: ["community-polls"],
        },
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function getCommunityPosts(
  id: string,
  page: number = 1,
  status: string = ""
) {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/community/${id}/posts?page=${page}&status=${status}`,
      {
        next: {
          tags: ["community-posts"],
        },
        cache: "no-cache",
      }
    );
    return await response.json();
  } catch (error) {
    return null;
  }
}
