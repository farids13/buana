
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MobilService } from "../mobil-service";
import { getMobilKey } from "./use-get-mobil-query";
import type { UpsertMobilSchema } from "@/src/lib/validation/master/mobil/upsert-mobil-schema";


export const useInsertMobilQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertMobilSchema) => {
            const resp = await MobilService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getMobilKey] });
        },
    })

}