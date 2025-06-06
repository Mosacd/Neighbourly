import { Link } from "react-router-dom";
import { Button } from "../../button";
import type { VolunteerOpportunity } from "@/dummyData";


const CardForHome:React.FC<{data:VolunteerOpportunity}> = ({data}) => {

return(
    
<div className="bg-[#FFDD71] border-2 border-main m-auto shadow-md py-[29px] px-[24px] max-h-[409px] rounded-[24px] max-w-[1363px] w-full active:cursor-grabbing select-none">
              <div className="flex justify-between items-center">
                <div className="w-full max-w-[852px] h-[253px]">
                    <h1 className="noto-sans-semibold text-[40px] mb-[48px]">{data.title}</h1>
                    <p className="noto-sans-regular text-[24px] text-[#828282] mb-[32px]">{data.description}</p>
                   <Link to={`/Events/${data.id}`}><Button variant={"secondary"}>See More</Button></Link> 
                </div>
                <img className="w-full max-w-[400px] h-[361px] rounded-[24px]" src={data.image} alt="" />
              </div>
    </div>

)
}


export default CardForHome;