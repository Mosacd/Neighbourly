import logo from "@/assets/Neighbourly logo.svg"
import globe from "@/assets/globe.svg"
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/ui/custom-elements/customToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Header = () => {
  return (
  <div className="w-full h-[140px] py-[22px] px-[120px] shadow-bottom">
    <div className="flex justify-between">
        <div className="flex gap-[24px] items-center">
          <img src={logo} alt="" />
        <h1 className="piedra-regular text-[64px] text-main">
            Neighbourly
        </h1>
        </div>
        <div className="flex items-center gap-[36px]">
          <Button variant={"secondary"}>
            Event Catalog
          </Button>
        <Select defaultValue="ENG">
  <SelectTrigger className="w-[116px] data-[size=default]:h-[53px] text-[24px] border-none noto-sans-regular">
    <img src={globe} alt="" />
    <SelectValue />
  </SelectTrigger>
  <SelectContent className="min-w-[116px]">
    <SelectItem className="text-[24px]" value="GEO">GEO</SelectItem>
    <SelectItem className="text-[24px]" value="ENG">ENG</SelectItem>
    <SelectItem className="text-[24px]" value="RUS">RUS</SelectItem>
  </SelectContent>
</Select>
<ToggleSwitch/>
        </div>
    </div>
  </div>
  )
};

export default Header;
