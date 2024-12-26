import { useQuery } from "@tanstack/react-query";
import { SatuanService } from "../satuan-service";

export const getAllActiveSatuanKey = "getAllActiveSatuan";

export const useGetAllActiveSatuanQuery = () => {
    return useQuery({
        queryKey: [getAllActiveSatuanKey],
        queryFn: async () => {
            const response = await SatuanService.getAllActive();
            return response.map(item => ({
                label: item.u_name,
                value: item.id
            }));
        }
    });
};