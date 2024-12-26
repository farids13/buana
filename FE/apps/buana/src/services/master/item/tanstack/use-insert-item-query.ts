import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getItemKey } from "./use-get-item-query";
import { ItemService } from "../item-service";
import { UpsertItemSchema } from "@/src/lib/validation/master/item/upsert-item-schema";


export const useInsertItemQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertItemSchema) => {
            const resp = await ItemService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getItemKey] });
        },
    })

}