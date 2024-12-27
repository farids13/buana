import { httpClient } from "@/lib/http";
import { eventCalendarDetailSchema } from "@/lib/validations/event";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

export const getEventDetailByDate = "getEventDetailByDate";

export const useGetEventDetailByDate = (date?: Date | null) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return useQuery({
    queryKey: [getEventDetailByDate, date],
    queryFn: async () => {
      const response = await httpClient.get(`/event/calendar/${formattedDate}`);

      return eventCalendarDetailSchema.array().parse(response.data);
    },
    enabled: Boolean(date),
  });
};
