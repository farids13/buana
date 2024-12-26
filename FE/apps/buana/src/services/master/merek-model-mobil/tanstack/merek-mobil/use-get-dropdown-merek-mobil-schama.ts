import { useQuery } from "@tanstack/react-query";
import { MerekMobilService } from "../../merek-mobil-service";

export const getDropdownMerekMobilKey = "getDropdownMerekMobil";

export const useGetDropdownMerekMobilQuery = () => {
    return useQuery({
        queryKey: [getDropdownMerekMobilKey],
        queryFn: async () => {
            const response = await MerekMobilService.getAllActive();
            return response.map((item) => ({
                label: item.cb_name,
                value: item.id
            }));
        }
    });
}
