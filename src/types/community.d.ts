export interface Root {
  data: Community[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
}

export interface Community {
  banner: Banner;
  logo: Logo;
  _id: string;
  name: string;
  description: string;
  contract_address: string;
  creator: { address: string };
  twitter: string;
  website: string;
  criterias: string[];
  post: Post;
  comment: Comment;
  proposal: Proposal;
  poll: Poll;
  distribution_date: string;
  minimum_voice_power_required_to_join: number;
  token_to_distribute: number;
  voice_power_rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  members: string[];
}

export interface Banner {
  url: string;
  id: string;
}

export interface Logo {
  url: string;
  id: string;
}

export interface ConfigProps {
  post: Post;
  comment: Comment;
  proposal: Proposal;
  poll: Poll;
}

export interface Post {
  minimum_voice_power: number;
  minimum_voice_age: number;
}

export interface Comment {
  minimum_voice_power: number;
  minimum_voice_age: number;
}

export interface Proposal {
  minimum_voice_power: number;
  minimum_voice_age: number;
}

export interface Poll {
  minimum_voice_power: number;
  minimum_voice_age: number;
}
