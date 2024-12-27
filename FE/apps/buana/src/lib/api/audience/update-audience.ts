import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { AudienceFormValues } from "@/lib/validations/audience";
import { getAudienceKey } from "./get-audience";
import { getAudienceDetailKey } from "./get-audience-detail";

type UpdateAudienceParams = AudienceFormValues & { id: string };

export const useUpdateAudience = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: UpdateAudienceParams) => {
      await httpClient.put(`/audience/${data.id}`, data);
    },
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [getAudienceKey] });
      void queryClient.invalidateQueries({
        queryKey: [getAudienceDetailKey, variables.id],
      });
      router.push("/audience-group");
    },
  });
};
