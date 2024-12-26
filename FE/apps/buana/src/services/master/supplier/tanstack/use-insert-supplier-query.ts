import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SupplierService } from "../supplier-service";
import { getSupplierKey } from "./use-get-supplier-query";
import type { UpsertSupplierSchemaForm } from "@/src/lib/validation/master/supplier/upsert-supplier-schema";


export const useInsertSupplierQuery = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: UpsertSupplierSchemaForm) => {
            const resp = await SupplierService.insert(body);
            return resp;
        },
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: [getSupplierKey] });
        },
    })

}