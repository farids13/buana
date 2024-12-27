
import { z } from "zod";

export const profileFormSchema = z.object({
    name: z.string().min(3),
    phoneNumber: z.string().regex(/^\+?[0-9]+$/).min(8).max(16),
    imgUrl : z.string().nullish(),
})

export type ProfileForm = z.infer<typeof profileFormSchema>;