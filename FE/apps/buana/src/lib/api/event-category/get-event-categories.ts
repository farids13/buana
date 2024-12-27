import { httpClient } from "@/lib/http";
import { eventCategorySchema } from "@/lib/validations/event-category";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryKey = "getEventCategoryKey";

export const useGetEventCategory = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getEventCategoryKey, params],
    queryFn: async () => {
      const res = await httpClient.get("/event/category", {
        params,
      });
      return createPaginatedResponseSchema(eventCategorySchema).parse(res.data);
    },
  });
};
