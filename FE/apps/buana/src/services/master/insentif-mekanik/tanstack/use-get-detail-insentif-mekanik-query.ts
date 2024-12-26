import { useQuery } from "@tanstack/react-query";
import { upsertInsentifMekanikSchema } from "@/src/lib/validation/master/insentif-mekanik/upsert-insentif-mekanik-schema";
import { InsentifMekanikService } from "../insentif-mekanik-service";

export const getDetailInsentifMekanikKey = "getDetailInsentifMekanik";

export const useGetDetailInsentifMekanikQuery = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [getDetailInsentifMekanikKey, id],
        queryFn: async () => {
            const response = await InsentifMekanikService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertInsentifMekanikSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
