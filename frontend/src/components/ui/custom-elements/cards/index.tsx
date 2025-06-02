import image from "@/assets/carusel img.png"
import { Button } from "../../button";
const CardForHome = () => {

return(    <div className="bg-[#FFDD71] shadow-sm py-[29px] px-[24px] h-[409px] rounded-[24px]">
              <div className="flex justify-between items-center">
                <div className="w-full max-w-[852px] h-[253px]">
                    <h1 className="noto-sans-semibold text-[40px] mb-[48px]">Library Reading Buddy Program</h1>
                    <p className="noto-sans-regular text-[24px] text-[#828282] mb-[32px]">Help young readers build confidence by reading with them at the downtown library.</p>
                    <Button variant={"secondary"}>See More</Button>
                </div>
                <img className="w-full max-w-[400px] h-[361px] rounded-[24px]" src={image} alt="" />
              </div>
    </div>
)
}


export default CardForHome;