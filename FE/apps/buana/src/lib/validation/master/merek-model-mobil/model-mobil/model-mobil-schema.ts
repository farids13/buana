import { z } from "zod";

export const modelMobilSchema = z.object({
    id: z.string().optional(),
    cm_name: z.string().min(1),
    cm_is_active: z.boolean().optional(),
});

export type ModelMobilSchema = z.infer<typeof modelMobilSchema>;
