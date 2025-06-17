import { httpClient } from "..";

export const fetchItems = async (searchParams: URLSearchParams) => {
  const filters = getFilters(searchParams);

  const response = await httpClient.get("/api/Data", {
    params: filters,
  });

  return response.data;
};

const getFilters = (searchParams: URLSearchParams) => {
  return {
    locations: searchParams.getAll("location") ?? [],
    timeCommitments: searchParams.getAll("timeCommitment") ?? [],
    ageRequirements: searchParams.getAll("ageRequirement") ?? [],
    Dates: searchParams.getAll("date") ?? [],
  };
};



export const fetchSingleItem = async (id:string | undefined) => {
    if(id == undefined){
        throw new Error("id is undefined")
    }

        const response = await httpClient.get(`/api/Data/${id}`);
        return response.data;
}
