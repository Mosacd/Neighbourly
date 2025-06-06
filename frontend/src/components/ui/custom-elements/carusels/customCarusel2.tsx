
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselNext2,
  CarouselPrevious,
  CarouselPrevious2,
} from "@/components/ui/carousel"
import CardForHome from "../cards/cardVariant1";
import image from "@/assets/carusel img.png"
import CardForSingleEvent from "../cards/cardVariant2";
const homeCardsData = [
  {
    image: image,
    title: "Library Reading Buddy Program",
    description: "Volunteer at your local library and help kids improve their reading skills in a fun, supportive environment.",
  },
  {
    image: "/images/park-cleanup.jpg",
    title: "Park Cleanup Crew",
    description: "Join a community initiative to keep our parks clean and safe. Great for team-building and outdoor lovers.",
  },
  {
    image: "/images/food-drive.jpg",
    title: "Community Food Drive",
    description: "Help collect and organize food donations for families in need across the city. Make a real difference today.",
  }
];


const CaruselEvent = () => {
    return(
<Carousel className="w-full  max-w-[1443px] px-[10px]">
  <CarouselContent>
    {homeCardsData.map((data) => <CarouselItem><CardForSingleEvent data={data}/></CarouselItem> )}
  </CarouselContent>
  <CarouselPrevious2/>
  <CarouselNext2/>
</Carousel>
    )
}


export default CaruselEvent;