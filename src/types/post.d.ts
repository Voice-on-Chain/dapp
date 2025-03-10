import { Community } from "./community";
import { UserProps } from "./user";

export interface PostsRoot {
  name: string;
  posts: Posts;
}

export interface Posts {
  data: Post[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}

export interface Post {
  _id: string;
  applauds: any[];
  author: UserProps;
  seenBy: any[];
  content: string;
  community: Community;
  lentVoices: any[];
  images: { id: string; url: string }[];
  comments?: number
  createdAt: string;
  updatedAt: string;
  __v: number;
}
