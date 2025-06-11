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


const Filters = () => {
    
  const [searchParams, setSearchParams] = useSearchParams();
      const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedTimeCommitments, setSelectedTimeCommitments] = useState<string[]>([]);
  const [selectedAgeRequirements, setSelectedAgeRequirements] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  const toggleItem = (value: string, list: string[], setList: (val: string[]) => void) => {
      if (list.includes(value)) {
        setList(list.filter((v) => v !== value));
      } else {
        setList([...list, value]);
      }
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
  
  
           selectedLocations.forEach((l) => newParams.append("location", l));
      selectedTimeCommitments.forEach((c) => newParams.append("timeCommitment", c));
      selectedAgeRequirements.forEach((r) => newParams.append("ageRequirement", r));
      selectedDates.forEach((d) => newParams.append("date", d));
        return newParams;
      });
  
    }, [selectedLocations, selectedTimeCommitments, selectedAgeRequirements, selectedDates, hasInitialized]);
  
    
    useEffect(() => {
    const locationParam = searchParams.getAll("location");
    const timeCommitmentParam = searchParams.getAll("timeCommitment");
    const RequirementParam = searchParams.getAll("ageRequirement");
    const dateParam = searchParams.getAll("date");
  
      setSelectedLocations(
        locations.filter((l) =>
          locationParam.includes(l.value)).map((l) => l.value)
      );
  
      
  
    
      setSelectedTimeCommitments(
        timeCommitments.filter((t) =>
          timeCommitmentParam.includes(t.value)
        ).map((t) => t.value)
      );
    
      setSelectedAgeRequirements(
        ageRequirements.filter((a) =>
          RequirementParam.includes(a.value)
        ).map((a) => a.value)
      );
  
      setSelectedDates(
        dates.filter((d) =>
          dateParam.includes(d.value)
        ).map((d) => d.value)
      )
  
      setHasInitialized(true);
    }, []);
  
  
  
    const clearAllFilters = () => {
    setSelectedLocations([]);
    setSelectedTimeCommitments([]);
    setSelectedAgeRequirements([]);
    setSelectedDates([]);
    setSearchParams(new URLSearchParams());
  };
  
    return(

<>
<div className="flex items-center flex-col gap-5 justify-between mb-[44px]">
        <h1 className="noto-sans-semibold text-3xl lg:text-2xl 2xl:text-3xl w-full text-center">Filters</h1>
        <div className="border-y-2 w-full flex items-center justify-center">
      <Button onClick={clearAllFilters} variant={"ghost"} className="text-red-800 text-xl lg:text-lg 2xl:text-xl 2xl:text-[24px] hover:text-red-700 hover:bg-transparent h-fit w-fit">Clear All</Button>
      </div>
      </div>
      <div className="flex justify-center">
      <div className="flex flex-col gap-[48px] w-fit pb-10">
      <div>
      <h2 className="mb-[30px] 2xl:mb-[40px] noto-sans-semibold text-xl lg:text-lg 2xl:text-xl text-center border-b-2 pb-2">Location</h2>
     
        {locations.map(({label, value}, i)=> {
          return(<div key={value} className="flex items-center *:hover:cursor-pointer gap-[12px] 2xl:gap-[16px]">
              <Checkbox checked={selectedLocations.includes(value)}
                onCheckedChange={() => toggleItem(value, selectedLocations, setSelectedLocations)}
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
              <Checkbox checked={selectedTimeCommitments.includes(value)}
                onCheckedChange={() => toggleItem(value, selectedTimeCommitments, setSelectedTimeCommitments)}
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
              <Checkbox checked={selectedAgeRequirements.includes(value)}
                onCheckedChange={() => toggleItem(value, selectedAgeRequirements, setSelectedAgeRequirements)}
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
              <Checkbox checked={selectedDates.includes(value)}
                onCheckedChange={() => toggleItem(value, selectedDates, setSelectedDates)}
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