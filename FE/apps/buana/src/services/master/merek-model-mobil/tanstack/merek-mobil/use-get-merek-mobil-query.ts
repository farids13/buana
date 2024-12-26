import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { MerekMobilService } from "../../merek-mobil-service";
import { merekMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/merek-mobil/merek-mobil-schema";

export const getMerekMobilKey = "getMerekMobil";

export const useGetMerekMobilQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getMerekMobilKey, params],
        queryFn: async () => {
            const response = await MerekMobilService.getAll(params);
            const parsedData = paginationResponseSchema(merekMobilSchema).parse(response);
            return parsedData;
        }
    });
}
