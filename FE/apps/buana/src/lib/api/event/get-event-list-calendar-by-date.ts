import { httpClient } from "@/lib/http";
import { eventCalendarSchema } from "@/lib/validations/event";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const getEventListCalendarKey = "getEventListCalendar";

export const useGetEventListCalendar = (viewDate: Date) => {
  const from = moment(viewDate).startOf("month").format("YYYY-MM-DD");
  const to = moment(viewDate).endOf("month").format("YYYY-MM-DD");
  return useQuery({
    queryKey: [getEventListCalendarKey, from, to],
    queryFn: async () => {
      const response = await httpClient.get(`/event/calendar/${from}/${to}`);

      return eventCalendarSchema.array().parse(response.data);
    },
  });
};
