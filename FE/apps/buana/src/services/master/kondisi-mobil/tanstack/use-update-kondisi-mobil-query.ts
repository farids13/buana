import { useMutation, useQueryClient } from "@tanstack/react-query"
import { KondisiMobilService } from "../kondisi-mobil-service";
import { getKondisiMobilKey } from "./use-get-kondisi-mobil-query";
import { UpsertKondisiMobilSchema} from "@/src/lib/validation/master/kondisi-mobil/upsert-kondisi-mobil-schema";


export const useUpdateKondisiMobilQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertKondisiMobilSchema) => {
            const resp = await KondisiMobilService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getKondisiMobilKey] });
        },
    })

}