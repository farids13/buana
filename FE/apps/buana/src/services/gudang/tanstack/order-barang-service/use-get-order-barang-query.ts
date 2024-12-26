import { useQuery } from "@tanstack/react-query";
import { OrderBarangSevice } from "../../order-barang-service";
import type { PaginatedParams } from "@/src/types/pagination-type";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { listItemOrderBarangSchema, listItemOrderBarangSchemaForm } from "@/src/lib/validation/gudang/order-barang/list-item-order-barang-schema";

export const getOrderBarangKey = "getOrderBarang";

export const useGetOrderBarangQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getOrderBarangKey, params],
        queryFn: async () => {
            const response = await OrderBarangSevice.getAll(params);
            const parsedData = paginationResponseSchema(listItemOrderBarangSchema).parse(response);
            return parsedData;
        }
    });
}
