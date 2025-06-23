import CaruselSection from "@/components/sections/carusels/SingleEventSection";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "react-router-dom";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
// import type { VolunteerOpportunity } from "@/dummyData";
import EnhancedLoader from "@/components/ui/custom-loader";
import { useGetSingleEvent } from "@/reactQuery/query/events";
import { eventData } from "@/dummyData";


dayjs.extend(relativeTime);


export function formatDate(rawDate: string, format: string = 'YYYY MMMM DD'): string {
  return dayjs(new Date(rawDate)).format(format);
}


const SingleEvent = () => {

   const location = useLocation();
   const {id} = useParams();

  // const [Loader, setLoader] = useState(true);
  // const [eventData, seteventData] = useState<VolunteerOpportunity | null>(null);
 const [isExpanded, setIsExpanded] = useState(() => window.innerWidth >= 1024);
const [hasUserToggled, setHasUserToggled] = useState(false);


useEffect(() => {
  const handleResize = () => {
    if (!hasUserToggled) {
      setIsExpanded(window.innerWidth >= 1024);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, [hasUserToggled]);

const toggleExpand = () => {
  setHasUserToggled(true);
  setIsExpanded(prev => !prev);
};


// useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchSingleItem(id);
//         seteventData(data);
//         setLoader(false);
//       } catch (err) {
//         console.error("Failed to load events:", err);
//       }
//     };

//     loadData();
//   },[id])



const {data: event, isPending, error, isError } = useGetSingleEvent(id ?? '');

    if(isPending){
      return <EnhancedLoader/>
    }

    if(isError){
      throw new Error(`couldn't get event ${error}`);
    }

     if(!eventData){
     return <div>No Such Event Exists</div>
     }

        const description = event?.description || "";
     const truncatedDescription = description.slice(0, 200) + "...";
     const shouldShowToggle = description.length > 200;
  const imgUrl = `${import.meta.env.VITE_BASE_URL}${event?.image}`
  
    return (
        <>
        <div className="w-full">
        <div className="noto-sans-semibold px-[30px] text-center md:text-start text-md sm:text-lg 2xl:text-xl max-w-[1408px] 2xl:max-w-[1680px] m-auto mt-[64px] mb-[32px] sm:mt-[80px] sm:mb-[120px]">{location.pathname.slice(1, -2)} / {event.title}</div>
        <div className="flex px-[30px] text-center lg:text-start flex-col-reverse items-center lg:items-stretch lg:flex-row justify-between gap-[20px] w-full lg:max-h-[801px] max-w-[1408px] 2xl:max-w-[1680px] m-auto mb-[120px] sm:mb-[200px]">
            <div className="flex flex-col gap-[40px] justify-between max-w-[720px] 2xl:max-w-[830px] w-full">
               <div className="max-2xl:lg:max-h-[470px] overflow-y-auto pr-5"  style={{
    scrollbarWidth: "thin",
  }}>
               <div className="mb-[32px] sm:mb-[73px]">
                <h1 className="mb-2 sm:mb-5 noto-sans-semibold text-xl sm:text-2xl md:text-3xl 2xl:text-4xl">
            {event?.title}
                </h1>
                <span className="noto-sans-semibold text-neutral-500 text-md sm:text-lg 2xl:text-xl">Begins on {formatDate(event.startdate.toString())}</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-[16px] mb-[32px] sm:mb-[40px]">
                    <p className="noto-sans-semibold text-md sm:text-lg 2xl:text-xl">🌍<span className="hidden sm:inline">Location -</span> {event.location}</p>
                    <p className="noto-sans-semibold text-md sm:text-lg 2xl:text-xl">📅<span className="hidden sm:inline">Schedule -</span> {event.schedule}</p>
                    </div>
                <p className="noto-sans-regular text-md sm:text-lg 2xl:text-xl lg:max-h-[150px] 2xl:max-h-[385px]">
                    {isExpanded || description.length < 200 ? description : truncatedDescription }
                </p>
                                              {shouldShowToggle &&  <Button className="text-lg block lg:hidden text-[#868686] m-auto max-w-fit mt-2" onClick={toggleExpand} variant={"ghost"}>Show {isExpanded ? "Less":"More"} </Button>}

                </div>
                </div>
                <div className="flex w-full justify-center items-center flex-col sm:flex-row sm:justify-between lg:justify-start gap-3 lg:gap-10">
                <Button variant={"default"} className="shrink-1 lg:max-w-[210px] 2xl:max-w-[264px] w-full max-lg:h-[53px] max-lg:text-[24px] max-w-[343px]">Sign Up</Button>
                <Button variant={"secondary"} className="shrink-1 lg:max-w-[210px] 2xl:max-w-[264px] w-full max-lg:h-[53px] max-lg:text-[24px] max-w-[343px]">Bookmark</Button>
                </div>
            </div>
            <img className="w-full max-2xl:max-h-[563px] max-w-[652px] 2xl:max-w-[830px] rounded-[24px]" src={imgUrl} alt="" />
        </div>
        <CaruselSection/>
        </div>
        </>
    )
}


export default SingleEvent;