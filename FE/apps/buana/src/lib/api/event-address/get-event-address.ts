import { httpClient } from "@/lib/http";
import { eventAddressSchema } from "@/lib/validations/event-address";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getEventAddressKey = "getEventAddress";

export const useGetEventAddress = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getEventAddressKey, params],
    queryFn: async () => {
      const res = await httpClient.get("/event/address", {
        params,
      });
      return createPaginatedResponseSchema(eventAddressSchema).parse(res.data);
    },
  });
};
