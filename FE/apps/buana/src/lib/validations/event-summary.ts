import { z } from "zod";
import { audienceDropdownSchema, audienceFormSchema } from "./audience";
import { storageSchema } from "./storage";
import { format } from "date-fns";

const scheduleSchema = z.object({
  startTime: z.string().transform((value) => {
    const date = new Date(value);
    return format(date, 'yyyy-MM-dd HH:mm:ss');
  }),
  endTime: z.string().transform((value) => new Date(value)),
  duration: z.number(),
  activity: z.string(),
  picName: z.string(),
  date: z.string().or(z.date()),
  note: z.string().optional().nullable(),
  position: z.number().optional(),
})

const notesSchema = z.object({
  note: z.string().optional(),
  eventAt: z.string(),
})

export const getDetailEventSummarySchema = z.object({
  name: z.string(),
  topic: z.string(),
  purpose: z.string(),
  preparationNotes: z.string().optional().nullish(),
  startAt: z.string(),
  endAt: z.string(),
  isOnline: z.boolean().default(false),
  linkUrl: z.string().url().optional().nullable(),
  locationValue: z.string().nullish(),
  address: z.string().nullish(),
  schedules: scheduleSchema.array().optional(),
  province: z.string().nullish(),
  district: z.string().nullish(),
  note: z.string().nullish(),
  phase: z.string().nullish(),
  audienceNames: audienceDropdownSchema.array().optional(),
  files: storageSchema.array().optional(),
  audienceUsers: audienceFormSchema.array().optional(),
  notes: notesSchema.array().optional(),
});

