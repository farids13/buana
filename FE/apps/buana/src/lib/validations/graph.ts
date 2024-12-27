import { z } from "zod";

export const graphSchema = z
  .object({
    name: z.string(),
    value: z.number(),
  })
  .array();
