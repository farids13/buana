import { useQuery } from "@tanstack/react-query";
import { OrderBarangSevice } from "../../order-barang-service";
import { upsertOrderBarangSchema } from "@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema";

export const getDetailOrderBarangKey = "getDetailOrderBarang";

export const useGetDetailOrderBarangQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailOrderBarangKey, id],
        queryFn: async () => {
            const response = await OrderBarangSevice.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertOrderBarangSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
