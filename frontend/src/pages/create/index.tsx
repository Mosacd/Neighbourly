import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";



const formSchema = z.object({
  title: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  location: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
  shortDescription: z.string()
    .min(8, { message: "Description must be at most 20 characters." })
    .nonempty({ message: "Password is required" }),
  detailedDescription: z.string()
    .min(8, { message: "Description must be at most 200 characters." })
    .nonempty({ message: "Password is required" }),
  image: z.string().nonempty({ message: "Picture Required" }),
});

const CreateEvent = () => {

const [imagePreview, setImagePreview] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement | null>(null);
const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      shortDescription: "",
      detailedDescription: "",
      image: "",
    },
  });





  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex w-full 2xl:max-w-[1680px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between w-full dark:text-white 2xl:max-w-[1680px]"
        >
          <div className="w-full max-w-[830px]">
          <FormField
  control={form.control}
  name="image"
  render={({ field: { onChange } }) => (
    <FormItem>
      <FormControl>
        <div className="space-y-2">
          {/* Upload Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-[200px] 2xl:h-[520px] bg-neutral-200 dark:bg-input/30 rounded-[12px] border border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden relative"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover w-full h-full p-20"
              />
            ) : (
              <Paperclip className="w-10 h-10 text-gray-600" />
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  setFileName(file.name);
                  onChange(file);
                }
              }}
              className="hidden"
            />
          </div>
 {fileName && (
            <p className="text-md text-black dark:text-white truncate text-center">
              <span className="font-medium">File:</span> {fileName}
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          </div>

          <div className="flex flex-col gap-[12px] 2xl:gap-[16px] w-full max-w-[688px]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">Title</FormLabel>
                  <FormControl>
                    <Input className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Location</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-neutral-200 h-[42px] 2xl:h-[48px] rounded-[8px] noto-sans-semibold"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-neutral-200 2xl:min-h-[141px] 2xl:max-h-[141px] rounded-[8px] noto-sans-semibold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="detailedDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-neutral-200 2xl:min-h-[267px] 2xl:max-h-[267px] rounded-[8px] noto-sans-semibold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    </div>

          <FormDescription className="flex justify-center gap-2">
             <Button
                className="w-full dark:text-white"
                type="submit"
              >
                Publish
              </Button>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
