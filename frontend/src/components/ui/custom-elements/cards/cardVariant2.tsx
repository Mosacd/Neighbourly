import { Link } from "react-router-dom";
import { Button } from "../../button";
import type { VolunteerOpportunity } from "@/dummyData";


const CardForSingleEvent:React.FC<{data:VolunteerOpportunity}> = ({data}) => {
   const imgUrl = `${import.meta.env.VITE_BASE_URL}${data.image}`

return(    
<div className="bg-white dark:bg-black max-md:h-[481px] transition-color duration-300 overflow-hidden m-auto border-2 shadow-md py-[21px] 2xl:py-[29px] px-[16px] 2xl:px-[24px] md:max-h-[423px] rounded-[24px] max-w-[375px] md:max-w-[1190px] 2xl:max-w-[1363px] w-full active:cursor-grabbing select-none">
              <div className="flex flex-col-reverse h-full md:flex-row justify-between items-center gap-6 2xl:gap-10">
                <div className="w-full max-w-[852px] flex flex-col h-full justify-between items-center text-center md:text-start md:items-start">
                    <h1 className="noto-sans-semibold title-clamp text-xl md:text-2xl 2xl:text-3xl mb-[24px] md:mb-[40px] 2xl:mb-[48px]">{data.title}</h1>
<p className="description-clamp noto-sans-regular text-lg 2xl:text-xl text-[#545454] dark:text-[#828282] mb-[26px] 2xl:mb-[32px]">
  {data.Briefdescription}
</p>                 <Link className="w-full md:w-fit" to={`/Dashboard/Events/${data.id}`}><Button className="px-6 w-full max-md:text-[24px] max-md:h-[53px]" variant={"secondary"}>See More</Button></Link> 
                </div>
                  <div className="flex-shrink-0">
                <img className="rounded-[24px] w-[296px] h-[268px] md:w-[320px] md:h-[288px] 2xl:w-[400px] 2xl:h-[361px] object-cover" src={imgUrl} alt="" />
                </div>
              </div>
    </div>
)
}


export default CardForSingleEvent;