import { z } from "zod";

export const kondisiMobilSchema = z.object({
    id: z.string().uuid(),
    cac_name: z.string(),
    cac_is_default: z.boolean(),
    cac_is_active: z.boolean(),
});

export type KondisiMobilSchema = z.infer<typeof kondisiMobilSchema>;
