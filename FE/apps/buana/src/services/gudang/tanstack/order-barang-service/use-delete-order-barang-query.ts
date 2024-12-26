import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderBarangSevice } from "../../order-barang-service";
import { getOrderBarangKey } from "./use-get-order-barang-query";

export const useDeleteOrderBarangQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => OrderBarangSevice.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getOrderBarangKey]})
        }
    })
}