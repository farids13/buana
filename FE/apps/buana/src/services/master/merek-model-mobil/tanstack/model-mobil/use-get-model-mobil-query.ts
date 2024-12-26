import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { modelMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/model-mobil-schema";
import { ModelMobilService } from "../../model-mobil-service";

export const getModelMobilKey = "getModelMobil";

export const useGetModelMobilQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getModelMobilKey, params],
        queryFn: async () => {
            const response = await ModelMobilService.getAll(params);
            const parsedData = paginationResponseSchema(modelMobilSchema).parse(response);
            return parsedData;
        }
    });
}
