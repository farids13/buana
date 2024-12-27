import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean()
});

export type UserValues = z.infer<typeof userSchema>;
