import { z } from "zod";

export const upsertSatuanSchema = z.object({
    id: z.string().optional(),
    u_code: z.string(),
    u_name: z.string(),
    u_desc: z.string().optional(),
    u_is_active: z.boolean().optional(),
});
export type UpsertSatuanSchema = z.infer<typeof upsertSatuanSchema>;

// Form
export const upsertSatuanSchemaForm = upsertSatuanSchema.omit({ id: true });
export type UpsertSatuanSchemaForm = z.infer<typeof upsertSatuanSchemaForm>;