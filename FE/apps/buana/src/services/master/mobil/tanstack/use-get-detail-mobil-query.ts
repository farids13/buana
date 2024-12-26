import { useQuery } from "@tanstack/react-query";
import { MobilService } from "../mobil-service";
import { upsertMobilSchema } from "@/src/lib/validation/master/mobil/upsert-mobil-schema";

export const getDetailMobilKey = "getDetailMobil";

export const useGetDetailMobilQuery = (id: string) => {
    return useQuery({
        enabled: Boolean(id),
        queryKey: [getDetailMobilKey, id],
        queryFn: async () => {
            const response = await MobilService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const customers = response.customer_car.map((customer) => customer.customer.id);
                const parsedData = upsertMobilSchema.parse({...response, customers});
                return parsedData;
            } catch (error) {
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
