import { UserProps } from "./user";

export interface CommentProps {
  _id: string;
  content: string;
  author: UserProps;
  community: string;
  applauds: [];
  parentId: string;
  type: string;
  replies: ReplyProps[];
  __t: string;
  lentVoices: [];
  createdAt: string;
  updatedAt: string;
}

export interface ReplyProps {
  _id: string;
  content: string;
  author: UserProps;
  community: string;
  applauds: [];
  comment: string;
  lentVoices: [];
  createdAt: string;
  updatedAt: string;
}
