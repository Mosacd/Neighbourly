import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { z } from "zod";



const formSchema = z.object({
  username: z.string().nonempty({ message: "Username is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
     Rpassword: z.string()
      .min(8, { message: "Password must be at least 8 characters." })
      .nonempty({ message: "Password is required" }),
});

const SignUpForm = () => {


  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          username: "",
          password: "",
          Rpassword: "",
        },
      });

      const [match, setMatch] = useState(true);





    function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.password == values.Rpassword) {
    console.log("signed up")
    }else {
      console.log("Passwords do not match");
      setMatch(false);
    }
  }

  return (
     <div className="flex flex-col w-full  max-sm:p-0 sm:px-9 max-sm:border-none max-w-[345px] items-center py-[32px] sm:max-w-[448px] 2xl:max-w-[520px] rounded-[32px] border-[1px] border-[#636363]">
      <Link to={"/Dashboard/Home"} className="flex max-sm:hidden self-start w-fit items-center noto-sans-semibold text-[16px] hover:underline 2xl:text-[18px] gap-[8px]">
      <svg className="size-4 2xl:size-5" width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.99994 5.99997L1.29294 6.70697L0.585938 5.99997L1.29294 5.29297L1.99994 5.99997ZM18.9999 14C18.9999 14.2652 18.8946 14.5195 18.707 14.7071C18.5195 14.8946 18.2652 15 17.9999 15C17.7347 15 17.4804 14.8946 17.2928 14.7071C17.1053 14.5195 16.9999 14.2652 16.9999 14H18.9999ZM6.29294 11.707L1.29294 6.70697L2.70694 5.29297L7.70694 10.293L6.29294 11.707ZM1.29294 5.29297L6.29294 0.292969L7.70694 1.70697L2.70694 6.70697L1.29294 5.29297ZM1.99994 4.99997H11.9999V6.99997H1.99994V4.99997ZM18.9999 12V14H16.9999V12H18.9999ZM11.9999 4.99997C13.8565 4.99997 15.6369 5.73747 16.9497 7.05022C18.2624 8.36298 18.9999 10.1435 18.9999 12H16.9999C16.9999 10.6739 16.4732 9.40212 15.5355 8.46443C14.5978 7.52675 13.326 6.99997 11.9999 6.99997V4.99997Z" fill="black"/>
</svg>
Return
      </Link> <h1 className="noto-sans-semibold text-[24px] 2xl:text-[32px] mb-[32px] 2xl:mb-[40px] mt-1">Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] max-w-[345px] sm:max-w-[368px] 2xl:max-w-[440px] w-full dark:text-white"
        >
          <div className="flex flex-col gap-[12px] 2xl:gap-[16px]">
             <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-neutral-200 h-[42px] 2xl:h-[48px] rounded-[8px] noto-sans-semibold"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px] font-[700]">Email</FormLabel>
                  <FormControl>
                    <Input className="bg-neutral-200 h-[42px] 2xl:h-[48px]  rounded-[8px] noto-sans-semibold  text-[14px] 2xl:text-[16px] " {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Passowrd</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-neutral-200 h-[42px] 2xl:h-[48px] rounded-[8px] noto-sans-semibold"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="noto-sans-semibold text-[14px] 2xl:text-[16px]">Confirm Passowrd</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-neutral-200 h-[42px] 2xl:h-[48px] rounded-[8px] noto-sans-semibold"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
    </div>
<div className="flex flex-col justify-center items-center gap-[24px] 2xl:gap-[32px]">
            
              {/* {isError && (
                <p className="text-red-600 text-md">
                  {error?.message || "Invalid login credentials"}
                </p>
              )} */}

              <Button
                className="w-full dark:text-white"
                type="submit"
              >
                Sign Up
              </Button>

              
            </div>

            
          <FormDescription className="flex flex-col gap-[24px] items-center">
            <div className="flex gap-[20px] *:hover:scale-105 *:duration-300 *:cursor-pointer">
              <div className="rounded-full w-[42px] h-[42px] flex items-center justify-center border-[3px] border-[#BA222B]">
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.064 5.51C1.89638 3.85353 3.17282 2.46106 4.7508 1.48806C6.32878 0.515073 8.14616 -0.000126487 10 2.32934e-08C12.695 2.32934e-08 14.959 0.991 16.69 2.605L13.823 5.473C12.786 4.482 11.468 3.977 10 3.977C7.395 3.977 5.19 5.737 4.405 8.1C4.205 8.7 4.091 9.34 4.091 10C4.091 10.66 4.205 11.3 4.405 11.9C5.191 14.264 7.395 16.023 10 16.023C11.345 16.023 12.49 15.668 13.386 15.068C13.9054 14.726 14.3501 14.2822 14.6932 13.7635C15.0363 13.2448 15.2706 12.6619 15.382 12.05H10V8.182H19.418C19.536 8.836 19.6 9.518 19.6 10.227C19.6 13.273 18.51 15.837 16.618 17.577C14.964 19.105 12.7 20 10 20C8.68663 20.0005 7.38604 19.7422 6.17254 19.2399C4.95905 18.7375 3.85645 18.0009 2.92776 17.0722C1.99907 16.1436 1.2625 15.0409 0.760135 13.8275C0.257774 12.614 -0.000524861 11.3134 8.00714e-07 10C8.00714e-07 8.386 0.386001 6.86 1.064 5.51Z" fill="#BA222B"/>
</svg>
              </div>
              <div className="rounded-full w-[42px] h-[42px] flex items-center justify-center border-[3px] border-[#4F6796]">
<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11.5H9.5L10.5 7.5H7V5.5C7 4.47 7 3.5 9 3.5H10.5V0.14C10.174 0.0970001 8.943 0 7.643 0C4.928 0 3 1.657 3 4.7V7.5H0V11.5H3V20H7V11.5Z" fill="#4F6796"/>
</svg>
              </div>
              <div className="rounded-full w-[42px] h-[42px] flex items-center justify-center border-[3px] border-[#3B69B2]">
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.50987 4.796V6.493C8.86525 5.95168 9.35509 5.5119 9.93144 5.21671C10.5078 4.92152 11.1509 4.78103 11.7979 4.809C15.2529 4.809 15.9999 6.969 15.9999 9.779V15.5H12.7999V10.428C12.7999 9.218 12.5559 7.662 10.6719 7.662C8.84487 7.662 8.53287 8.979 8.53287 10.338V15.5H5.34287V4.796H8.50987ZM3.19987 2.106C3.19948 2.423 3.10551 2.73284 2.92975 2.99665C2.75399 3.26047 2.50426 3.46653 2.21187 3.589C1.9196 3.71048 1.59779 3.74226 1.2874 3.68029C0.977017 3.61832 0.692085 3.4654 0.46887 3.241C0.245236 3.01646 0.092985 2.73081 0.0312626 2.41997C-0.0304597 2.10913 0.00110298 1.78698 0.121981 1.49403C0.242859 1.20108 0.447655 0.950407 0.710617 0.773539C0.973579 0.596671 1.28297 0.501502 1.59987 0.5C1.81049 0.499999 2.01904 0.541582 2.21355 0.622364C2.40807 0.703147 2.58472 0.821539 2.73337 0.970748C2.88202 1.11996 2.99975 1.29705 3.0798 1.49186C3.15986 1.68668 3.20066 1.89538 3.19987 2.106Z" fill="#3B69B2"/>
<path d="M3.2 4.80902H0V15.5H3.2V4.80902Z" fill="#3B69B2"/>
</svg>
              </div>
            </div>
            <div className="flex justify-center gap-2">
           {!match &&   <h1 className="text-md text-red-600 dark:text-gray-500">
                Passwords do not match
              </h1>} </div>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
