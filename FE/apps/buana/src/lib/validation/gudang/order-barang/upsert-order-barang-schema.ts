import { z } from "zod";

export const upsertOrderBarangSchema = z.object({
    id: z.string().nullable().optional(),
    po_number: z.string().nullable().optional(),
    po_date: z.string().datetime().min(1, { message: "Tanggal order tidak boleh kosong" }),
    supplier_id: z.string().nullable().optional(),
    products: z.array(z.object({
        id: z.string().nullable().optional(),
        qty: z.number().nullable().optional(),
        unit: z.string().nullable().optional(),
    })).nullable().optional(),
    po_note: z.string().nullable().optional(),
});

export type UpsertOrderBarangSchema = z.infer<typeof upsertOrderBarangSchema>;

export const upsertOrderBarangSchemaForm = upsertOrderBarangSchema.omit({
    id: true,
});

export type UpsertOrderBarangSchemaForm = z.infer<typeof upsertOrderBarangSchemaForm>;


