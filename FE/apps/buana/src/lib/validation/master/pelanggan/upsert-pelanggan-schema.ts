import { z } from "zod";
export const upsertPelangganSchema = z.object({
    id: z.string().optional(),
    cus_code: z.string().min(3).max(255).optional(),
    cus_name: z.string().min(3).max(255),
    cus_phone: z.string().max(15),
    cus_email: z.string().nullish().optional(),
    cus_year: z.string().nullish().optional(),
    cus_id_card_number: z.string().nullish().optional(),
    cus_address: z.string().optional(),
    cus_desc: z.string().optional(),
});

export type UpsertPelangganSchema = z.infer<typeof upsertPelangganSchema>;


export const upsertPelangganSchemaForm = upsertPelangganSchema.omit({ id: true , cus_code: true});
export type UpsertPelangganSchemaForm = z.infer<typeof upsertPelangganSchemaForm>;
