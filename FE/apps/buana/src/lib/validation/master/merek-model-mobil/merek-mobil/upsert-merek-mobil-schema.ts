import { z } from "zod";

export const upsertMerekMobilSchema = z.object({
    id: z.string().optional(),
    cb_name: z.string().optional().nullish(),
    cb_is_active: z.boolean().optional().nullable(),
});

export type UpsertMerekMobilSchema = z.infer<typeof upsertMerekMobilSchema>;

export const upsertMerekMobilSchemaForm = upsertMerekMobilSchema.omit({ id: true });
export type UpsertMerekMobilSchemaForm = z.infer<typeof upsertMerekMobilSchemaForm>;
