import { z } from "zod";

export const memberSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]+$/).min(8).max(16),
  position: z.string(),
  departement: z.string(),
  superior: z.string().uuid().nullable(),
  imgUrl: z.string().nullable(),
  createdAt: z.string().datetime(),
  createdBy: z.string().nullable(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string().nullable(),
});

export type Member = z.infer<typeof memberSchema>;

export const memberFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[0-9]+$/).min(8).max(16),
  position: z.string(),
  departement: z.string(),
  superior: z.string().uuid().nullable(),
  imgUrl: z.string().nullable()
});

export type MemberForm = z.infer<typeof memberFormSchema>;
