import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/ui/custom-elements/customToggle";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
// import burgerMenuIcon from "@/assets/burger-menu-icon.svg"
import LanguageSelect from "@/components/ui/custom-elements/customLangSelect";
import { useState } from "react";


const Menu = () => {

  const [user,] = useState(false)

  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger className="group w-fit p-0 !px-1 bg-transparent dark:bg-transparent shadow-none hover:shadow-none border-none hover:cursor-pointer hover:bg-accent dark:hover:bg-accent duration-300 rounded-sm">
           <div className="flex lg:hidden items-center">
          {/* <Button variant={"outline"} className="group w-fit p-0 !px-1 bg-transparent dark:bg-transparent shadow-none hover:shadow-none border-none"> */}
          {/* <img className="shrink-0 sm:size-11" src={burgerMenuIcon} alt="" /> */}
          <svg  className="shrink-0 sm:size-11 stroke-black dark:stroke-secondary-foreground" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8H28M4 16H28M4 24H28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          {/* </Button> */}
        </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-full dark:text-white">
          <SheetHeader className="mt-8 flex flex-col gap-4">
            <SheetTitle className="text-center duration-300 text-3xl border-b-2 border-black dark:border-white">
              Menu
            </SheetTitle>
   
            <SheetClose asChild>
               <Link to={'/Dashboard/Events'}>
                <Button className="w-full text-xl p-6">Event Catalog</Button>
              </Link>
            </SheetClose>
            {user ?
            <div className="flex flex-col gap-4">
             <SheetClose asChild>
               <Link to={'/Dashboard/Profile'}>
                <Button variant={"secondary"} className="w-full text-xl p-6">Profile</Button>
              </Link>
            </SheetClose> 
                <SheetClose asChild>
           
                <Button variant={"destructive"} className="w-full text-xl p-6">Sign Out</Button>
             
            </SheetClose> 
            </div>
            : <SheetClose asChild>
               <Link to={'/Auth/SignIn'}>
                <Button variant={"secondary"} className="w-full text-xl p-6">Sign In</Button>
              </Link>
            </SheetClose>}
              
           
              <div className="flex justify-around">
                 <LanguageSelect /> 
                <ToggleSwitch />
              </div>
          
          </SheetHeader>
        <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menu;
