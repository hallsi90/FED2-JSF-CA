import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Enter at least 3 characters for your full name."),
  subject: z
    .string()
    .trim()
    .min(3, "Enter a subject with at least 3 characters."),
  email: z.string().trim().pipe(z.email("Enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Enter a message with at least 10 characters."),
});
