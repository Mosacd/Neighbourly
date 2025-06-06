import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardForHome from "../cards/cardVariant1";
import { eventData } from "@/dummyData";

const CaruselHome = () => {
  return (
    <Carousel className="w-full  max-w-[1443px] px-[10px]">
      <CarouselContent>
        {eventData.map((data) => (
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
