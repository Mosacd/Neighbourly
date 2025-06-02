import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CardForHome from "./cards";


const CaruselHome = () => {

    return(
<Carousel className="w-full  max-w-[1536px]">
  <CarouselContent>
    <CarouselItem><CardForHome/></CarouselItem>
    <CarouselItem><CardForHome/></CarouselItem>
    <CarouselItem><CardForHome/></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselIndicator />
</Carousel>
    )
}


export default CaruselHome;