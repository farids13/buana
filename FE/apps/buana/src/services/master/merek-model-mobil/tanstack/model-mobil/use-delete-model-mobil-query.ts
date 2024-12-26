
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModelMobilService } from "../../model-mobil-service";
import { getModelByMerekMobilIdKey } from "./use-get-model-by-merek-mobil-query";

export const useDeleteModelMobilQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => ModelMobilService.delete(id),
        onSuccess: () => {
            // void queryClient.invalidateQueries({queryKey: [getModelMobilKey]})
            void queryClient.invalidateQueries({ queryKey: [getModelByMerekMobilIdKey] });
        }
    })
}