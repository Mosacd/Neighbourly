import logo from "@/assets/Neighbourly logo.svg"
import globe from "@/assets/globe.svg"
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/ui/custom-elements/customToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GEO from "@/assets/lang/georgia 1.svg";
import RUS from "@/assets/lang/russia 1.svg"
import ENG from "@/assets/lang/usa 1.svg"
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const [selectedLang, setSelectedLang] = useState("ENG");

  return (
  <div className="w-full h-[120px] 2xl:h-[140px] py-[18px] 2xl:py-[22px] px-[40px] xl:px-[80px] 2xl:px-[120px] shadow-bottom">
    <div className="flex justify-between">
        <Link to={'/Home'}>
        <div className="flex gap-[24px] items-center">
          <img className="w-full max-w-[80px] 2xl:max-w-[96px]" src={logo} alt="" />
        <h1 className="piedra-regular text-[3.25rem] 2xl:text-[4rem] text-main">
            Neighbourly
        </h1>
        </div>
        </Link>
        <div className="flex items-center gap-6 2xl:gap-[36px]">
          <Link to={'/Events'}>
          <Button variant={"secondary"}>
            Event Catalog
          </Button>
          </Link>
        <Select defaultValue="ENG" onValueChange={setSelectedLang}>
  <SelectTrigger className="w-[116px] data-[size=default]:h-[53px] text-lg 2xl:text-xl border-none noto-sans-regular">
    <img className="max-w-[24px] 2xl:max-w-[32px]" src={globe} alt="" />
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
