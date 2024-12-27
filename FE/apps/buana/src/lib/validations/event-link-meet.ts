import { z } from "zod";

export const eventLinkMeetSchema = z.object({
    token: z.string(),
    eventName: z.string(),
    description: z.string(),
    startAt: z.string(),
    endAt: z.string(),
    reqId: z.string().uuid(),
    users: z.array(z.string()),
});

export type EventLinkMeet = z.infer<typeof eventLinkMeetSchema>;

export const respEventLinkMeetSchema = z.object({
    link: z.string(),
})

export type RespEventLinkMeet = z.infer<typeof respEventLinkMeetSchema>;