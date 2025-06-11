import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Filters from "./filters";
 

const FiltersMobile = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full max-w-[110px]">
        <Button className="w-full text-lg h-[42px]">Filter</Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar rounded-2xl w-full max-w-[270px] xs:max-w-md sm:max-w-lg  max-h-[600px] overflow-y-auto">
        <DialogHeader>
          {/* <DialogTitle className="text-2xl dark:text-neutral-400 text-center">
            Filter
          </DialogTitle> */}
          <DialogDescription className="text-left">
            <Filters />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersMobile;
