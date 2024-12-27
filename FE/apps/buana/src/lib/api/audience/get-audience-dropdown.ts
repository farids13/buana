import { httpClient } from "@/lib/http";
import { audienceDropdownSchema } from "@/lib/validations/audience";
import { useQuery } from "@tanstack/react-query";

export const getAudienceDropdownKey = "getAudienceDropdown";

export const useGetAudienceDropdown = () => {
  return useQuery({
    queryKey: [getAudienceDropdownKey],
    queryFn: async () => {
      const response = await httpClient.get("/audience/dropdown");

      return audienceDropdownSchema.array().parse(response.data);
    },
  });
};
