
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MerekMobilService } from "../../merek-mobil-service";
import { getMerekMobilKey } from "./use-get-merek-mobil-query";

export const useDeleteMerekMobilQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => MerekMobilService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getMerekMobilKey]})
        }
    })
}