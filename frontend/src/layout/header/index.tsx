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
  <div className="w-full h-[140px] py-[22px] px-[120px] shadow-bottom">
    <div className="flex justify-between">
        <Link to={'/Home'}>
        <div className="flex gap-[24px] items-center">
          <img src={logo} alt="" />
        <h1 className="piedra-regular text-[64px] text-main">
            Neighbourly
        </h1>
        </div>
        </Link>
        <div className="flex items-center gap-[36px]">
          <Link to={'/Events'}>
          <Button variant={"secondary"}>
            Event Catalog
          </Button>
          </Link>
        <Select defaultValue="ENG" onValueChange={setSelectedLang}>
  <SelectTrigger className="w-[116px] data-[size=default]:h-[53px] text-[24px] border-none noto-sans-regular">
    <img src={globe} alt="" />
    <SelectValue>{selectedLang}</SelectValue>
  </SelectTrigger>
  <SelectContent className="min-w-[116px]">
    <SelectItem className="text-[24px]" value="GEO"><img src={GEO} alt="" />GEO</SelectItem>
    <SelectItem className="text-[24px]" value="ENG"><img src={ENG} alt="" />ENG</SelectItem>
    <SelectItem className="text-[24px]" value="RUS"><img src={RUS} alt="" />RUS</SelectItem>
  </SelectContent>
</Select>
<ToggleSwitch/>
        </div>
    </div>
  </div>
  )
};

export default Header;
