import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "../checkbox";
import { Button } from "../button";


const locations = [
  { label: "Downtown", value: "Downtown" },
  { label: "Uptown", value: "Uptown" },
  { label: "Westside", value: "Westside" },
  { label: "Eastside", value: "Eastside" },
  { label: "Suburbs", value: "Suburbs" },
];

const timeCommitments = [
  { label: "Weekly commitment", value: "Weekly commitment" },
  { label: "One-time event", value: "One-time event" },
  { label: "1–2 hours", value: "1–2 hours" },
  { label: "Half-day", value: "Half-day" },
  { label: "Full-day", value: "Full-day" },
];

const ageRequirements = [
  { label: "13+", value: "13+" },
  { label: "16+", value: "16+" },
  { label: "18+", value: "18+" },
];

const dates = [
  { label: "This week", value: "This week" },
  { label: "This Month", value: "This Month" },
];

type Selections = {
  locations : string[],
  timeCommitments: string[],
  ageRequirements: string[],
  Dates: string[]
}

const Filters = () => {
    
  const [searchParams, setSearchParams] = useSearchParams();

  const [selections, setSelections] = useState<Selections>({
      locations: [],
      timeCommitments: [],
      ageRequirements: [],
      Dates: []
    })

  const [hasInitialized, setHasInitialized] = useState(false);
  
  type SelectionKey = keyof Selections;

  const toggleItem = (value: string, key: SelectionKey) => {
    setSelections((prev) => {
      const currentList = prev[key];
      if (currentList.includes(value)) {
        return { ...prev, [key]: currentList.filter((v) => v !== value) };
      } else {
        return { ...prev, [key]: [...currentList, value] };
      }
    });
  };
  
     // Sync with URL on change
    useEffect(() => {
      if (!hasInitialized) return;
  
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev.toString());
        newParams.delete("location");
        newParams.delete("timeCommitment");
        newParams.delete("ageRequirement");
        newParams.delete("date");
  
            
           selections.locations.forEach((l) => newParams.append("location", l));
      selections.timeCommitments.forEach((c) => newParams.append("timeCommitment", c));
      selections.ageRequirements.forEach((r) => newParams.append("ageRequirement", r));
      selections.Dates.forEach((d) => newParams.append("date", d));
        return newParams;
      });
  
    }, [selections, hasInitialized]);
  
    
    useEffect(() => {
    const locationParam = searchParams.getAll("location");
    const timeCommitmentParam = searchParams.getAll("timeCommitment");
    const RequirementParam = searchParams.getAll("ageRequirement");
    const dateParam = searchParams.getAll("date");
  
      setSelections({
        locations: locations.filter((l) => locationParam.includes(l.value)).map((l) => l.value),
        timeCommitments: timeCommitments.filter((t) => timeCommitmentParam.includes(t.value)).map((t) => t.value),
        ageRequirements: ageRequirements.filter((a) => RequirementParam.includes(a.value)).map((a) => a.value),
        Dates: dates.filter((d) => dateParam.includes(d.value)).map((d) => d.value),
      });
      
      setHasInitialized(true);
    }, []);
  
  
  
    const clearAllFilters = () => {
    setSelections({
      locations: [],
      timeCommitments: [],
      ageRequirements: [],
      Dates: []
    });
    setSearchParams(new URLSearchParams());
  };
  
    return(

<>
<div className="flex items-center flex-col gap-5 justify-between mb-[44px]">
        <h1 className="noto-sans-semibold text-3xl lg:text-2xl 2xl:text-3xl w-full text-center">Filters</h1>
        <div className="border-y-2 w-full flex items-center justify-center">
      <Button onClick={clearAllFilters} variant={"ghost"} className="text-red-800 text-xl lg:text-lg 2xl:text-xl 2xl:text-[24px] hover:text-red-700 hover:bg-transparent dark:hover:bg-transparent h-fit w-fit">Clear All</Button>
      </div>
      </div>
      <div className="flex justify-center">
      <div className="flex flex-col gap-[48px] w-fit pb-10">
      <div>
      <h2 className="mb-[30px] 2xl:mb-[40px] noto-sans-semibold text-xl lg:text-lg 2xl:text-xl text-center border-b-2 pb-2">Location</h2>
     
        {locations.map(({label, value}, i)=> {
          return(<div key={value} className="flex items-center *:hover:cursor-pointer gap-[12px] 2xl:gap-[16px]">
              <Checkbox checked={selections.locations.includes(value)}
                onCheckedChange={() => toggleItem(value, "locations")}
                id={`location-${i}`}
              />
          <label htmlFor={`location-${i}`} className="text-xl lg:text-lg 2xl:text-xl noto-sans-regular w-full">
              {label}
              </label>
                  </div>
          )
        })}
          
      </div>
        <div>
     <h2 className="mb-[30px] 2xl:mb-[40px] noto-sans-semibold text-xl lg:text-lg 2xl:text-xl text-center border-b-2 pb-2">Time Commitment</h2>
     
        {timeCommitments.map(({label, value}, i)=> {
          return(<div key={value} className="flex items-center *:hover:cursor-pointer gap-[12px] 2xl:gap-[16px]">
              <Checkbox checked={selections.timeCommitments.includes(value)}
                onCheckedChange={() => toggleItem(value, "timeCommitments")}
                id={`timeCommitment-${i}`}
              />
          <label htmlFor={`timeCommitment-${i}`} className="text-xl lg:text-lg 2xl:text-xl noto-sans-regular w-full">
              {label}
              </label>
                  </div>
          )
        })}
          
      </div>
        <div>
      <h2 className="mb-[30px] 2xl:mb-[40px] noto-sans-semibold text-xl lg:text-lg 2xl:text-xl text-center border-b-2 pb-2">Age Requirements</h2>
     
        {ageRequirements.map(({label, value}, i)=> {
          return(<div key={value} className="flex items-center *:hover:cursor-pointer gap-[12px] 2xl:gap-[16px]">
              <Checkbox checked={selections.ageRequirements.includes(value)}
                onCheckedChange={() => toggleItem(value, "ageRequirements")}
                id={`ageRequirement-${i}`}
              />
          <label htmlFor={`ageRequirement-${i}`} className="text-xl lg:text-lg 2xl:text-xl noto-sans-regular w-full">
              {label}
              </label>
                  </div>
          )
        })}
          
      </div>
        <div>
      <h2 className="mb-[30px] 2xl:mb-[40px] noto-sans-semibold text-xl lg:text-lg 2xl:text-xl text-center border-b-2 pb-2">Date</h2>
     
        {dates.map(({label, value}, i)=> {
          return(<div key={value} className="flex items-center *:hover:cursor-pointer gap-[12px] 2xl:gap-[16px]">
              <Checkbox checked={selections.Dates.includes(value)}
                onCheckedChange={() => toggleItem(value, "Dates")}
                id={`date-${i}`}
              />
          <label htmlFor={`date-${i}`} className="text-xl lg:text-lg 2xl:text-xl noto-sans-regular w-full">
              {label}
              </label>
                  </div>
          )
        })}
          
      </div>
      </div>
      </div>
      </>
    )
    
}

export default Filters;