import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { KondisiMobilService } from "../kondisi-mobil-service";
import { kondisiMobilSchema } from "@/src/lib/validation/master/kondisi-mobil/kondisi-mobil-schema";

export const getKondisiMobilKey = "getKondisiMobil";

export const useGetKondisiMobilQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getKondisiMobilKey, params],
        queryFn: async () => {
            const response = await KondisiMobilService.getAll(params);
            const parsedData = paginationResponseSchema(kondisiMobilSchema).parse(response);
            return parsedData;
        }
    });
}
