import { useQuery } from "@tanstack/react-query";
import { SupplierService } from "../supplier-service";
import { upsertSupplierSchema } from "@/src/lib/validation/master/supplier/upsert-supplier-schema";

export const getDetailSupplierKey = "getDetailSupplier";

export const useGetDetailSupplierQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailSupplierKey, id],
        queryFn: async () => {
            const response = await SupplierService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertSupplierSchema.parse(response);
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
