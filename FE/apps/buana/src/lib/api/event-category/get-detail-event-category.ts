import { httpClient } from "@/lib/http";
import { eventCategorySchema } from "@/lib/validations/event-category";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const getDetailEventCategoryKey = "getDetailEventCategory";

export const useGetDetailEventCategory = (id? : string) => {
    const queryClient = useQueryClient();
    
    return useQuery({
        queryKey : [getDetailEventCategoryKey, id],
        queryFn : async () => {
            const res = await httpClient.get(`/event/category/${id}`);
            return eventCategorySchema.parse(res.data);
        },
        enabled : Boolean(id),
        staleTime : Infinity,
    })
}