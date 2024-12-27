import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAudienceKey } from "./get-audience";

export const useDeleteAudience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (audienceId: string) => {
      await httpClient.delete(`/audience/${audienceId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getAudienceKey] });
    },
  });
};
