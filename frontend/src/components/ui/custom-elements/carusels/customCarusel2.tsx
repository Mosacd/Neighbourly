import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselNext2,
  CarouselPrevious,
  CarouselPrevious2,
} from "@/components/ui/carousel";
import CardForSingleEvent from "../cards/cardVariant2";
// import { type VolunteerOpportunity } from "@/dummyData";
// import { useEffect, useState } from "react";
// import { fetchItemsForCarusels } from "@/API/requests";
import { useGetEventsForCarousels } from "@/reactQuery/query/events";

const CaruselEvent = () => {
  
  //  const [eventData, seteventData] = useState<VolunteerOpportunity[]>();
  
  //       useEffect(() => {
  //         const loadData = async () =>{
  //            try {
  //       const data = await fetchItemsForCarusels();
  //       console.log("Fetched data:", data);

  //       if (Array.isArray(data)) {
  //         seteventData(data);
  //       } else {
  //         seteventData([]);
  //       }
  //     } catch (error) {
  //       console.error("Error loading event data:", error);
  //       seteventData([]);
  //     }
  //         }
          
  //         loadData()
  //     },[])

   const {data: events = [], error, isError } = useGetEventsForCarousels()
      
 
   if (isError) {
  console.error("❌ Failed to fetch carousel events:", error);
  return <div className="text-red-500">Couldn't load events. Please try again later.</div>;
}

      
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {events && events.map((data) => (
          <CarouselItem key={data.id}>
            <CardForSingleEvent data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious2 className="hidden md:flex" />
      <CarouselNext2 className="hidden md:flex"  />
         <CarouselPrevious className=" md:hidden"  />
      <CarouselNext className=" md:hidden"  />
       <CarouselIndicator className=" md:hidden"  />
    </Carousel>
  );
};

export default CaruselEvent;
