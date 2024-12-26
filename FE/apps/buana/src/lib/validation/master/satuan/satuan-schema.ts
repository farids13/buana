import { z } from "zod";

export const satuanSchema = z.object({
    id: z.string().optional(),
    u_code: z.string(),
    u_name: z.string(),
    u_desc: z.string().optional(),
    u_is_active: z.boolean().optional(),
});

export type SatuanSchema = z.infer<typeof satuanSchema>;