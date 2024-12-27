import { httpClient } from "@/lib/http";
import { audienceGroupFormSchema } from "@/lib/validations/audience";
import { useQueries } from "@tanstack/react-query";
import { getAudienceKey } from "./get-audience";

export const getAudienceDetailKey = "getAudienceDetail";

export const useGetAudienceDetail = (audienceId?: string | string[]) => {
  const audienceIds = Array.isArray(audienceId) ? audienceId : [audienceId];
  return useQueries({
    queries: audienceId
      ? audienceIds.map((id) => ({
          queryKey: [getAudienceKey, id],
          queryFn: async () => {
            const response = await httpClient.get(`/audience/${id}`);

            return audienceGroupFormSchema.parseAsync(response.data);
          },
        }))
      : [],
  });
};
