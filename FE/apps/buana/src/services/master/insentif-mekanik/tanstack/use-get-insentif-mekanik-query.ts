import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { InsentifMekanikService } from "../insentif-mekanik-service";
import { insentifMekanikSchema } from "@/src/lib/validation/master/insentif-mekanik/insentif-mekanik-schema";

export const getInsentifMekanikKey = "getInsentifMekanik";

export const useGetInsentifMekanikQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getInsentifMekanikKey, params],
        queryFn: async () => {
            const response = await InsentifMekanikService.getAll(params);
            const parsedData = paginationResponseSchema(insentifMekanikSchema).parse(response);
            return parsedData;
        }
    });
}
