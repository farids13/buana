import { z } from "zod";

export const createPaginatedResponseSchema = <T extends z.ZodType>(schema: T) =>
  z.object({
    data: z.array(schema),
    total: z.number(),
    pageIndex: z.number(),
    numberOfPages: z.number(),
  });
