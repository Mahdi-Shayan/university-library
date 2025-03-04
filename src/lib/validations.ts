import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  password: z.string().min(8, 'Password length must be at least 6'),
  universityCard: z.string().nonempty("University Card is Required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password length must be at least 6')
})