import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardForHome from "../cards/cardVariant1";
import { useEffect, useState } from "react";
import { fetchItemsForCarusels } from "@/API/requests";
import type { VolunteerOpportunity } from "@/dummyData";

const CaruselHome = () => {
  const [eventData, seteventData] = useState<VolunteerOpportunity[]>();

      useEffect(() => {
        const loadData = async () =>{
            const data = await fetchItemsForCarusels()
            console.log(data);
            seteventData(data)
        }
        
        loadData()
    },[])
    
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {eventData && eventData.map((data) => (
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
