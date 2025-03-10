import useCreateCommunityStore from "@/store/community.store";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { StepProps } from "./CreateCommunity";
import InputField, { InputFieldWithSelect } from "./InputField";

export const Configuration = ({ nextHandler }: StepProps) => {
  const [voice_power_rate, set_voice_power_rate] = useState(1);
  const [
    minimum_voice_power_required_to_join,
    set_minimum_voice_power_required_to_join,
  ] = useState(1);
  //post
  const [post, setPostData] = useState({
    minimum_voice_power: 1,
    minimum_voice_age: 1,
  });
  //comment
  const [comment, setCommentData] = useState({
    minimum_voice_power: 1,
    minimum_voice_age: 1,
  });
  //proposal
  const [proposal, setProposalData] = useState({
    minimum_voice_power: 1,
    minimum_voice_age: 1,
  });
  //poll
  const [poll, setPollData] = useState({
    minimum_voice_power: 1,
    minimum_voice_age: 1,
  });

  const { update, data } = useCreateCommunityStore();
  const handler = () => {
    update({
      voice_power_rate,
      minimum_voice_power_required_to_join,
      post,
      comment,
      proposal,
      poll,
    });
    nextHandler();
  };
  return (
    <div>
      <div className="space-y-5 mb-8">
        <div className="flex flex-col gap-5 md:gap-[0.375rem] md:items-end md:flex-row md:justify-between">
          <InputField
            icon={data?.logo ? URL.createObjectURL(data?.logo) : ""}
            tooltip=""
            label="What is the token to voice power rate?"
            name={"Token"}
            value={voice_power_rate}
            onChangeHandler={(value) => {
              set_voice_power_rate(value);
            }}
          />
          <span className="hidden mb-2 md:block text-mako">
            <IoArrowForward size={18} />
          </span>
          <InputField value={1} disabled />
        </div>
        <InputField
          label="Minimum voice required to join"
          value={minimum_voice_power_required_to_join}
          onChangeHandler={(value) => {
            set_minimum_voice_power_required_to_join(value);
          }}
        />
        <div className="w-full">
          <h6 className="text-sm lg:text-base text-mako w-full mb-2">Post</h6>
          <div className="border border-alice-blue p-4 rounded-lg flex items-start flex-col md:flex-row md:justify-between gap-5">
            <InputField
              label="Minimum voice power to make post"
              value={post?.minimum_voice_power}
              onChangeHandler={(value) => {
                setPostData((prev) => ({
                  ...prev,
                  minimum_voice_power: value,
                }));
              }}
            />
            <InputFieldWithSelect
              label="Minimum voice age to make post"
              value={post?.minimum_voice_age}
              onChangeHandler={(value) => {
                setPostData((prev) => ({
                  ...prev,
                  minimum_voice_age: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <h6 className="text-sm lg:text-base text-mako w-full mb-2">
            Comment
          </h6>
          <div className="border border-alice-blue p-4 rounded-lg flex items-start flex-col md:flex-row md:justify-between gap-5">
            <InputField
              label="Minimum voice power to make a comment"
              value={comment?.minimum_voice_power}
              onChangeHandler={(value) => {
                setCommentData((prev) => ({
                  ...prev,
                  minimum_voice_power: value,
                }));
              }}
            />
            <InputFieldWithSelect
              label="Minimum voice age to make a comment"
              value={comment?.minimum_voice_age}
              onChangeHandler={(value) => {
                setCommentData((prev) => ({
                  ...prev,
                  minimum_voice_age: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <h6 className="text-sm lg:text-base text-mako w-full mb-2">
            Proposal
          </h6>
          <div className="border border-alice-blue p-4 rounded-lg flex items-start flex-col md:flex-row md:justify-between gap-5">
            <InputField
              label="Minimum voice power to create a proposal"
              value={proposal?.minimum_voice_power}
              onChangeHandler={(value) => {
                setProposalData((prev) => ({
                  ...prev,
                  minimum_voice_power: value,
                }));
              }}
            />
            <InputFieldWithSelect
              label="Minimum voice age to create a proposal"
              value={proposal?.minimum_voice_age}
              onChangeHandler={(value) => {
                setProposalData((prev) => ({
                  ...prev,
                  minimum_voice_age: value,
                }));
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <h6 className="text-sm lg:text-base text-mako w-full mb-2">Poll</h6>
          <div className="border border-alice-blue p-4 rounded-lg flex items-start flex-col md:flex-row md:justify-between gap-5">
            <InputField
              label="Minimum voice power to create community poll"
              value={poll?.minimum_voice_power}
              onChangeHandler={(value) => {
                setPollData((prev) => ({
                  ...prev,
                  minimum_voice_power: value,
                }));
              }}
            />
            <InputFieldWithSelect
              label="Minimum voice age to create community poll"
              value={poll?.minimum_voice_age}
              onChangeHandler={(value) => {
                setPollData((prev) => ({
                  ...prev,
                  minimum_voice_age: value,
                }));
              }}
            />
          </div>
        </div>
      </div>
      <button
        onClick={handler}
        className="bg-accent lg:px-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 w-fit ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
      >
        {"Continue"}
      </button>
    </div>
  );
};
