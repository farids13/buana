import { useQuery } from "@tanstack/react-query";
import { PelangganService } from "../pelanggan-service";

export const getDropdownPelangganKey = "getDropdownPelanggan";

export const useGetDropdownPelangganQuery = () => {
    return useQuery({
        queryKey: [getDropdownPelangganKey],
        queryFn: async () => {
            const response = await PelangganService.getAllActive();
            return response.map((item) => ({
                label: item.cus_name,
                value: item.id
            }));
        }
    });
}
