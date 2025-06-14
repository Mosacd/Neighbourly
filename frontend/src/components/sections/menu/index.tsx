import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/ui/custom-elements/customToggle";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
// import burgerMenuIcon from "@/assets/burger-menu-icon.svg"
import LanguageSelect from "@/components/ui/custom-elements/customLangSelect";


const Menu = () => {

  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger className="">
           <div className="flex lg:hidden items-center">
          <Button variant={"outline"} className="group w-fit p-0 !px-1 bg-transparent dark:bg-transparent shadow-none hover:shadow-none border-none">
          {/* <img className="shrink-0 sm:size-11" src={burgerMenuIcon} alt="" /> */}
          <svg  className="shrink-0 sm:size-11 stroke-black dark:stroke-secondary-foreground" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H28M4 16H28M4 24H28" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </Button>
        </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-full dark:text-white">
          <SheetHeader className="mt-8 flex flex-col gap-4">
            <SheetTitle className="text-center text-3xl border-b-2 border-black dark:border-white">
              Menu
            </SheetTitle>
   
            <SheetClose asChild>
               <Link to={'/Events'}>
                <Button className="w-full text-xl p-6">Event Catalog</Button>
              </Link>
            </SheetClose>
              <SheetClose asChild>
               <Link to={'/Events'}>
                <Button variant={"secondary"} className="w-full text-xl p-6">Sign Up</Button>
              </Link>
            </SheetClose>
           
              <div className="flex justify-around">
                 <LanguageSelect /> 
                <ToggleSwitch />
              </div>
          
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
