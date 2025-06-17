import { httpClient } from "..";

export const fetchItems = async (searchParams: URLSearchParams) => {
  const urlParams = getUrlParams(searchParams);

  const response = await httpClient.get("/api/Data", {
    params: urlParams,
  });

  return response.data;
};

const getUrlParams = (searchParams: URLSearchParams) => {
  return {
    locations: searchParams.getAll("location") ?? [],
    timeCommitments: searchParams.getAll("timeCommitment") ?? [],
    ageRequirements: searchParams.getAll("ageRequirement") ?? [],
    Dates: searchParams.getAll("date") ?? [],
    search: searchParams.get("search") ?? null,
    sort: searchParams.get("sort") ?? "Newest"
  };
};



export const fetchSingleItem = async (id:string | undefined) => {
    if(id == undefined){
        throw new Error("id is undefined")
    }

        const response = await httpClient.get(`/api/Data/${id}`);
        return response.data;
}
