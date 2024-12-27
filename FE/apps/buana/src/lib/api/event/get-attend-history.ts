import { httpClient } from "@/lib/http";
import { attendHistorySchema } from "@/lib/validations/event";
import { createPaginatedResponseSchema } from "@/lib/validations/pagination";
import type { PaginatedParams } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

export const getAttendHistoryKey = "getAttendHistory";

export const useGetAttendHistory = (
  eventId: string,
  params?: PaginatedParams & { date?: string },
) => {
  return useQuery({
    queryKey: [getAttendHistoryKey, eventId, params],
    queryFn: async () => {
      const response = await httpClient.get(
        `/event/attend/history/${eventId}`,
        {
          params,
        },
      );

      return createPaginatedResponseSchema(attendHistorySchema).parse(
        response.data,
      );
    },
  });
};
