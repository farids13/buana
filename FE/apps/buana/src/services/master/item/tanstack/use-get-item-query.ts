import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { ItemService } from "../item-service";
import { itemSchema } from "@/src/lib/validation/master/item/item-schema";

export const getItemKey = "getItem";

export const useGetItemQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getItemKey, params],
        queryFn: async () => {
            try {
                const response = await ItemService.getAll(params);
                const parsedData = paginationResponseSchema(itemSchema).parse(response);
                return parsedData;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        }
    });
}
