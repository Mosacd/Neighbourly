import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
 
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  location: z.string().min(1, { message: "Location is required" }),
 
  shortDescription: z
    .string()
    .min(8, { message: "Description must be at least 8 characters" })
    .max(100, { message: "Description must be at most 100 characters" }),
 
  detailedDescription: z
    .string()
    .min(8, { message: "Description must be at least 8 characters" })
    .max(1000, { message: "Description must be at most 1000 characters" }),
 
  image: z.string().min(1, { message: "Picture is required" }),
  schedule: z.string().min(1, { message: "Schedule is required" }),
 
  start: z.string().min(1, "Start date is required").refine(
      (val) => new Date(val) > new Date(),
      { message: "Start date must be in the future" }
  ),
  end: z.string().min(1, "End date is required").refine(
      (val) => new Date(val) > new Date(),
      { message: "End date must be in the future" }
  ),
}).refine((data) => new Date(data.end) >= new Date(data.start), {
    message: "End date cannot be before the start date",
    path: ["end"],
});
 
 
const CreateEvent = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      shortDescription: "",
      detailedDescription: "",
      image: "",
      schedule: "",
      start: "",
      end: ""
    },
  });
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3001/api/Data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }
      navigate('/');
    } catch (error) {
      console.error('Submission failed:', error);
      alert(`Error: ${error instanceof Error ? error.message : "An unknown error occurred."}`);
    } finally {
      setIsSubmitting(false);
    }
  }
 
  return (
    <div className="flex w-full justify-center my-[60px] sm:my-[120px] px-3 max-lg:sm:px-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full max-w-[500px] md:max-w-[600px] lg:max-w-[1296px] 2xl:max-w-[1680px]"
        >
          <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-20 w-full dark:text-white lg:h-auto">
            <div className="flex flex-col gap-5 justify-between w-full lg:max-w-[638px] 2xl:max-w-[830px] h-full">
             
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  const { onChange, onBlur, name, ref } = field;
                 
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-2">
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-[230px] xs:h-[300px] p-1 lg:h-[400px] 2xl:h-[520px] dark:bg-input/30 rounded-[12px] border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden relative"
                          >
                            {imagePreview ? (
                              <img src={imagePreview} alt="Preview" className="object-cover w-full h-full rounded-[10px]" />
                            ) : (
                              <Paperclip className="w-10 h-10 text-gray-600" />
                            )}
 
                            <input
                              type="file"
                              accept="image/*"
                              onBlur={onBlur}
                              name={name}
                              ref={(e) => {
                                ref(e);
                                fileInputRef.current = e;
                              }}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => { setImagePreview(reader.result as string); };
                                  reader.readAsDataURL(file);
                                  setFileName(file.name);
                                  onChange(`/images/${file.name}`);
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
                  );
                }}
              />
 
              <FormField
                control={form.control}
                name="schedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">Schedule</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Weekdays, 3:00 PM – 5:00 PM" className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-5 xs:gap-10">
                <FormField
                  control={form.control}
                  name="start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">End Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
 
            <div className="flex flex-col max-lg:gap-5 w-full lg:max-w-[578px] 2xl:max-w-[688px] h-full justify-between">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Park Cleanup Crew" className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
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
                        placeholder="e.g., Downtown"
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
                        placeholder="A brief, one-sentence summary of the opportunity."
                        className="bg-neutral-200 lg:min-h-[77px] lg:max-h-[77px] rounded-[8px] noto-sans-semibold"
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
                        placeholder="A full description of the role, responsibilities, and what a volunteer can expect."
                        className="bg-neutral-200 min-h-[100px] lg:min-h-[202px] lg:max-h-[202px] 2xl:min-h-[266px] 2xl:max-h-[266px] rounded-[8px] noto-sans-semibold"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center w-full self-end mt-10 lg:mt-20 border-t-2">
            <Button
              className="max-w-[400px] w-full dark:text-white mt-5"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Event"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
 
export default CreateEvent;
 