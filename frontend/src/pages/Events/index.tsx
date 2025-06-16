import CardForEventList from "@/components/ui/custom-elements/cards/cardVariant3";
import SearchBar from "@/components/ui/custom-elements/searchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerForSort,
  SelectValue,
} from "@/components/ui/select";
import Filters from "@/components/ui/custom-elements/filters";
import FiltersMobile from "@/components/ui/custom-elements/mobileFilters";
import useMediaQuery from "@/hooks/MediaQuery";
import { useEffect, useState } from "react";
import { fetchItems } from "@/API/requests";
import type { VolunteerOpportunity } from "@/dummyData";
import EnhancedLoader from "@/components/ui/custom-loader";


const Events = () => {

  const [events, setEvents] = useState<VolunteerOpportunity[] | null>(null);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchItems();
        setEvents(data);
          setLoader(false);
      } catch (err) {
        console.error("Failed to load events:", err);
      }
    };

    loadData();
  },[])

   const isDesktop = useMediaQuery("(min-width: 1024px)");

   
    if(Loader){
      return <EnhancedLoader/>
    }

     if(!events){
     return <div>currently no events are hosted</div>
     }
  
  return (
    <div className="mt-[100px] sm:mt-[144px] flex justify-between gap-20 px-[16px] sm:px-[40px]">
     {isDesktop && (
        <div className="max-w-[334px] shadow-md h-fit 2xl:max-w-[400px] w-full border-2 rounded-md p-5 shrink-2">
          <Filters />
        </div>
      )}

      <div className="max-w-[931px] 2xl:max-w-[1113px] w-full">
        <div className="flex flex-col gap-5 md:flex-row items-center justify-between lg:justify-center mb-[40px] sm:mb-[60px] 2xl:mb-[80px]">
          <SearchBar />
          <div className="flex w-full max-w-[250px] lg:w-fit justify-between">
          <Select defaultValue="ENG">  
            <SelectTriggerForSort className="w-full min-w-[110px] lg:min-w-[130px] max-w-[120px] px-0 2xl:max-w-[240px] data-[size=default]:h-[53px] text-md sm:text-lg 2xl:text-xl border-none noto-sans-semibold">
              <SelectValue>Sort By</SelectValue>
            </SelectTriggerForSort> 
            <SelectContent  position="popper"
                sideOffset={5}
                align="center" className="min-w-[116px] max-xs:max-w-[120px] ">
              <SelectItem value="GEO">Newest</SelectItem>
              <SelectItem value="ENG">Oldest</SelectItem>
              <SelectItem  value="RUS"><span className="max-xs:hidden">Alphabetically, </span>Z-A</SelectItem>
              <SelectItem value="RUS"><span className="max-xs:hidden">Alphabetically, </span>A-Z</SelectItem>
            </SelectContent>
          </Select>
           {!isDesktop && <FiltersMobile />}
          </div>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-1  items-center gap-x-[10px] gap-y-[24px] sm:gap-[20px] md:gap-[24px]">
          {events ? events.map((data) => {
            return <CardForEventList data={data} />;
          }) : <div>currently no events are hosted</div>}
        </div>
      </div>
    </div>
  );
};

export default Events;
