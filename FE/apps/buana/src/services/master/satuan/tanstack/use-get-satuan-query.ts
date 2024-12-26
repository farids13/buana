import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { SatuanService } from "../satuan-service";
import { satuanSchema } from "@/src/lib/validation/master/satuan/satuan-schema";

export const getSatuanKey = "getSatuan";

export const useGetSatuanQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getSatuanKey, params],
        queryFn: async () => {
            const response = await SatuanService.getAll(params);
            const parsedData = paginationResponseSchema(satuanSchema).parse(response);
            return parsedData;
        }
    });
}
