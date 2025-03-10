import { Community } from "./community";
import { UserProps } from "./user";

export interface Root {
  name: string;
  logo: ProfilePhoto;
  proposals: Proposals;
}

export interface Proposals {
  data: Proposal[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}

export interface Proposal {
  _id: string;
  title: string;
  type: string;
  description: string;
  options: string[];
  startDate: string;
  endDate: string;
  seenBy: any[];
  author: UserProps;
  community: Community;
  votes: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VoteProps {
    by: UserProps,
    vote: string,
    _id:string
}