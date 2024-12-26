import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SupplierService } from "../supplier-service";
import { getSupplierKey } from "./use-get-supplier-query";
import type { UpsertSupplierSchema} from "@/src/lib/validation/master/supplier/upsert-supplier-schema";


export const useUpdateSupplierQuery = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body: UpsertSupplierSchema) => {
            const resp = await SupplierService.update(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getSupplierKey] });
        },
    })

}