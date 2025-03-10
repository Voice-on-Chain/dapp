export interface UserProps {
  profilePhoto: ProfilePhoto;
  _id: string;
  email: string;
  address: string;
  country: string;
  username: string;
  communities: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  lends: any[];
  lenders: any[];
}

export interface ProfilePhoto {
  url: string;
  id: string;
}

export interface UserCommunityProps {
  _id: string;
  name: string;
  logo: ProfilePhoto;
}

export interface UserPropsWithCommunities extends UserProps {
  communities: {
    _id: string;
    name: string;
    logo: ProfilePhoto;
  }[];
}
