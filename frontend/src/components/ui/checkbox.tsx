import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
// import { CheckIcon } from "lucide-react"
import Checkmark from "@/assets/checkmark.svg"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-black dark:bg-input/30 data-[state=checked]:bg-white data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-black focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 rounded-[4px] border-2 shadow-xs transition-shadow duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 w-[24px] h-[24px] lg:w-[18px] 2xl:w-[24px] lg:h-[18px] 2xl:h-[24px]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex relative items-center justify-center text-current transition-none"
      >
       <img
  src={Checkmark}
  alt=""
  className="w-4 h-4 lg:w-3 2xl:w-4 lg:h-3 2xl:h-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
/>

      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
