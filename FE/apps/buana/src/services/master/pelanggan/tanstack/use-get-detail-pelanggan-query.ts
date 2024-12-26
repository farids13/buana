import { useQuery } from "@tanstack/react-query";
import { PelangganService } from "../pelanggan-service";
import { upsertPelangganSchema } from "@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema";

export const getDetailPelangganKey = "getDetailPelanggan";

export const useGetDetailPelangganQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailPelangganKey, id],
        queryFn: async () => {
            const response = await PelangganService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertPelangganSchema.parse(response);
                return parsedData;
            } catch (error) {
                console.error(error);
                throw new Error('Format data tidak sesuai');
            }
        }
    });
}
