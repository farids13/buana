
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsentifMekanikService } from "../insentif-mekanik-service";
import { getInsentifMekanikKey } from "./use-get-insentif-mekanik-query";

export const useDeleteInsentifMekanikQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => InsentifMekanikService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getInsentifMekanikKey]})
        }
    })
}