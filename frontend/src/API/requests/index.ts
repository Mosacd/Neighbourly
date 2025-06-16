import { httpClient } from "..";

export const fetchItems = async () => {
    const response = await httpClient.get("/api/Data");
    return response.data;
};


export const fetchSingleItem = async (id:string | undefined) => {
    if(id == undefined){
        throw new Error("id is undefined")
    }

        const response = await httpClient.get(`/api/Data/${id}`);
        return response.data;
}
