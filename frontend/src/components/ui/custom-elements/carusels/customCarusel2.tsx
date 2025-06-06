import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext2,
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
      <CarouselPrevious2 />
      <CarouselNext2 />
    </Carousel>
  );
};

export default CaruselEvent;
