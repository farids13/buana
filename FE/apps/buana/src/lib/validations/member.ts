import { z } from "zod";

export const memberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  email: z.string(),
  phone: z.string(),
  position: z.string(),
  departement: z.string(),
  superior: z.string().nullable().optional(),
  imgUrl: z.string().nullable(),
});


export type Member = z.infer<typeof memberSchema>;

export const memberFormSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  position: z.string().min(1, "Jabatan wajib diisi"),
  departement: z.string().min(1, "Departemen wajib diisi"),
  superior: z.string().optional(),
  imgUrl: z.string().optional()
});

export type MemberForm = z.infer<typeof memberFormSchema>;