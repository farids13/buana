import { useQuery } from "@tanstack/react-query";
import { upsertSatuanSchema } from "@/src/lib/validation/master/satuan/upsert-satuan-schema";
import { SatuanService } from "../satuan-service";

export const getDetailSatuanKey = "getDetailSatuan";

export const useGetDetailSatuanQuery = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [getDetailSatuanKey, id],
        queryFn: async () => {
            const response = await SatuanService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertSatuanSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
