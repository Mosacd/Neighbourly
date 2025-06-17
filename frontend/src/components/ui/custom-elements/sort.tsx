import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTriggerForSort, SelectValue } from "../select";
import { useState } from "react";


const Sort = () => {
          const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<string>(searchParams.get("sortBy") || "Newest");

const handleSort = (value: string) => {
 setSort(value);
  setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev.toString());
      newParams.set("sortBy", value);
    return newParams
})
};



    return(
          <Select value={sort} onValueChange={handleSort} defaultValue="Newest">  
            <SelectTriggerForSort className="w-full min-w-[110px] lg:min-w-[130px] max-w-[120px] px-0 2xl:max-w-[240px] data-[size=default]:h-[53px] text-md sm:text-lg 2xl:text-xl border-none noto-sans-semibold">
              <SelectValue>Sort By</SelectValue>
            </SelectTriggerForSort> 
            <SelectContent  position="popper"
                sideOffset={5}
                align="center" className="min-w-[116px] max-xs:max-w-[120px] ">
              <SelectItem value="Newest">Newest</SelectItem>
              <SelectItem value="Oldest">Oldest</SelectItem>
              <SelectItem  value="Z-A"><span className="max-xs:hidden">Alphabetically, </span>Z-A</SelectItem>
              <SelectItem value="A-Z"><span className="max-xs:hidden">Alphabetically, </span>A-Z</SelectItem>
            </SelectContent>
          </Select>
    )

}


export default Sort;