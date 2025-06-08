import CardForEventList from "@/components/ui/custom-elements/cards/cardVariant3";
import { eventData } from "@/dummyData";

const Events = () => {

    return (
        
        <div className="mt-[144px]">
            <div>

            </div>
            <div className="">
                <div className="flex flex-col items-center gap-[24px]">
                {eventData.map((data) => {
                    return  <CardForEventList data={data}/>
                })}
               </div>
            </div>
        </div>
       
    )
}


export default Events;