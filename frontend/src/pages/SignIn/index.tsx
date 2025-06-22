import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";
import { z } from "zod";



const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .nonempty({ message: "Password is required" }),
});

const SignInForm = () => {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });





  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col w-full  max-sm:p-0 max-sm:border-none max-w-[345px] items-center gap-[32px] 2xl:gap-[40px] py-[32px] sm:max-w-[448px] 2xl:max-w-[520px] rounded-[32px] border-[1px] border-[#636363]">
      <h1 className="noto-sans-semibold text-[24px] 2xl:text-[32px]">Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[16px] 2xl:gap-[24px] max-w-[345px] sm:max-w-[368px] 2xl:max-w-[440px] w-full dark:text-white"
        >
          <div className="flex flex-col gap-[12px] 2xl:gap-[16px]">
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
    </div>
<div className="flex flex-col justify-center items-center gap-[24px] 2xl:gap-[32px]">
              {/* <Link > */}
                  <span className="text-[14px] 2xl:text-[16px] self-start  noto-sans-semibold text-main-green dark:text-white dark:hover:text-neutral-300 font-semibold hover:text-neutral-800 hover:underline hover:cursor-pointer">
                    Forgot Password?
                  </span>
              {/* </Link> */}
              {/* {isError && (
                <p className="text-red-600 text-md">
                  {error?.message || "Invalid login credentials"}
                </p>
              )} */}

              <Button
                className="w-full dark:text-white"
                type="submit"
              >
                Sign In
              </Button>

              
            </div>
          <FormDescription className="flex justify-center gap-2">
            <span className="text-[#726f6f] text-[14px] 2xl:text-[16px] noto-sans-semibold">Don’t have an account?</span>
            <Link to="/Auth/SignUp"><span  className="text-[14px] 2xl:text-[16px] noto-sans-semibold self-start text-black  noto-sans-regular text-main-green dark:text-white dark:hover:text-neutral-300 font-semibold hover:text-neutral-800 hover:underline hover:cursor-pointer">SIGN UP</span></Link>
          </FormDescription>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
