import { FileUploader } from "@/components/ui/file-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import useCreateCommunityStore from "@/store/community.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXTwitter } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import { z } from "zod";
import { StepProps } from "./CreateCommunity";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  contract_address: z.string().min(2, {
    message: "Contract address must be at least 2 characters.",
  }),
  twitter: z.string().url().min(2, {
    message: "Twitter must be at least 2 characters.",
  }),
  website: z.string().url().min(2, {
    message: "Website must be at least 2 characters.",
  }),
  logo: z.array(z.instanceof(File)),
  banner: z.array(z.instanceof(File)),
});

const FormButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        "bg-accent px-4 py-2.5 w-fit lg:px-[2.5rem] disabled:opacity-50 disabled:cursor-not-allowed ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
      )}
    >
      {"Continue"}
    </button>
  );
};

export const BasicDetails = ({ nextHandler }: StepProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [optionsCount, setOptionsCount] = useState(2);
  const { update } = useCreateCommunityStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      contract_address: "",
      twitter: "",
      website: "",
    },
  });

  const optionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const id = Number(event.target.id || 0);
    setOptions((prev) => {
      const valueIndex = id - 1;
      const reducedArray = [...prev];
      reducedArray[valueIndex] = value || "";
      return reducedArray;
    });
    if (id === optionsCount) {
      setOptionsCount((prev) => prev + 1);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    update({
      ...values,
      logo: values.logo[0],
      banner: values.banner[0],
      criterias: options,
    });
    nextHandler();
  }

  const content = form.watch("description");

  const pasteHandler = async () => {
    try {
      const text = await navigator.clipboard.readText();

      form.setValue("contract_address", text);
    } catch (error) {
      // console.log("Failed to read clipboard");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("mb-8 space-y-5 overflow-hidden")}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm text-mako">
                  What is the name of your Project?
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                    placeholder="Enter name"
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
                    Describe your project
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        "border border-alice-blue min-h-[9rem] placeholder:text-gray placeholder:text-xs text-sm text-mako w-full block resize-none p-[0.875rem] rounded-lg",
                        {
                          "border-scarlet": content.length > 1000,
                        }
                      )}
                      placeholder="Briefly describe your project"
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

          <div>
            <FormLabel className="font-normal text-sm block text-mako mb-[0.375rem]">
              Add Community Criterias
            </FormLabel>
            <div className="space-y-[0.375rem]">
              {Array(optionsCount)
                .fill("")
                .map((_, index) => (
                  <Input
                    key={index}
                    id={`${index + 1}`}
                    value={options?.[index] || ""}
                    onChange={optionHandler}
                    className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                    placeholder={`Criteria ${index + 1}`}
                  />
                ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="contract_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-sm text-mako">
                  Contract address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                      placeholder="For e.g: 0x8967b71bcc6143d42b5a99e5ee07ec6201a05e1b070c98486a055dd8374114ee"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={pasteHandler}
                      className="absolute top-1/2 -translate-y-1/2 text-xs text-right text-accent right-2"
                    >
                      Paste
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal flex items-center space-x-[0.375rem] text-sm text-mako">
                  <FaXTwitter size={20} className="text-mist-2" />
                  <span>Twitter URL</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                    placeholder="For e.g; https://x.com"
                    pattern="https://(www\.)?(twitter\.com|x\.com)/[a-zA-Z0-9_]+(/status/[0-9]+)?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal flex items-center space-x-[0.375rem] text-sm text-mako">
                  <RiGlobalLine size={20} className="text-mist-2" />
                  <span>Website URL</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    className="border-alice-blue border shadow-none rounded-lg p-[0.875rem] text-mako text-xs placeholder:text-gray"
                    placeholder="For e.g; https://..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel className="font-normal text-sm text-mako">
                    Logo Image
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFileCount={1}
                      maxSize={800 * 400}
                      // progresses={progresses}
                      // pass the onUpload function here for direct upload
                      // onUpload={uploadFiles}
                      // disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel className="font-normal text-sm text-mako">
                    Banner Image
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFileCount={1}
                      maxSize={1280 * 768}
                      // progresses={progresses}
                      // pass the onUpload function here for direct upload
                      // onUpload={uploadFiles}
                      // disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>

        <FormButton disabled={content?.length > 1000} />
      </form>
    </Form>
  );
};
