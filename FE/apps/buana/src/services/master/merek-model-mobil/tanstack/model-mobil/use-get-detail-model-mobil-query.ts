import { useQuery } from "@tanstack/react-query";
import { ModelMobilService } from "../../model-mobil-service";
import { upsertModelMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";

export const getDetailModelMobilKey = "getDetailModelMobil";

export const useGetDetailModelMobilQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailModelMobilKey, id],
        queryFn: async () => {
            const response = await ModelMobilService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertModelMobilSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
