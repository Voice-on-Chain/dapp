"use client";
import { createProposal } from "@/actions/proposal";
import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import useCommunity from "@/hooks/use-community";
import useIsMember from "@/hooks/use-is-member";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  type: z.enum(["basic", "weighted"], {
    required_error: "You need to select a proposal type.",
  }),
  start_date: z.date({
    required_error: "A start date is required.",
  }),
  end_date: z.date({
    required_error: "An end date is required.",
  }),
});

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={cn(
        "bg-accent px-4 py-2.5 w-full disabled:opacity-50 disabled:cursor-not-allowed ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
      )}
    >
      {pending ? "Creating Proposal..." : "Create Proposal"}
    </button>
  );
};

const types = [
  {
    label: "Basic Vote",
    value: "basic",
    description: "These votings have three choices. For, Against and Abstain",
  },
  {
    label: "Weighted Vote",
    value: "weighted",
    description:
      "Each voter has the ability to cast their votes across any number of options.",
  },
];

const CreateProposal = ({ communityId }: { communityId: string }) => {
  const [creatingProposal, setCreatingProposalState] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [options, setOptions] = useState<string[]>([
    "for",
    "against",
    "abstain",
  ]);
  const { community } = useCommunity(communityId);
  const { isMember, address, user } = useIsMember(community);

  const optionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = Number(event.target.id || 0);
    setOptions((prev) => {
      const valueIndex = id - 1;
      const reducedArray = [...prev];
      reducedArray[valueIndex] = value || "";
      return reducedArray;
    });
    // if (id === optionsCount) {
    //   setOptionsCount((prev) => prev + 1);
    // }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "basic",
    },
  });

  async function onSubmit() {
    const data = form.getValues();

    const response = await createProposal(address!, {
      ...data,
      startDate: data?.start_date,
      endDate: data?.end_date,
      options,
      community: communityId,
      author: user?._id,
    });
    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }
    setCreatingProposalState(false);
  }

  const title = form.watch("title");
  const content = form.watch("description");

  return (
    <>
      {isMember ? (
        <button
          onClick={() => setCreatingProposalState(true)}
          title="Create proposal"
          className="flex items-center text-xs lg:text-sm font-medium text-mako space-x-2 border border-dark-gray rounded-lg px-4 py-[0.625rem]"
        >
          <LuPlus size={18} />
          <span>Create proposal</span>
        </button>
      ) : null}
      <Modal
        isOpen={creatingProposal}
        closeHandler={() => setCreatingProposalState(false)}
        className="w-[34.375rem]"
        title="Create a Proposal"
      >
        <div className="mt-7">
          <span className="px-3 py-[0.625rem] mb-5 rounded-[0.125rem] space-x-2 flex text-xs text-mako items-start sm:items-center bg-squeeze">
            <span className="*:size-4">
              <VoiceCircleIcon />
            </span>
            <span>
              Creating a proposal costs{" "}
              <strong>{community?.proposal?.minimum_voice_power}</strong> Voice
              Power
            </span>
          </span>
          <Form {...form}>
            <form action={onSubmit}>
              <div
                className={cn("mb-7 space-y-5 overflow-hidden", {
                  "scale-0 h-0 mb-0 space-y-0": currentStep > 0,
                })}
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-sm text-mako">
                        What is your proposal title?
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                          placeholder="Enter title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="relative h-auto">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-normal text-sm text-mako">
                          Describe your proposal
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className={cn(
                              "border border-alice-blue min-h-[9rem] placeholder:text-gray placeholder:text-xs text-sm text-mako w-full block resize-none p-[0.875rem] rounded-lg",
                              {
                                "border-scarlet": content.length > 1000,
                              }
                            )}
                            placeholder="Enter description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="absolute bottom-1 text-xs text-right text-gray right-1.5">
                    {content.length}/1000
                  </span>
                </div>
              </div>
              <div
                className={cn("scale-0 h-0 overflow-hidden", {
                  "mb-7 h-auto space-y-5 scale-100": currentStep !== 0,
                })}
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-[0.375rem]">
                      <FormLabel className="font-normal text-sm text-mako">
                        Proposal type
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="mb-4 flex justify-between flex-col sm:flex-row gap-3"
                        >
                          {types.map((option, index) => (
                            <div
                              key={index}
                              className={cn(
                                "flex items-start space-x-2 cursor-pointer border hover:border-accent border-alice-blue rounded-lg py-[0.6875rem] px-[0.875rem] text-sm text-mako",
                                {
                                  "border-accent":
                                    option?.value === field.value,
                                }
                              )}
                            >
                              <RadioGroupItem
                                value={option?.value}
                                id={index.toString()}
                                className={cn({
                                  "border-blue-chill":
                                    field.value === option?.value,
                                })}
                                disabled={option?.value === "weighted"}
                              />
                              <div>
                                <FormLabel
                                  htmlFor={index.toString()}
                                  className="capitalize font-medium text-slate-grey text-xs mb-1 block"
                                >
                                  {option?.label}
                                </FormLabel>
                                <p className="text-s10 text-gray">
                                  {option?.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel className="font-normal text-sm block text-mako mb-[0.375rem]">
                    Options
                  </FormLabel>
                  <div className="space-y-[0.375rem]">
                    {Array(3)
                      .fill("")
                      .map((_, index) => (
                        <Input
                          key={index}
                          id={`${index + 1}`}
                          value={options?.[index] || ""}
                          onChange={optionHandler}
                          disabled
                          className="border-alice-blue border capitalize shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                          placeholder="Add Option"
                        />
                      ))}
                  </div>
                </div>
                <div className="flex justify-between md:items-center flex-col md:flex-row gap-18">
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="font-normal text-sm block text-mako">
                          Start Date
                        </FormLabel>
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="font-normal text-sm block text-mako">
                          End Date
                        </FormLabel>
                        <DateInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {currentStep === 0 ? (
                <button
                  type="button"
                  disabled={!title || !content || content?.length > 1000}
                  onClick={() => setCurrentStep(1)}
                  className="bg-accent disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 w-full ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
                >
                  Next
                </button>
              ) : (
                <FormButton />
              )}
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateProposal;
