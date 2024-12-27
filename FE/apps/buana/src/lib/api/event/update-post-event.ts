import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventKey } from "./get-event";
import type { InsertEventParams } from "./insert-event";
import { getEventDetailKey } from "./get-event-detail";

type UpdateEventParams = Pick<InsertEventParams, "audienceUsers" | "files"> & {
  id: string;
};

export const useUpdatePostEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateEventParams) => {
      await httpClient.put(`/event/post/${data.id}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventKey] });
      void queryClient.invalidateQueries({ queryKey: [getEventDetailKey] });
    },
  });
};
