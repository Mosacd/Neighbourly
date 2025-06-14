import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import GEO from "@/assets/lang/georgia 1.svg";
import RUS from "@/assets/lang/russia 1.svg"
import ENG from "@/assets/lang/usa 1.svg"
// import globe from "@/assets/globe.svg"
import { useState } from "react";



const LanguageSelect = () => {

      const [selectedLang, setSelectedLang] = useState("ENG");
      
    return (
<Select defaultValue="ENG" onValueChange={setSelectedLang}>
  <SelectTrigger className="w-fit lg:w-[116px] data-[size=default]:h-[53px] text-xl lg:text-lg 2xl:text-xl border-none noto-sans-regular">
        <svg className="stroke-black duration-300 dark:stroke-secondary-foreground h-[32px] w-[24px] 2xl:w-[32px] size-full " viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 28C17.5759 28 19.1363 27.6896 20.5922 27.0866C22.0481 26.4835 23.371 25.5996 24.4853 24.4853C25.5996 23.371 26.4835 22.0481 27.0866 20.5922C27.6896 19.1363 28 17.5759 28 16C28 14.4241 27.6896 12.8637 27.0866 11.4078C26.4835 9.95189 25.5996 8.62902 24.4853 7.51472C23.371 6.40042 22.0481 5.5165 20.5922 4.91345C19.1363 4.31039 17.5759 4 16 4M16 28C14.4241 28 12.8637 27.6896 11.4078 27.0866C9.95189 26.4835 8.62902 25.5996 7.51472 24.4853C6.40042 23.371 5.5165 22.0481 4.91345 20.5922C4.31039 19.1363 4 17.5759 4 16C4 14.4241 4.31039 12.8637 4.91345 11.4078C5.5165 9.95189 6.40042 8.62902 7.51472 7.51472C8.62902 6.40042 9.95189 5.5165 11.4078 4.91345C12.8637 4.31039 14.4241 4 16 4M16 28C19.6813 28 21.2547 21.116 21.2547 16C21.2547 10.884 19.6813 4 16 4M16 28C12.3187 28 10.7453 21.116 10.7453 16C10.7453 10.884 12.3187 4 16 4M4.66667 12H27.3333M4.66667 20H27.3333" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    <SelectValue>{selectedLang}</SelectValue>
  </SelectTrigger>
  <SelectContent className="min-w-[116px]">
    <SelectItem className="text-xl lg:text-lg 2xl:text-xl" value="GEO"><img src={GEO} alt="" />GEO</SelectItem>
    <SelectItem className="text-xl lg:text-lg 2xl:text-xl" value="ENG"><img src={ENG} alt="" />ENG</SelectItem>
    <SelectItem className="text-xl lg:text-lg 2xl:text-xl" value="RUS"><img src={RUS} alt="" />RUS</SelectItem>
  </SelectContent>
</Select>
    )
}


export default LanguageSelect;