import { httpClient } from "@/lib/http";
import { getDetailEventSummarySchema } from "@/lib/validations/event-summary";
import { useQuery } from "@tanstack/react-query";

export const getEventDetailSummaryKey = "getEventDetailSummary";

export const useGetEventDetailSummary = (eventId?: string) => {
  return useQuery({
    queryKey: [getEventDetailSummaryKey, eventId],
    queryFn: async () => {
      const response = await httpClient.get(`/event/public/${eventId}`);

      return getDetailEventSummarySchema.parseAsync(response.data);
    },
    enabled: Boolean(eventId),
  });
};
