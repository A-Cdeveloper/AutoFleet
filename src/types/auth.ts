import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Korisničko ime je obavezno")
    .min(3, "Korisničko ime mora imati najmanje 3 karaktera")
    .max(50, "Korisničko ime ne može biti duže od 50 karaktera"),
  password: z
    .string()
    .min(1, "Lozinka je obavezna")
    .min(6, "Lozinka mora imati najmanje 6 karaktera")
    .max(100, "Lozinka ne može biti duža od 100 karaktera"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
