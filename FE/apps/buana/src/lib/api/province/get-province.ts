import { httpClient } from "@/lib/http";
import { provinceSchema } from "@/lib/validations/province";
import { useQuery } from "@tanstack/react-query";

export const getProvinceKey = "getProvince";

export const useGetProvince = () => {
  return useQuery({
    queryKey: [getProvinceKey],
    queryFn: async () => {
      const response = await httpClient.get("/province");

      return provinceSchema.array().parse(response.data);
    },
  });
};
