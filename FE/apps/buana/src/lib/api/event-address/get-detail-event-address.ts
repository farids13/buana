import { httpClient } from "@/lib/http";
import { eventAddressFormSchema } from "@/lib/validations/event-address";
import { useQuery } from "@tanstack/react-query";

export const getDetailEventAddressKey = "getDetailEventAddress";

export const useGetDetailEventAddress = (eventAddressId?: string) => {
  return useQuery({
    queryKey: [getDetailEventAddressKey, eventAddressId],
    queryFn: async () => {
      const res = await httpClient.get(`/event/address/${eventAddressId}`);

      return eventAddressFormSchema.parseAsync(res.data);
    },
    enabled: Boolean(eventAddressId),
  });
};
