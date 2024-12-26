import { useQuery } from "@tanstack/react-query";
import { upsertMerekMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/merek-mobil/upsert-merek-mobil-schema";
import { MerekMobilService } from "../../merek-mobil-service";

export const getDetailMerekMobilKey = "getDetailMerekMobil";

export const useGetDetailMerekMobilQuery = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [getDetailMerekMobilKey, id],
        queryFn: async () => {
            const response = await MerekMobilService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertMerekMobilSchema.parse(response);
                return parsedData;
            } catch (error) {
                throw new Error('Format data tidak sesuai');
            }
        }
    });
}
