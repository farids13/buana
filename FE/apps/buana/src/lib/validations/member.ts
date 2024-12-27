import { z } from "zod";

export const memberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string(),
  phone: z.string(),
  position: z.string(),
  departement: z.string(),
  superior: z.string().nullable(),
  imgUrl: z.string().nullable(),
});

export type Member = z.infer<typeof memberSchema>;

export const memberFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]+$/).min(8).max(16),
  position: z.string(),
  departement: z.string(),
  superior: z.string().uuid(),
  imgUrl: z.string()
});

export type MemberForm = z.infer<typeof memberFormSchema>;