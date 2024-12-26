import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SatuanService } from "../satuan-service";
import { getSatuanKey } from "./use-get-satuan-query";
import { UpsertSatuanSchema} from "@/src/lib/validation/master/satuan/upsert-satuan-schema";


export const useUpdateSatuanQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertSatuanSchema) => {
            const resp = await SatuanService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getSatuanKey] });
        },
    })

}