import { httpClient } from "@/lib/http";
import { eventSchema } from "@/lib/validations/event";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventKey = "getEvent";

export const useGetEvent = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getEventKey, params],
    queryFn: async () => {
      const response = await httpClient.get("/event", {
        params,
      });

      return createPaginatedResponseSchema(eventSchema).parse(response.data);
    },
  });
};
