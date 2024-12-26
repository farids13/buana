import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PelangganService } from "../pelanggan-service";
import { getPelangganKey } from "./use-get-pelanggan-query";
import { UpsertPelangganSchema } from "@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema";


export const useUpdatePelangganQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertPelangganSchema) => {
            const resp = await PelangganService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getPelangganKey] });
        },
    })

}