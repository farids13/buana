import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SatuanService } from "../satuan-service";
import { getSatuanKey } from "./use-get-satuan-query";
import { UpsertSatuanSchemaForm } from "@/src/lib/validation/master/satuan/upsert-satuan-schema";


export const useInsertSatuanQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertSatuanSchemaForm) => {
            const resp = await SatuanService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getSatuanKey] });
        },
    })

}