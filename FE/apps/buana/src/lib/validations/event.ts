import { z } from "zod";
import { audienceDropdownSchema, audienceFormSchema } from "./audience";
import { scheduleProgramSchema } from "./schedule-program";
import { storageSchema } from "./storage";

export const eventSchema = z.object({
  id: z.string().uuid(),
  eventCategoryName: z.string().nullish(),
  eventName: z.string(),
  date: z.string(),
  audienceGroup: z.string(),
  startAt: z
    .string()
    .datetime({ offset: true }),
  endAt: z
    .string()
    .datetime({ offset: true }),
  status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
  phase: z.string().nullish(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventFormSchema = z.object({
  eventCategoryId: z.string().uuid(),
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string().optional().nullish(),
  startAt: z
    .string()
    .datetime()
    .transform((value) => new Date(value.replace("Z", "")))
    .or(z.date()),
  endAt: z
    .string()
    .datetime()
    .transform((value) => new Date(value.replace("Z", "")))
    .or(z.date()),
  isOnline: z.boolean().default(false),
  linkUrl: z.string().url().optional().nullable(),
  locationValue: z.string().nullish(),
  address: z.string().nullish(),
  schedules: scheduleProgramSchema.array().optional(),
  provinceId: z.string().uuid().nullish(),
  province: z.string().nullish(),
  districtId: z.string().uuid().nullish(),
  district: z.string().nullish(),
  audienceGroupIds: z.string().array().optional().nullish(),
  files: storageSchema.array().optional(),
  audienceUsers: audienceFormSchema.array().optional(),
  note: z.string().optional().nullable(),
});

export const updateEventFormSchema = eventFormSchema
  .extend({
    status: z.enum(["ACTIVE", "INACTIVE", "DRAFT"]),
    phase: z.enum(["PRE", "ONGOING", "POST"]),
  });
export type UpdateEventFormSchema = z.infer<typeof updateEventFormSchema>

export const eventCalendarSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable(),
  start: z.string(),
  end: z.string(),
  isOnline: z.boolean(),
});
export type EventCalendar = z.infer<typeof eventCalendarSchema>;

export const eventCalendarDetailSchema = eventFormSchema.omit({
  audienceNames: true,
  district: true,
  province: true,
  address: true,
});

export const attendHistorySchema = audienceFormSchema
  .omit({
    isAttend: true,
  })
  .extend({
    attendedAt: z
      .string()
      .datetime()
      .transform((value) => new Date(value)),
  });

export type AttendHistory = z.infer<typeof attendHistorySchema>;
export type EventFormValues = z.infer<typeof eventFormSchema>;


export const createLinkGmeetSchema = z.object({
  startAt: z.string(),
  endAt: z.string(),
  eventName: z.string(),
  description: z.string(),
  reqId: z.string(),
  users: z.array(z.string()),
});

export type CreateLinkGmeet = z.infer<typeof createLinkGmeetSchema>;


export const sendEmailNotificationSchema = z.object({
  eventId: z.string().uuid(),
  accessToken: z.string().nullable(),
  eventLink: z.string(),
});

export type SendEmailNotification = z.infer<typeof sendEmailNotificationSchema>;
