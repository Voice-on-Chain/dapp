"use client";
import useUser from "@/hooks/use-user";
import React from "react";

const UserFetcher = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  useUser();
  return <>{children}</>;
};

export default UserFetcher;
