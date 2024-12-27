import { httpClient } from "@/lib/http";
import { audienceFormSchema } from "@/lib/validations/audience";
import { scheduleProgramSchema } from "@/lib/validations/schedule-program";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

export const getEventOngoingDetailKey = "getEventOngoingDetail";

const getDetailEventOngoingSchema = z.object({
    note : z.string().nullable(),
    startAt : z.string(),
    endAt : z.string(),
    audienceUsers : audienceFormSchema.array().optional(),
    schedules: scheduleProgramSchema.array().optional(),
});

export const useGetEventOngoingDetail = ({eventId, date} : {eventId : string, date : string}) => {
    return useQuery({
        queryKey: [getEventOngoingDetailKey, eventId],
        queryFn: async () => {
            const response = await httpClient.get(`/event/ongoing/${eventId}?date=${date}`);
            return getDetailEventOngoingSchema.parseAsync(response.data);
        },
        enabled: Boolean(eventId),
    });
}