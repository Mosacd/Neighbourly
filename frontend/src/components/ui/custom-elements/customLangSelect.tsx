import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import GEO from "@/assets/lang/georgia 1.svg";
import RUS from "@/assets/lang/russia 1.svg"
import ENG from "@/assets/lang/usa 1.svg"
import globe from "@/assets/globe.svg"
import { useState } from "react";



const LanguageSelect = () => {

      const [selectedLang, setSelectedLang] = useState("ENG");
      
    return (
<Select defaultValue="ENG" onValueChange={setSelectedLang}>
  <SelectTrigger className="w-fit lg:w-[116px] data-[size=default]:h-[53px] text-2xl lg:text-lg 2xl:text-xl border-none noto-sans-regular">
    <img className="max-w-[32px] lg:max-w-[24px] 2xl:max-w-[32px]" src={globe} alt="" />
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