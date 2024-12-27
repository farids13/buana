import { z } from "zod";

export const audienceGroupSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  totalAudience: z.number(),
});

export const audienceFormSchema = z.object({
  id : z.string().uuid().optional(),
  name: z.string().nullable(),
  job: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  email: z.string().email(),
  description: z.string().nullish(),
  isAttend: z.boolean().default(false).nullish()
});

export const listAudiencesUserSchema = z.array(
    z.object({
      name: z.string(),
      job: z.string(),
      phoneNumber: z.string(),
      email: z.string().email(),
      description: z.string().nullish(),
      isAttend: z.boolean().default(false).nullish(),
      id: z.string().uuid(),
      idGroup: z.string().uuid().nullable(),
    })
  );
export const audienceGroupFormSchema = z.object({
  id: z.string().uuid().nullish(),
  name: z.string(),
  description: z.string().nullish(),
  audiences: audienceFormSchema.array().optional(),
});

export const audienceDropdownSchema = z.object({
  id: z.string().uuid(),
  audienceName: z.string(),
});

export type AudienceFormValues = z.infer<typeof audienceGroupFormSchema>;
export type Audience = z.infer<typeof audienceFormSchema>;
export type ListAudience = z.infer<typeof listAudiencesUserSchema>;
export type AudienceGroup = z.infer<typeof audienceGroupSchema>;
export type AudienceDropdown = z.infer<typeof audienceDropdownSchema>;
