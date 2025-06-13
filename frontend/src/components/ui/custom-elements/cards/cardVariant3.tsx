import { Link } from "react-router-dom";
import type { VolunteerOpportunity } from "@/dummyData";


const CardForEventList:React.FC<{data:VolunteerOpportunity}> = ({data}) => {

return( 
     <Link to={`/Events/${data.id}`} className="bg-white dark:bg-black m-auto
     hover:-translate-y-1.5 hover:shadow-xl hover:border-black dark:hover:border-white duration-150
     overflow-hidden 
     border-2 shadow-md  lg:p-[16px] 2xl:p-[24px] h-[220px] xs:h-[250px] md:h-[321px] max-w-[164px] sm:max-w-[250px] md:max-w-[260px] lg:max-h-[240px] 2xl:max-h-[301px] rounded-[24px] lg:max-w-[931px] 2xl:max-w-[1113px] w-full hover:cursor-pointer">
              <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-4 2xl:gap-8">
                <div className="w-full max-lg:px-[10px] max-w-[604px] 2xl:max-w-[754px]  flex flex-col items-center text-center lg:text-start lg:items-start">
                    <h1 className="noto-sans-semibold title-clamp text-sm sm:text-md md:text-lg lg:text-2xl 2xl:text-3xl mb-[32px]">{data.title}</h1>
                    <p className="noto-sans-regular description-clamp-eventpage text-lg 2xl:text-xl text-[#545454] dark:text-[#828282]">{data.Briefdescription}</p>
                </div>
                <img className="w-full rounded-b-none lg:rounded-b-[24px] lg:max-w-[224px] 2xl:max-w-[280px] h-[130px] xs:h-[147px] md:h-[200px] lg:h-[204px] 2xl:h-[253px] rounded-[24px]" src={data.image} alt="" />
              </div>
    </Link>   
)
}


export default CardForEventList;