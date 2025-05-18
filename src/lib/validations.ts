import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  password: z.string().min(8, "Password length must be at least 6"),
  universityCard: z.string().nonempty("University Card is Required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password length must be at least 6"),
});

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(1000),
  coverUrl: z.string().nonempty(),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10),
});

export const GetResetCode = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
});

export const Otp = z.object({
  verificationCode: z.string().length(6, { message: "Code must be 6 digits" }),
});

export const ResetPassword = z
  .object({
    newPassword: z.string().min(6, { message: "Password too short" }),
    confirmPassword: z.string().min(6, { message: "Password too short" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
