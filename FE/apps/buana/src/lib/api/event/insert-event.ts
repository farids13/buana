import { httpClient } from "@/lib/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { EventFormValues } from "@/lib/validations/event";
import type { ScheduleProgram } from "@/lib/validations/schedule-program";
import { getEventListCalendarKey } from "./get-event-list-calendar-by-date";
import { getEventKey } from "./get-event";
import type { Audience } from "@/lib/validations/audience";
import { convertFromDateToIso } from "@/utils/date-utils";
import { toast } from "react-toastify";

export type InsertEventParams = EventFormValues & {
  schedules?: ScheduleProgram[];
  status: EventStatus;
  audienceUsers?: Audience[];
};

export type EventStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export const useInsertEvent = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: InsertEventParams) => {
      await httpClient.post("/event", {
        ...data,
        startAt: convertFromDateToIso(data.startAt),
        endAt : convertFromDateToIso(data.endAt)
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [getEventKey] });
      void queryClient.invalidateQueries({
        queryKey: [getEventListCalendarKey],
      });
      router.push("/events");
      toast.success("Event created successfully");
    },
  });
};
