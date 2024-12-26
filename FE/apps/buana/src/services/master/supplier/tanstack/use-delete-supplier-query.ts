
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierService } from "../supplier-service";
import { getSupplierKey } from "./use-get-supplier-query";

export const useDeleteSupplierQuery = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id :string) => SupplierService.delete(id),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: [getSupplierKey]})
        }
    })
}