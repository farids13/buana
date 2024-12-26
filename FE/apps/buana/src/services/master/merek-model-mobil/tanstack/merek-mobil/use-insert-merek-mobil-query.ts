import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MerekMobilService } from "../../merek-mobil-service";
import { getMerekMobilKey } from "./use-get-merek-mobil-query";
import { UpsertMerekMobilSchemaForm } from "@/src/lib/validation/master/merek-model-mobil/merek-mobil/upsert-merek-mobil-schema";


export const useInsertMerekMobilQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertMerekMobilSchemaForm) => {
            const resp = await MerekMobilService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getMerekMobilKey] });
        },
    })

}