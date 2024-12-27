import { httpClient } from "@/lib/http";
import { memberSchema } from "@/lib/validations/member";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getMemberKey = "getMember";

export const useGetMembers = (params?: PaginatedParams) => {
  return useQuery({
    queryKey: [getMemberKey, params],
    queryFn: async () => {
      try {
        const res = await httpClient.get("/members", {
          params,
        });
        console.log("Response dari API:", res.data);
        
        const parsed = createPaginatedResponseSchema(memberSchema).parse(res.data);
        console.log("Data setelah parsing:", parsed);
        
        return parsed;
      } catch (error) {
        console.error("Error dalam useGetMembers:", error);
        throw error;
      }
    },
  });
};
