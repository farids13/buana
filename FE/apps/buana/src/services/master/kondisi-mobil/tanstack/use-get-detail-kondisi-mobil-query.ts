import { useQuery } from "@tanstack/react-query";
import { upsertKondisiMobilSchema } from "@/src/lib/validation/master/kondisi-mobil/upsert-kondisi-mobil-schema";
import { KondisiMobilService } from "../kondisi-mobil-service";

export const getDetailKondisiMobilKey = "getDetailKondisiMobil";

export const useGetDetailKondisiMobilQuery = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [getDetailKondisiMobilKey, id],
        queryFn: async () => {
            const response = await KondisiMobilService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertKondisiMobilSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
