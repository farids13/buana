import { httpClient } from "@/lib/http";
import { useQuery } from "@tanstack/react-query";
import { eventAddressSchema } from "@/lib/validations/event-address";

export const getEventAddressDropdownKey = "getEventAddressDropdown";

export const useGetEventAddressDropdown = () => {
  return useQuery({
    queryKey: [getEventAddressDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/event/address/dropdown");

      return eventAddressSchema.array().parse(response.data);
    },
  });
};
