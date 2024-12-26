
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { OrderBarangSevice } from "../../order-barang-service";
import { getOrderBarangKey } from "./use-get-order-barang-query";
import type { UpsertOrderBarangSchema } from "@/src/lib/validation/gudang/order-barang/upsert-order-barang-schema";


export const useInsertOrderBarangQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertOrderBarangSchema) => {
            const resp = await OrderBarangSevice.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getOrderBarangKey] });
        },
    })

}