import { z } from "zod";

export const upsertModelMobilSchema = z.object({
    id: z.string().optional(),
    cm_name: z.string().min(1),
    cm_is_active: z.boolean().optional(),
    cm_brand_id: z.string().optional(),
});

export type UpsertModelMobilSchema = z.infer<typeof upsertModelMobilSchema>;

export const upsertModelMobilSchemaForm = upsertModelMobilSchema.omit({ id: true });

export type UpsertModelMobilSchemaForm = z.infer<typeof upsertModelMobilSchemaForm>;
