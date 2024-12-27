import { httpClient } from "@/lib/http";
import { graphSchema } from "@/lib/validations/graph";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryGraph = "getEventCategoryGraph";

export const useGetEventCategoryGraph = () => {
  return useQuery({
    queryKey: [getEventCategoryGraph],
    queryFn: async () => {
      const res = await httpClient.get("/event/category/dashboard/graph");

      return graphSchema.parse(res.data);
    },
  });
};
