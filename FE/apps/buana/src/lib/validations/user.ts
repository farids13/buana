import { z } from "zod";

export const optionSchema = z.object({
  logoUrl: z.string().nullish(),
  userOption: z.array(
    z.object({
      name: z.enum(["notification", "dashboard"]),
      value: z.string(),
    }),
  ),
});

export const profileSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    imgUrl: z.string().nullish(),
    logoUrl: z.string().nullish(),
    expiredAt: z.string().nullable(),
    status: z.string(),
  })
  .merge(optionSchema);

export const optionFormSchema = z.object({
  notification: z.string(),
  dashboard: z.string(),
  logoUrl: z.string().optional(),
});

export type OptionFormValues = z.infer<typeof optionFormSchema>;
