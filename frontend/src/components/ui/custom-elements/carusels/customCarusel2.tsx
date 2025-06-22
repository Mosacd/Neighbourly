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
import { type VolunteerOpportunity } from "@/dummyData";
import { useEffect, useState } from "react";
import { fetchItemsForCarusels } from "@/API/requests";

const CaruselEvent = () => {
  
   const [eventData, seteventData] = useState<VolunteerOpportunity[]>();
  
        useEffect(() => {
          const loadData = async () =>{
             try {
        const data = await fetchItemsForCarusels();
        console.log("Fetched data:", data);

        if (Array.isArray(data)) {
          seteventData(data);
        } else {
          seteventData([]);
        }
      } catch (error) {
        console.error("Error loading event data:", error);
        seteventData([]);
      }
          }
          
          loadData()
      },[])
      
      
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {eventData && eventData.map((data) => (
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
