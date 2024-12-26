import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MerekMobilService } from "../../merek-mobil-service";
import { UpsertMerekMobilSchema } from "@/src/lib/validation/master/merek-model-mobil/merek-mobil/upsert-merek-mobil-schema";
import { getMerekMobilKey } from "./use-get-merek-mobil-query";


export const useUpdateMerekMobilQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertMerekMobilSchema) => {
            const resp = await MerekMobilService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getMerekMobilKey] });
        },
    })

}