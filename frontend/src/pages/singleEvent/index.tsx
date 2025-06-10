// import cat from "@/assets/cat pic.png"
import CaruselSection from "@/components/sections/carusels/SingleEventSection";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "react-router-dom";
import { eventData } from "@/dummyData";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";


dayjs.extend(relativeTime);


export function formatDate(rawDate: string, format: string = 'YYYY MMMM DD'): string {
  return dayjs(new Date(rawDate)).format(format);
}


const SingleEvent = () => {

   const location = useLocation();
    const {id} = useParams();
    const convertedId = Number(id);

   const  img = eventData[convertedId-1]?.image

    return (
        <>
        <div className="w-full">
        <div className="noto-sans-semibold px-[30px] text-center md:text-start text-lg 2xl:text-xl max-w-[1408px] 2xl:max-w-[1680px] m-auto mt-[80px] mb-[120px]">{location.pathname.slice(1, -2)} / Animal Shelter Helper Day</div>
        <div className="flex px-[30px] text-center lg:text-start flex-col-reverse items-center lg:items-stretch lg:flex-row justify-between gap-[20px] w-full lg:max-h-[801px] 2xl:max-w-[1680px] m-auto mb-[200px]">
            <div className="flex flex-col gap-[40px] justify-between max-w-[720px] 2xl:max-w-[830px] w-full">
               <div className="overflow-y-auto pr-5"  style={{
    scrollbarWidth: "thin",
  }}>
               <div className="mb-[73px]">
                <h1 className="mb-5 noto-sans-semibold text-xl sm:text-2xl md:text-3xl 2xl:text-4xl">
            {eventData[convertedId-1]?.title}
                </h1>
                <span className="noto-sans-semibold text-neutral-500 text-md sm:text-lg 2xl:text-xl">Begins on {formatDate(eventData[convertedId-1]?.startdate.toString())}</span>
                </div>
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[16px] ">
                    <p className="noto-sans-semibold text-md sm:text-lg 2xl:text-xl">🌍Location - {eventData[convertedId-1]?.location}</p>
                    <p className="noto-sans-semibold text-md sm:text-lg 2xl:text-xl">📅Schedule - {eventData[convertedId-1]?.schedule}</p>
                    </div>
                <p className="noto-sans-regular text-lg 2xl:text-xl max-h-[385px]">
                   {eventData[convertedId-1]?.description} </p>
                </div>
                </div>
                <div className="flex w-full justify-center items-center flex-col sm:flex-row sm:justify-between lg:justify-start gap-3 lg:gap-10">
                <Button variant={"default"} className="shrink-1 lg:max-w-[210px] 2xl:max-w-[264px] w-full max-lg:h-[53px] max-lg:text-[24px] max-w-[343px]">Sign Up</Button>
                <Button variant={"secondary"} className="shrink-1 lg:max-w-[210px] 2xl:max-w-[264px] w-full max-lg:h-[53px] max-lg:text-[24px] max-w-[343px]">Bookmark</Button>
                </div>
            </div>
            <img className="w-full max-w-[652px] 2xl:max-w-[830px] rounded-[24px]" src={img} alt="" />
        </div>
        <CaruselSection/>
        </div>
        </>
    )
}


export default SingleEvent;