import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MobilService } from "../mobil-service";
import { getMobilKey } from "./use-get-mobil-query";

export const useDeleteMobilQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => MobilService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getMobilKey] });
        }
    });
};