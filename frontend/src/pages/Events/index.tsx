import CardForEventList from "@/components/ui/custom-elements/cards/cardVariant3";
import SearchBar from "@/components/ui/custom-elements/searchBar";
import Filters from "@/components/ui/custom-elements/filters";
import FiltersMobile from "@/components/ui/custom-elements/mobileFilters";
import useMediaQuery from "@/hooks/MediaQuery";
// import { useEffect, useMemo, useState } from "react";

// import type { VolunteerOpportunity } from "@/dummyData";
import EnhancedLoader from "@/components/ui/custom-loader";
// import { useLocation } from "react-router-dom";
import Sort from "@/components/ui/custom-elements/sort";
import { useGetEvents } from "@/reactQuery/query/events";



const Events = () => {
  
  
  // const [events, setEvents] = useState<VolunteerOpportunity[] | null>(null);
  // const [Loading, setLoading] = useState(true);

//  const location = useLocation();

// const queryParams = useMemo(() => {
//   return new URLSearchParams(location.search);
// }, [location.search]);


  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const data = await fetchItems(queryParams);
  //       setEvents(Array.isArray(data) ? data : [])
        
  //     } catch (err) {
  //       console.error("Failed to load events:", err);
  //     }finally {
  //     setLoading(false);
  //   }
  //   };

  //   loadData();

  //   const interval = setInterval(loadData, 5 * 60 * 1000); // every 5 mins

  //   return () => clearInterval(interval); // cleanup on unmount

  // },[location.search])


 const {data:events = [], isPending, error, isError } = useGetEvents();

 if(isError){
  throw new Error(`couldn't fetch events: ${error}`)
 }

   const isDesktop = useMediaQuery("(min-width: 1024px)");



  
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
            <Sort/>
           {!isDesktop && <FiltersMobile />}
          </div>
        </div>
       <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-1 relative items-center gap-x-[10px] gap-y-[24px] sm:gap-[20px] md:gap-[24px] min-h-[200px]">
  {isPending ? (
    <div className="absolute left-1/2 transform -translate-x-1/2 lg:top-1">
      <EnhancedLoader/>
    </div>
  ) : (events && events.length > 0 ? events.map((data) => {
    return <CardForEventList key={data.id} data={data} />;
  }) : (
    <div className="col-span-full flex items-center justify-center h-full">
      currently no events are hosted
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

   
  

export default Events;
