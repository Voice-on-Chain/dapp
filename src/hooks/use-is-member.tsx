import React, { useMemo } from "react";
import useUser from "./use-user";
import { Community } from "@/types/community";

const useIsMember = (community: Community) => {
  const { user } = useUser();

  const isMember = useMemo(() => {
    if (user && community) {
      if (user?.address === community?.creator?.address) {
        return true;
      }
      const partOfCommunity = community?.members?.find(
        (member: string) => member === user?._id
      );

      if (partOfCommunity) {
        return true;
      }
    }
    return false;
  }, [user, , community]);

  return { isMember, address: user?.address, user };
};

export default useIsMember;
