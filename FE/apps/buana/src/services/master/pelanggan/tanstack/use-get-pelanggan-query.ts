import { useQuery } from "@tanstack/react-query";
import { PelangganService } from "../pelanggan-service";
import type { PaginatedParams } from "@/src/types/pagination-type";
import {  paginationResponseSchema } from "@/src/lib/validation/pagination/pagination-response-schema";
import { pelangganSchema } from "@/src/lib/validation/master/pelanggan/pelanggan-schema";

export const getPelangganKey = "getPelanggan";

export const useGetPelangganQuery = (params?: PaginatedParams) => {
    return useQuery({
        queryKey: [getPelangganKey, params],
        queryFn: async () => {
            const response = await PelangganService.getAll(params);
            try {
                const parsedData = paginationResponseSchema(pelangganSchema).parse(response);
                return parsedData;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    });
}
