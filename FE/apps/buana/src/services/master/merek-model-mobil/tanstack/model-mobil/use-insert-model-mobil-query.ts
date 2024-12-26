import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ModelMobilService } from "../../model-mobil-service";
import { getModelMobilKey } from "./use-get-model-mobil-query";
import { UpsertModelMobilSchemaForm } from "@/src/lib/validation/master/merek-model-mobil/model-mobil/upsert-model-mobil-schema";
import { getModelByMerekMobilIdKey } from "./use-get-model-by-merek-mobil-query";


export const useInsertModelMobilQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertModelMobilSchemaForm) => {
            const resp = await ModelMobilService.insert(body);
            return resp;
        },
        onSuccess: () => {
            // void queryClient.invalidateQueries({ queryKey: [getModelMobilKey] });
            void queryClient.invalidateQueries({ queryKey: [getModelByMerekMobilIdKey] });
        },
    })

}