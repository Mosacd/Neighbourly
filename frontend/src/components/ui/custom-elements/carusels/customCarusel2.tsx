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
import { eventData } from "@/dummyData";

const CaruselEvent = () => {
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {eventData.map((data) => (
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
