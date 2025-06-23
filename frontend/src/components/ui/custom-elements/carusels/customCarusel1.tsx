import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardForHome from "../cards/cardVariant1";
import { useGetEventsForCarousels } from "@/reactQuery/query/events";
// import { useEffect, useState } from "react";
// import type { VolunteerOpportunity } from "@/dummyData";

const CaruselHome = () => {
  // const [eventData, seteventData] = useState<VolunteerOpportunity[]>([]);

  //     useEffect(() => {
  //       const loadData = async () =>{
  //           try {
  //       const data = await fetchItemsForCarusels();
  //       console.log("Fetched data:", data);

  //       if (Array.isArray(data)) {
  //         seteventData(data);
  //       } else {
  //         console.warn("Expected an array, got:", data);
  //         seteventData([]);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch carousel data:", error);
  //       seteventData([]);
  //     }
  //       }
        
  //       loadData()
  //   },[])


     const {data: events = [], isPending, error, isError } = useGetEventsForCarousels()
  
  
     if(isPending){
      console.log("loading")
     }
  
     if (isError) {
  console.error("❌ Failed to fetch carousel events:", error);
  return <div className="text-red-500">Couldn't load events. Please try again later.</div>;
}

    
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {events && events.map((data) => (
          <CarouselItem key={data.id}>
            <CardForHome data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicator />
    </Carousel>
  );
};

export default CaruselHome;
