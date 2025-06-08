import CardForEventList from "@/components/ui/custom-elements/cards/cardVariant3";
import { eventData } from "@/dummyData";
import SearchBar from "@/components/ui/custom-elements/searchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerForSort,
  SelectValue,
} from "@/components/ui/select";

const Events = () => {
  return (
    <div className="mt-[144px] flex justify-between px-[40px]">
      <div className="max-w-[277px] w-full">
    
      </div>
      <div className="max-w-[1113px] w-full">
        <div className="flex items-center justify-between mb-[80px]">
          <SearchBar />
          <Select defaultValue="ENG">
            <SelectTriggerForSort className="w-[240px] data-[size=default]:h-[53px] text-[24px] border-none noto-sans-semibold">
              <SelectValue>Sort By</SelectValue>
            </SelectTriggerForSort>
            <SelectContent className="min-w-[116px]">
              <SelectItem className="text-[24px]" value="GEO">Newest</SelectItem>
              <SelectItem className="text-[24px]" value="ENG">Oldest</SelectItem>
              <SelectItem className="text-[24px]" value="RUS">Alphabetically, Z-A</SelectItem>
              <SelectItem className="text-[24px]" value="RUS">Alphabetically, A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-center gap-[24px]">
          {eventData.map((data) => {
            return <CardForEventList data={data} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
