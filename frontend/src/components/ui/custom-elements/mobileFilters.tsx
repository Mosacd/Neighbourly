import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Filters from "./filters";
 

const FiltersMobile = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full max-w-[110px]">
        <div className="bg-main rounded-[8px] dark:bg-yellow-600 text-primary-foreground dark:text-secondary-foreground border-[2px] border-main dark:border-yellow-600 shadow-xs hover:bg-orange-300 dark:hover:bg-yellow-700 h-[42px] flex text-lg 2xl:text-xl hover:cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300">
          Filter
        </div>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar rounded-2xl w-full max-w-[270px] xs:max-w-md sm:max-w-lg  max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl dark:text-neutral-400 text-center">
           
          </DialogTitle>
          <DialogDescription className="text-left">
            <Filters />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersMobile;
