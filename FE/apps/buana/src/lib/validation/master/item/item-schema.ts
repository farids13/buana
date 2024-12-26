import { z } from "zod";

export const itemSchema = z.object({
    id: z.string().nullish().optional(),
    p_code: z.string().nullish().optional(),
    p_name: z.string().nullish(),
    p_part_number: z.string().nullish().optional(),
    p_use: z.string().nullish().optional(),
    p_stock: z.number().nullish().optional(),
    p_base_price: z.number().nullish().optional(),
    p_sell_price: z.number().nullish().optional(),
});

export type ItemSchema = z.infer<typeof itemSchema>;