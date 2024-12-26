import { UpsertInsentifMekanikSchemaForm } from "@/src/lib/validation/master/insentif-mekanik/upsert-insentif-mekanik-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InsentifMekanikService } from "../insentif-mekanik-service";
import { getInsentifMekanikKey } from "./use-get-insentif-mekanik-query";


export const useUpdateInsentifMekanikQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertInsentifMekanikSchemaForm) => {
            const resp = await InsentifMekanikService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getInsentifMekanikKey] });
        },
    })

}