// import { fetchItemsForCarusels } from "@/API/requests";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CardForEventList from "@/components/ui/custom-elements/cards/cardVariant3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { VolunteerOpportunity } from "@/dummyData";
import { useGetEventsForCarousels } from "@/reactQuery/query/events";
// import { useEffect, useState } from "react";

const Profile = () => {

    //  const [eventData, seteventData] = useState<VolunteerOpportunity[]>([]);
      
    //         useEffect(() => {
    //           const loadData = async () =>{
    //              try {
    //         const data = await fetchItemsForCarusels();
    //         console.log("Fetched data:", data);
    
    //         if (Array.isArray(data)) {
    //           seteventData(data);
    //         } else {
    //           seteventData([]);
    //         }
    //       } catch (error) {
    //         console.error("Error loading event data:", error);
    //         seteventData([]);
    //       }
    //           }
              
    //           loadData()
    //       },[])

   const {data: events = [], isPending, error, isError } = useGetEventsForCarousels()


   if(isPending){
    console.log("loading")
   }

  if (isError) {
  console.error("❌ Failed to fetch carousel events:", error);
  return <div className="text-red-500">Couldn't load events. Please try again later.</div>;
}


    return (
        <div className="flex flex-col gap-[60px] 2xl:gap-[80px] w-full items-center my-[120px] px-5">
            
            <div className="w-full bg-[#FFDD71] dark:bg-black shadow-md border-main border-2 rounded-[16px] max-w-[556px] 2xl:max-w-[696px] sm:h-[306px] 2xl:h-[383px] gap-10 flex flex-col sm:flex-row justify-between items-center p-[24px]">
                <Avatar className="w-[200px] h-[200px] sm:w-[268px] sm:h-[268px] 2xl:w-[335px] 2xl:h-[335px] shadow-lg">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
<div className="flex flex-col xs:flex-row sm:flex-col gap-5 noto-sans-semibold">
    <div className="space-y-1">
        <h2 className="border-b-2 text-lg 2xl:text-xl border-black dark:border-white">User</h2>
    <h2 className="text-md 2xl:text-lg">Mosa</h2>
    <h2 className="text-md 2xl:text-lg">mynamewow@gmail.com</h2>
</div>

    <div className="space-y-1">
        <h2 className="border-b-2 text-lg 2xl:text-xl border-black dark:border-white">Events</h2>
        <h3 className="text-md 2xl:text-lg">saved: 6</h3>
        <h3 className="text-md 2xl:text-lg">going: 4</h3>
        <h3 className="text-md 2xl:text-lg">published: 8</h3>
    </div>

</div>
            </div>
            

<Tabs defaultValue="account" className="w-full max-w-[1036px] 2xl:max-w-[1296px]">
 <TabsList className="flex flex-col sm:flex-row w-full *:h-[44px] sm:h-[44px] 2xl:h-[56px] *:text-[18px] 2xl:*:text-[22px] *:noto-sans-semibold mb-[40px] 2xl:mb-[60px]">
  <TabsTrigger className="max-sm:h-[44px]" value="saved">Saved</TabsTrigger>
  <TabsTrigger value="going">Going</TabsTrigger>
  <TabsTrigger value="published">Published</TabsTrigger>
</TabsList>

  <TabsContent className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-1  items-center gap-y-[20px] gap-x-1 sm:gap-[20px] 2xl:gap-[40px]" value="saved">
 
    {events.map((data) => {
    return (<CardForEventList key={data.id} data={data} />)
  })}

    </TabsContent>
  <TabsContent className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-1  items-center gap-y-[20px] gap-x-1 sm:gap-[20px] 2xl:gap-[40px]" value="going">
   
    {events.map((data) => {
    return (<CardForEventList key={data.id} data={data} />)
  })}

    </TabsContent>
   <TabsContent className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-1  items-center gap-y-[20px] gap-x-1 sm:gap-[20px] 2xl:gap-[40px]" value="published">
    
     {events.map((data) => {
    return (<CardForEventList key={data.id} data={data} />)
  })}

    </TabsContent>
</Tabs>

        </div>
    )

}

export default Profile;