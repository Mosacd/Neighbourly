import cat from "@/assets/cat pic.png"
import CaruselSection from "@/components/sections/carusels/SingleEventSection";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const SingleEvent = () => {

   const location = useLocation();
  
    return (
        <>
        <div className="noto-sans-semibold text-[24px] max-w-[1680px] m-auto mt-[80px] mb-[120px]">{location.pathname.slice(1)} / Animal Shelter Helper Day</div>
        <div className="flex justify-between gap-[20px] w-full max-h-[801px] max-w-[1680px] m-auto mb-[200px]">
            <div className="flex flex-col justify-between">
                <h1 className="text-[48px] noto-sans-semibold">
                Animal Shelter Helper Day
                </h1>
                <div className="flex flex-col gap-[50px]">
                    <div className="flex flex-col gap-[16px] ">
                    <p className="noto-sans-semibold text-[24px]">🌍Location - Paws & Whiskers Shelter</p>
                    <p className="noto-sans-semibold text-[24px]">📅Schedule - Every Wednesday, 9:00 AM – 12:00 PM</p>
                    </div>
                <p className="noto-sans-regular text-[24px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut culpa beatae sit enim necessitatibus commodi debitis consequatur, tenetur eos perspiciatis, totam adipisci et cum aliquid nam architecto saepe velit iusto!
                </p>
                </div>
                <Button variant={"default"} className="max-w-[264px] w-full">Sign Up</Button>
            </div>
            <img className="w-full max-w-[830px]" src={cat} alt="" />
        </div>
        <CaruselSection/>
        </>
    )
}


export default SingleEvent;