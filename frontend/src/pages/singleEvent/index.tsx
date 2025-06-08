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
        <div className="w-full px-[30px]">
        <div className="noto-sans-semibold text-[24px] max-w-[1680px] m-auto mt-[80px] mb-[120px]">{location.pathname.slice(1, -2)} / Animal Shelter Helper Day</div>
        <div className="flex justify-between gap-[20px] w-full max-h-[801px] max-w-[1680px] m-auto mb-[200px]">
            <div className="flex flex-col gap-[40px] justify-between max-w-[830px] w-full">
               <div className="overflow-y-auto pr-5"  style={{
    scrollbarWidth: "thin",
  }}>
               <div className="mb-[73px]">
                <h1 className="text-[48px] mb-5 noto-sans-semibold">
            {eventData[convertedId-1]?.title}
                </h1>
                <span className="noto-sans-semibold text-neutral-500 text-[24px]">Begins on {formatDate(eventData[convertedId-1]?.startdate.toString())}</span>
                </div>
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[16px] ">
                    <p className="noto-sans-semibold text-[24px]">🌍Location - {eventData[convertedId-1]?.location}</p>
                    <p className="noto-sans-semibold text-[24px]">📅Schedule - {eventData[convertedId-1]?.schedule}</p>
                    </div>
                <p className="noto-sans-regular text-[24px] max-h-[385px]">
                   {eventData[convertedId-1]?.description} </p>
                </div>
                </div>
                <div className="flex gap-10">
                <Button variant={"default"} className="max-w-[264px] w-full">Sign Up</Button>
                <Button variant={"secondary"} className="max-w-[264px] w-full">Bookmark</Button>
                </div>
            </div>
            <img className="w-full max-w-[830px] rounded-[24px]" src={img} alt="" />
        </div>
        <CaruselSection/>
        </div>
        </>
    )
}


export default SingleEvent;