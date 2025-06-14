// import logo from "@/assets/Neighbourly logo.svg"
// import globe from "@/assets/globe.svg"
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/ui/custom-elements/customToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GEO from "@/assets/lang/georgia 1.svg";
import RUS from "@/assets/lang/russia 1.svg"
import ENG from "@/assets/lang/usa 1.svg"
import { useState } from "react";
import { Link } from "react-router-dom";
// import burgerMenuIcon from "@/assets/burger-menu-icon.svg"
import Menu from "@/components/sections/menu";

const Header = () => {

    const [selectedLang, setSelectedLang] = useState("ENG");

  return (
  <div className="flex bg-background items-center w-full h-[80px] sm:h-[120px] 2xl:h-[140px] sm:py-[18px] 2xl:py-[22px] px-[24px] sm:px-[40px] xl:px-[80px] 2xl:px-[120px] shadow-bottom dark:shadow-neutral-800">
    <div className="flex items-center w-full justify-between">
        <Link to={'/Home'}>
        <div className="flex group gap-[8px] sm:gap-[24px] items-center">
<svg className="shrink-0 w-full max-w-[40px] fill-main dark:fill-yellow-600 sm:max-w-[80px] 2xl:max-w-[96px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" width="" height="" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path className="group-hover:fill-red-500 dark:group-hover:fill-red-600 transition-colors duration-300" d="M64 12.92C66.84 9.64 70.44 8 74.8 8C78.44 8 81.48 9.32 84 12C86.52 14.68 87.84 17.72 88 21.2C88 24 86.68 27.24 84 31.04C81.32 34.84 78.72 38 76.12 40.6C73.52 43.16 69.48 46.96 64 52C58.44 46.96 54.36 43.16 51.76 40.6C47.86 36.76 46.52 34.84 43.88 31.04C41.24 27.24 40 24 40 21.2C40 17.56 41.28 14.52 43.88 12C46.48 9.48 49.6 8.16 53.24 8C57.52 8 61.08 9.64 64 12.92Z" fill=""/>
  <path d="M88 76V80L56 90L28 82.24V88H4V44H35.88L60.52 53.2C62.7156 54.0282 64.6072 55.505 65.9433 57.4342C67.2794 59.3633 67.9967 61.6534 68 64H76C82.64 64 88 69.36 88 76ZM20 80V52H12V80H20ZM79.6 74.28C78.96 72.96 77.56 72 76 72H54.6C52.44 72 50.32 71.68 48.28 71L38.76 67.84L41.28 60.24L50.8 63.4C52 63.8 60 64 60 64C60 62.52 59.08 61.2 57.72 60.68L34.44 52H28V74L55.88 81.64L79.6 74.28Z" fill=""/>
</svg>

<h1 className="piedra-regular group-hover:tracking-wider duration-200 text-2xl sm:text-[3.25rem] 2xl:text-[4rem] text-main dark:text-yellow-600">
            Neighbourly
        </h1>
        </div>
        </Link>
        <Menu />
        <div className="hidden lg:flex items-center gap-6 2xl:gap-[36px]">
          <Link to={'/Events'}>
          <Button variant={"secondary"}>
            Event Catalog
          </Button>
          </Link>
        <Select defaultValue="ENG" onValueChange={setSelectedLang}>
  <SelectTrigger className="w-[116px] data-[size=default]:h-[53px] text-lg 2xl:text-xl border-none noto-sans-regular">
    {/* <img className="max-w-[24px] 2xl:max-w-[32px]" src={globe} alt="" /> */}
    <svg className="stroke-black dark:stroke-secondary-foreground h-[32px] w-[24px] 2xl:w-[32px] size-full " viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 28C17.5759 28 19.1363 27.6896 20.5922 27.0866C22.0481 26.4835 23.371 25.5996 24.4853 24.4853C25.5996 23.371 26.4835 22.0481 27.0866 20.5922C27.6896 19.1363 28 17.5759 28 16C28 14.4241 27.6896 12.8637 27.0866 11.4078C26.4835 9.95189 25.5996 8.62902 24.4853 7.51472C23.371 6.40042 22.0481 5.5165 20.5922 4.91345C19.1363 4.31039 17.5759 4 16 4M16 28C14.4241 28 12.8637 27.6896 11.4078 27.0866C9.95189 26.4835 8.62902 25.5996 7.51472 24.4853C6.40042 23.371 5.5165 22.0481 4.91345 20.5922C4.31039 19.1363 4 17.5759 4 16C4 14.4241 4.31039 12.8637 4.91345 11.4078C5.5165 9.95189 6.40042 8.62902 7.51472 7.51472C8.62902 6.40042 9.95189 5.5165 11.4078 4.91345C12.8637 4.31039 14.4241 4 16 4M16 28C19.6813 28 21.2547 21.116 21.2547 16C21.2547 10.884 19.6813 4 16 4M16 28C12.3187 28 10.7453 21.116 10.7453 16C10.7453 10.884 12.3187 4 16 4M4.66667 12H27.3333M4.66667 20H27.3333" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    <SelectValue>{selectedLang}</SelectValue>
  </SelectTrigger>
  <SelectContent className="min-w-[116px]">
    <SelectItem className="text-lg 2xl:text-xl" value="GEO"><img src={GEO} alt="" />GEO</SelectItem>
    <SelectItem className="text-lg 2xl:text-xl" value="ENG"><img src={ENG} alt="" />ENG</SelectItem>
    <SelectItem className="text-lg 2xl:text-xl" value="RUS"><img src={RUS} alt="" />RUS</SelectItem>
  </SelectContent>
</Select>
<ToggleSwitch/>
        </div>
    </div>
  </div>
  )
};

export default Header;
