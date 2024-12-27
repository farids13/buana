import { httpClient } from "@/lib/http";
import { updateEventFormSchema } from "@/lib/validations/event";
import { useQuery } from "@tanstack/react-query";

export const getEventDetailKey = "getEventDetail";

export const useGetEventDetail = (eventId?: string) => {
  return useQuery({
    queryKey: [getEventDetailKey, eventId],
    queryFn: async () => {
      const response = await httpClient.get(`/event/${eventId}`);
      return updateEventFormSchema.parseAsync(response.data);
    },
    enabled: Boolean(eventId),
  });
};
