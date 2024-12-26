
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BarangMelekatService } from "../barang-melekat-service";
import { getBarangMelekatKey } from "./use-get-barang-melekat-query";
import type { UpsertBarangMelekatSchema } from "@/src/lib/validation/master/barang-melekat/upsert-barang-melekat-schema";


export const useInsertBarangMelekatQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertBarangMelekatSchema) => {
            const resp = await BarangMelekatService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getBarangMelekatKey] });
        },
    })

}