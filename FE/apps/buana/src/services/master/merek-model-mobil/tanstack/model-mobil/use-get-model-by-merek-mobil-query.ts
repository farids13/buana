import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { modelMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/model-mobil-schema";
import { ModelMobilService } from "../../model-mobil-service";

export const getModelByMerekMobilIdKey = "getModelByMerekMobilId";

export const useGetModelByMerekMobilIdQuery = (merekMobilId: string, params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getModelByMerekMobilIdKey, merekMobilId, params],
        queryFn: async () => {
            const response = await ModelMobilService.getAllByMerekMobilId(merekMobilId, params);
            const parsedData = paginationResponseSchema(modelMobilSchema).parse(response);
            return parsedData;
        }
    });
}
