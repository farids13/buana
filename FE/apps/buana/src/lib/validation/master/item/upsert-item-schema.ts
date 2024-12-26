import { z } from "zod";

export const upsertItemSchema = z.object({
    id: z.string().nullish().optional(),
    p_code: z.string().min(1, { message: "Kode barang tidak boleh kosong" }),
    p_name: z.string().min(1, { message: "Nama barang tidak boleh kosong" }),
    p_desc: z.string().nullish().optional(),
    p_barcode: z.string().nullish().optional(),
    p_popular_name: z.string().nullish().optional(),
    p_type: z.string().nullish().optional(),
    p_part_number: z.string().nullish().optional(),
    p_use: z.string().nullish().optional(),
    p_stock: z.number().nullish().optional(),
    p_base_price: z.string().nullish().optional(),
    p_sell_price: z.string().nullish().optional(),
    p_group: z.string().min(1, { message: "Kelompok Barang tidak boleh kosong" }).nullish().optional(),
    p_unit_id: z.string().min(1, { message: "Unit tidak boleh kosong" }).nullish().optional(),
});

export type UpsertItemSchema = z.infer<typeof upsertItemSchema>;

export const upsertItemSchemaForm = upsertItemSchema.omit({
    id: true,
    p_code:true,
});

export type UpsertItemSchemaForm = z.infer<typeof upsertItemSchemaForm>;