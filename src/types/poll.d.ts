import { Community } from "./community";
import { ProfilePhoto, UserProps } from "./user";

export interface PollsRoot {
  name: string;
  logo: ProfilePhoto;
  polls: Polls;
}

export interface Polls {
  data: Poll[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}

export interface Poll {
  _id: string;
  question: string;
  options: string[];
  multiple: boolean;
  seenBy: any[];
  author: UserProps;
  community: Community;
  status: string;
  votes: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
