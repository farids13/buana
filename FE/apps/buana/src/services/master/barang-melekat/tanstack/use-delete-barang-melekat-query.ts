import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BarangMelekatService } from "../barang-melekat-service";
import { getBarangMelekatKey } from "./use-get-barang-melekat-query";

export const useDeleteBarangMelekatQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => BarangMelekatService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getBarangMelekatKey]})
        }
    })
}