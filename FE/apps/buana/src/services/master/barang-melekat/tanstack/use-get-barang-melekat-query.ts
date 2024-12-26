import { useQuery } from "@tanstack/react-query";
import { BarangMelekatService } from "../barang-melekat-service";
import type { PaginatedParams } from "@/src/types/pagination-type";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { listBarangMelekatSchema } from "@/src/lib/validation/master/barang-melekat/list-barang-melekat-schema";

export const getBarangMelekatKey = "getBarangMelekat";

export const useGetBarangMelekatQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getBarangMelekatKey, params],
        queryFn: async () => {
            const response = await BarangMelekatService.getAll(params);
            const parsedData = paginationResponseSchema(listBarangMelekatSchema).parse(response);
            return parsedData;
        }
    });
}
