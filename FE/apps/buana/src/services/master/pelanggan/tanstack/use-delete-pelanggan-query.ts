import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PelangganService } from "../pelanggan-service";
import { getPelangganKey } from "./use-get-pelanggan-query";

export const useDeletePelangganQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => PelangganService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getPelangganKey] });
        }
    });
};