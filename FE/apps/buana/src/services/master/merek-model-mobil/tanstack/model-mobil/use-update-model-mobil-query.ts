import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ModelMobilService } from "../../model-mobil-service";
import { UpsertModelMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";
import { getModelByMerekMobilIdKey } from "./use-get-model-by-merek-mobil-query";
    

export const useUpdateModelMobilQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertModelMobilSchema) => {
            const resp = await ModelMobilService.update(body);
            return resp;
        },
        onSuccess: () => {
            // void queryClient.invalidateQueries({ queryKey: [getModelMobilKey] });
            void queryClient.invalidateQueries({ queryKey: [getModelByMerekMobilIdKey] });
        },
    })

}