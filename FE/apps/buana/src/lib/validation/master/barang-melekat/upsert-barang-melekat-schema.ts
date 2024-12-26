import { z } from "zod";

export const upsertBarangMelekatSchema = z.object({
  id : z.string().uuid().optional(),
  ati_name: z.string().min(1, "Nama barang melekat harus diisi"),
  ati_is_default: z.boolean().default(false),
  ati_is_active: z.boolean().default(true),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
});
export type UpsertBarangMelekatSchema = z.infer<typeof upsertBarangMelekatSchema>;

export const upsertBarangMelekatSchemaForm = upsertBarangMelekatSchema.omit({id: true});
export type UpsertBarangMelekatSchemaForm = z.infer<typeof upsertBarangMelekatSchemaForm>;