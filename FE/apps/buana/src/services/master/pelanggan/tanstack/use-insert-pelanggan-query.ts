
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PelangganService } from "../pelanggan-service";
import { UpsertPelangganSchema } from "@/src/lib/validation/master/pelanggan/upsert-pelanggan-schema";
import { getPelangganKey } from "./use-get-pelanggan-query";


export const useInsertPelangganQuery = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertPelangganSchema) => {
            const resp = await PelangganService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getPelangganKey] });
        },
    })

}