import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type SignInFormValues = z.infer<typeof authSchema>;


export const authGoogleSchema = z.object({
  token : z.string(),
});

export type SignInGoogleFormValues = z.infer<typeof authGoogleSchema>;

export const registerSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type SignUpFormValues = z.infer<typeof registerSchema>;
