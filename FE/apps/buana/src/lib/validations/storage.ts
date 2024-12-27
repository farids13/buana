import { z } from "zod";

export const storageSchema = z.object({
  storageId: z.string().uuid(),
  format: z.string(),
  name: z.string(),
  type: z.enum(["ATTACHMENT", "RESULT"]),
});

export type Storage = z.infer<typeof storageSchema>;
