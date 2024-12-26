import { useQuery } from "@tanstack/react-query";
import { SupplierService } from "../supplier-service";
import type { PaginatedParams } from "@/src/types/pagination-type";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { supplierSchema } from "@/src/lib/validation/master/supplier/supplier-schema";

export const getSupplierKey = "getSupplier";

export const useGetSupplierQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getSupplierKey, params],
        queryFn: async () => {
            const response = await SupplierService.getAll(params);
            const parsedData = paginationResponseSchema(supplierSchema).parse(response);
            return parsedData;
        }
    });
}
