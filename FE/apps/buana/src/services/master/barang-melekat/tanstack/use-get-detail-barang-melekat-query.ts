import { useQuery } from "@tanstack/react-query";
import { BarangMelekatService } from "../barang-melekat-service";
import { upsertBarangMelekatSchema } from "@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema";

export const getDetailBarangMelekatKey = "getDetailBarangMelekat";

export const useGetDetailBarangMelekatQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailBarangMelekatKey, id],
        queryFn: async () => {
            const response = await BarangMelekatService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertBarangMelekatSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
