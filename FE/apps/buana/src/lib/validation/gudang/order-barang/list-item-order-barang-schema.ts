import { z } from "zod";

export const listItemOrderBarangSchema = z.object({
    id: z.string().nullish().optional(),
    p_code: z.string().nullish().optional(),
    p_name: z.string().nullish().optional(),
    p_part_number: z.string().nullish().optional(),
    po_note: z.string().nullish().optional(),
    qty: z.number().nullish().optional(),
    unit_id: z.string().nullish().optional(),
});

export type ListItemOrderBarangSchema = z.infer<typeof listItemOrderBarangSchema>;

export const listItemOrderBarangSchemaForm = listItemOrderBarangSchema.omit({
    id: true,
});
export type ListItemOrderBarangSchemaForm = z.infer<typeof listItemOrderBarangSchemaForm>;