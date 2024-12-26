import { useQuery } from "@tanstack/react-query";
import { MobilService } from "../mobil-service";
import type { PaginatedParams } from "@/src/types/pagination-type";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { mobilSchema } from "@/src/lib/validation/master/mobil/mobil-schema";

export const getMobilKey = "getMobil";

export const useGetMobilQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getMobilKey, params],
        queryFn: async () => {
            const response = await MobilService.getAll(params);
            const parsedData = paginationResponseSchema(mobilSchema).parse(response);
            return parsedData;
        }
    });
}
