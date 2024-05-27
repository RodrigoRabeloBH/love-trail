import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3, {
        message: 'Username must be at least 3 characters'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    }),
    gender: z.string().min(4, {
        message: 'Gender is required'
    }),
    dateOfBirth: z.string().date(),
    city: z.string().min(2, {
        message: 'City is required'
    }),
    country: z.string().min(2, {
        message: 'Country is required'
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

