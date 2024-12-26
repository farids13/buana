import { z } from "zod";

export const upsertKondisiMobilSchema = z.object({
    id: z.string().uuid().optional(),
    cac_name: z.string(),
    cac_is_default: z.boolean().optional(),
    cac_is_active: z.boolean().optional(),
});

export type UpsertKondisiMobilSchema = z.infer<typeof upsertKondisiMobilSchema>;

// Form
export const upsertKondisiMobilSchemaForm = upsertKondisiMobilSchema.omit({ id: true });
export type UpsertKondisiMobilSchemaForm = z.infer<typeof upsertKondisiMobilSchemaForm>;

