import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDetailEventCategoryKey } from "./get-detail-event-category";
import { getEventCategoryKey } from "./get-event-categories";

export const useDeleteEventCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async (id: string) => {
            await httpClient.delete(`/event/category/${id}`);
        },
        onSuccess : () => {
            void queryClient.invalidateQueries({queryKey: [getEventCategoryKey]})
            void queryClient.invalidateQueries({queryKey: [getDetailEventCategoryKey]})
        }
    })
}