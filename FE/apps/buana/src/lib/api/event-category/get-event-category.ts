import { httpClient } from "@/lib/http";
import { eventCategoryDropdownSchema } from "@/lib/validations/event-category";
import { useQuery } from "@tanstack/react-query";

export const getEventCategoryDropdownKey = "getEventCategoryDropdown";

export const useGetEventCategoryDropdown = () => {
  return useQuery({
    queryKey: [getEventCategoryDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/event/category/dropdown");

      return eventCategoryDropdownSchema.array().parse(response.data);
    },
  });
};
