import {z} from "zod";
export const pelangganSchema = z.object({
  id: z.string().uuid(),
  cus_code: z.string().optional(),
  cus_name: z.string().optional(),
  cus_phone: z.string().optional(),
  cus_address: z.string().optional(),
  cus_desc: z.string().optional(),
});

export type PelangganSchema = z.infer<typeof pelangganSchema>;
