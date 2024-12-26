import { z } from "zod";

export const merekMobilSchema = z.object({
    id: z.string().optional(),
    cb_name: z.string(),
    cb_is_active: z.boolean().optional(),
});

export type MerekMobilSchema = z.infer<typeof merekMobilSchema>;