import { z } from "zod";

export const provinceSchema = z.object({
  id: z.string().uuid(),
  code: z.number(),
  province: z.string(),
});
