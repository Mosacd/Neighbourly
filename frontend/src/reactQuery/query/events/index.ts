import type { VolunteerOpportunity } from "@/dummyData";
import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getItems, getItemsForCarusels, getSingleItem, getUrlParams } from "@/API/requests"
import { useEffect, useState } from "react";
import debounce from 'lodash.debounce';




export const useGetEvents = <T = VolunteerOpportunity[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<VolunteerOpportunity[], Error, T>, "queryKey">;
    } = {},
 
  ): UseQueryResult<T, Error> => {

    const [searchParams] = useSearchParams();

      const [debouncedValues, setDebouncedValues] = useState(() => getUrlParams(searchParams));

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValues(getUrlParams(searchParams));
    }, 500); // 500ms debounce

    handler();

    return () => handler.cancel();
  }, [searchParams.toString()]);



    return useQuery<VolunteerOpportunity[], Error, T>({
      queryKey: ["events", debouncedValues],
      queryFn: () => getItems(debouncedValues),
      enabled: !!debouncedValues, // optional safety
       refetchOnWindowFocus: false,
      ...queryOptions,
    });
  };


   export const useGetEventsForCarousels = <T = VolunteerOpportunity[]>(
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<VolunteerOpportunity[], Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {

    return useQuery<VolunteerOpportunity[], Error, T>({
      queryKey: ["eventsForCarousels"],
      queryFn: getItemsForCarusels,
      ...queryOptions,
    });
  };


    export const useGetSingleEvent = <T = VolunteerOpportunity>(
    id: string,
    {
      queryOptions,
    }: {
      queryOptions?: Omit<UseQueryOptions<VolunteerOpportunity, Error, T>, "queryKey">;
    } = {},
  ): UseQueryResult<T, Error> => {

    
    return useQuery<VolunteerOpportunity, Error, T>({
      queryKey: ["singleProduct", id],
      queryFn: () => getSingleItem(id),
      ...queryOptions,
      enabled: !!id
    });
  };

  