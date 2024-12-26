import { useQuery } from "@tanstack/react-query";
import { ItemService } from "../item-service";
import { upsertItemSchema } from "@/src/lib/validation/master/item/upsert-item-schema";

export const getDetailItemKey = "getDetailItem";

export const useGetDetailItemQuery = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [getDetailItemKey, id],
        queryFn: async () => {
            const response = await ItemService.getById(id);
            if (!response) {
                throw new Error('Data tidak ditemukan');
            }
            try {
                const parsedData = upsertItemSchema.parse(response);
                return parsedData;
            } catch (error) {
                console.error('Error from getDetailItemQuery:', error);
                // throw new Error('Format data tidak sesuai');
            }
        }
    });
}
