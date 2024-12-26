import { PaginatedParams } from "@/src/types/pagination-type";
import { useQuery } from "@tanstack/react-query";
import { ModelMobilService } from "../../model-mobil-service";

export const getDropdownModelMobilKey = "getDropdownModelMobil";

export const useGetDropdownModelMobilQuery = (merekId: string) => {
    return useQuery({
        enabled: Boolean(merekId),
        queryKey: [getDropdownModelMobilKey, merekId],
        queryFn: async () => {
            const response = await ModelMobilService.getAllActiveByMerekId(merekId);
            return response.map((item) => ({
                label: item.cm_name,
                value: item.id
            }));
        }
    });
}
