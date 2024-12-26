import { useMutation, useQueryClient } from "@tanstack/react-query"
import { KondisiMobilService } from "../kondisi-mobil-service";
import { getKondisiMobilKey } from "./use-get-kondisi-mobil-query";
import { UpsertKondisiMobilSchemaForm } from "@/src/lib/validation/master/kondisi-mobil/upsert-kondisi-mobil-schema";


export const useInsertKondisiMobilQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertKondisiMobilSchemaForm) => {
            const resp = await KondisiMobilService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getKondisiMobilKey] });
        },
    })

}