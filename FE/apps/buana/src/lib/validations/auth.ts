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
