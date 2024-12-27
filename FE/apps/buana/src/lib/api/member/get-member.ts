import { httpClient } from "@/lib/http";
import { memberSchema } from "@/lib/validations/member";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getMemberKey = "getMember";

export const useGetEventAddress = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getMemberKey, params],
    queryFn: async () => {
      const res = await httpClient.get("/members", {
        params,
      });
      return createPaginatedResponseSchema(memberSchema).parse(res.data);
    },
  });
};
