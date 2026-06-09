import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rePassword: z.string(),
  dateOfBirth: z.string(),
  gender: z.enum(["male", "female"]),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;

export const changePasswordSchema = z.object({
  password: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;

export interface AuthResponse {
  message: string;
  token?: string;
  user?: ProfileData;
}

export interface ProfileData {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo?: string;
  createdAt: string;
}
