import { httpClient } from "..";

type DebouncedParams = {
    locations: string[];
    timeCommitments: string[];
    ageRequirements: string[];
    Dates: string[];
    search: string | null;
    sort: string;
}

export const getItems = async (urlParams: DebouncedParams) => {

  const response = await httpClient.get("/api/Data", {
    params: urlParams,
  });

  return response.data;
};

export const getUrlParams = (searchParams: URLSearchParams) => {
  return {
    locations: searchParams.getAll("location") ?? [],
    timeCommitments: searchParams.getAll("timeCommitment") ?? [],
    ageRequirements: searchParams.getAll("ageRequirement") ?? [],
    Dates: searchParams.getAll("date") ?? [],
    search: searchParams.get("search") ?? null,
    sort: searchParams.get("sortBy") ?? "Newest"
  };
};



export const getItemsForCarusels = async () => {
  const urlParams = {  sort: "Newest" }

  const response = await httpClient.get("/api/Data", {
    params: urlParams,
  });

  return response.data.slice(0,3);
};


export const getSingleItem = async (id:string | undefined) => {
    if(id == undefined){
        throw new Error("id is undefined")
    }

        const response = await httpClient.get(`/api/Data/${id}`);
        return response.data;
}
