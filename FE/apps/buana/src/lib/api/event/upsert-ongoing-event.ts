import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEventKey } from "./get-event";
import type { InsertEventParams } from "./insert-event";
import { getEventDetailKey } from "./get-event-detail";
import { toast } from "react-toastify";
import { getAttendHistoryKey } from "./get-attend-history";

type UpsertEventOngoingBody = Pick<InsertEventParams, "audienceUsers"> & {
  id: string;
  note : string | null;
  date : string;
};

export const useUpsertOngoinEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpsertEventOngoingBody) => {
      await httpClient.put(`/event/upsert/ongoing/${data.id}?date=${data.date}`, data);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventKey] });
      void queryClient.invalidateQueries({ queryKey: [getEventDetailKey] });
      void queryClient.invalidateQueries({ queryKey: [getAttendHistoryKey] });
      toast.success("Event Ongoing updated successfully");
    },
  });
};
