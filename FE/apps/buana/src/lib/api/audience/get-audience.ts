import { httpClient } from "@/lib/http";
import { audienceGroupSchema } from "@/lib/validations/audience";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getAudienceKey = "getAudience";

export const useGetAudience = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getAudienceKey, params],
    queryFn: async () => {
      const response = await httpClient.get("/audience", {
        params,
      });

      return createPaginatedResponseSchema(audienceGroupSchema).parse(
        response.data
      );
    },
  });
};
