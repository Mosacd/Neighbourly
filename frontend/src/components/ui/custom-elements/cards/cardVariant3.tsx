import { Link } from "react-router-dom";
import type { VolunteerOpportunity } from "@/dummyData";


const CardForEventList:React.FC<{data:VolunteerOpportunity}> = ({data}) => {

return( 
     <Link to={`/Events/${data.id}`} className="bg-white m-auto border-2 shadow-md p-[24px] max-h-[301px] rounded-[24px] max-w-[1113px] w-full">
              <div className="flex justify-between items-center">
                <div className="w-full max-w-[754px] h-[152px]">
                    <h1 className="noto-sans-semibold text-[40px] mb-[32px]">{data.title}</h1>
                    <p className="noto-sans-regular text-[24px] text-[#828282] line-clamp-2">{data.description}</p>
                </div>
                <img className="w-full max-w-[280px] h-[253px] rounded-[24px]" src={data.image} alt="" />
              </div>
    </Link>   
)
}


export default CardForEventList;