import { z } from "zod"

export const listBarangMelekatSchema = z.object({
  id: z.string().uuid(),
  ati_name: z.string().nullish(), // nullable() hanya menerima null
  ati_is_default: z.boolean().nullish(), // nullish() menerima null dan undefined 
  ati_is_active: z.boolean(),
});

export type ListBarangMelekatZod = z.infer<typeof listBarangMelekatSchema>;
