import { z } from "zod";

export function paginationResponseSchema<ItemType extends z.ZodTypeAny>(
  itemSchema: ItemType,
) {
  return z.object({
    data: z.array(itemSchema),
    total: z.number(),
    pageIndex: z.number(),
    numberOfPages: z.number(),
  });
}

