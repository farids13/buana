
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemKey } from "./use-get-item-query";
import { ItemService } from "../item-service";

export const useDeleteItemQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => ItemService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getItemKey]})
        }
    })
}