"use client";

import RAvatar from "@/components/ui/avatar-compose";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import useUser, { useUpdateUserProfile } from "@/hooks/use-user";
import { cn, shortenAddress } from "@/lib/utils";
import { Country } from "country-state-city";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const allCountries = Country.getAllCountries();

const countries = allCountries.map((country) => ({
  value: country?.name,
  label: country.name,
}));

const Profile = () => {
  const [edit, setEditState] = useState(false);
  const { address, isConnected } = useAccount();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = React.useState("");
  const { user, isLoading } = useUser();
  const { updateUserProfile, isPending: updating } = useUpdateUserProfile();

  useEffect(() => {
    if (user) {
      setEmail(user?.email);
      setUsername(user?.username);
      setCountry(user?.country);
    }
  }, [user]);

  const updateUserHandler = async () => {
    try {
      await updateUserProfile({
        address: address!,
        payload: {
          email,
          username,
          address: address || "",
          country,
        },
      });

      toast("Successfully updated profile");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile", {
        className: "error-message",
      });
    } finally {
      setEditState(false);
    }
  };

  return (
    <div className="max-w-[59.625rem]">
      <div className="relative w-full h-32 mb-4 lg:h-[11.625rem]">
        <Image src="/svgs/gradient-bg.svg" fill alt="Background" />
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-7">
        <div className="flex items-end pl-4 lg:pl-8 lg:-mt-20 space-x-4 lg:space-x-6">
          <RAvatar className="drop-shadow-image border-2 size-16 lg:size-[8.125rem] border-white" />
          <div>
            <h2 className="font-medium text-mirage-2 mb-1 text-xl lg:text-[1.625rem]">
              {address ? shortenAddress(address) : "0x........."}
            </h2>
            {user?.email ? (
              <h4 className="text-sm lg:text-base text-storm-gray">
                {user?.email}
              </h4>
            ) : null}
          </div>
        </div>
        {isConnected && !isLoading ? (
          <span className="flex items-center space-x-4">
            {edit ? (
              <button
                disabled={updating}
                className="text-scarlet text-sm font-medium"
                onClick={() => setEditState(false)}
              >
                Cancel
              </button>
            ) : null}
            <button
              disabled={updating}
              onClick={() => {
                if (!edit) setEditState(!edit);
                if (edit) {
                  updateUserHandler();
                }
              }}
              className={cn(
                "bg-accent px-4 py-2.5 w-fit disabled:opacity-50 disabled:cursor-not-allowed ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
              )}
            >
              {edit ? (updating ? "Updating..." : "Update") : "Edit"}
            </button>
          </span>
        ) : null}
      </div>
      <div className="border divide-y lg:pr-[8.75rem] divide-ghost-white space-y-5 border-alice-blue bg-white p-4 rounded-xl">
        <div className="space-y-2 lg:flex items-start justify-between lg:space-y-0">
          <h3 className="text-xs lg:text-sm text-slate-grey w-full max-w-[17.5rem]">
            Email
          </h3>
          <Input
            type="email"
            disabled={!edit}
            autoFocus={!edit}
            className="border-alice-blue border shadow-none w-full rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              const value = event?.target?.value;
              setEmail(value);
            }}
          />
        </div>
        <div className="space-y-2 lg:flex items-start justify-between lg:space-y-0">
          <h3 className="text-xs lg:text-sm text-slate-grey w-full max-w-[17.5rem]">
            Username
          </h3>
          <Input
            disabled={!edit}
            className="border-alice-blue border shadow-none w-full rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              const value = event?.target?.value;
              setUsername(value);
            }}
          />
        </div>
        <div className="space-y-2 pt-5 lg:flex items-start justify-between lg:space-y-0">
          <h3 className="text-xs lg:text-sm text-slate-grey w-full max-w-[17.5rem]">
            Country
          </h3>
          <Combobox
            disabled={!edit}
            options={countries}
            value={country}
            setValue={setCountry}
          />
        </div>
        <div className="space-y-2 pt-5 lg:flex items-start justify-between lg:space-y-0">
          <span className="block w-full max-w-[17.5rem]">
            <h3 className="text-xs lg:text-sm text-slate-grey">Your photo</h3>
            <p className="text-s10 lg:text-xs text-mist">
              This will be displayed on your profile.
            </p>
          </span>
          <div className="flex items-start justify-between w-full">
            <RAvatar
              src={user?.profilePhoto?.url}
              className="size-8 lg:size-16"
            />
            {isConnected && user ? (
              <span className="flex items-center space-x-4">
                <button
                  disabled={!edit}
                  className="text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed text-storm-gray hover:text-red-500"
                >
                  Delete
                </button>
                <span className="flex items-center w-fit">
                  <input
                    type="file"
                    accept="images/*"
                    id="profile-picture"
                    className="w-0 h-0 opacity-0 scale-0"
                  />
                  <label
                    htmlFor="profile-picture"
                    className="text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-medium text-accent hover:text-teal"
                  >
                    Update
                  </label>
                </span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
