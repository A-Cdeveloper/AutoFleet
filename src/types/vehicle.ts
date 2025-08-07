import { z } from "zod";

export type Vehicle = {
  id: string;
  marka: string;
  model: string;
  godina: number;
  services: string[];
};

export type VehicleResponse = {
  vehicles: Vehicle[];
};

export const vehicleFormSchema = z.object({
  marka: z.string().min(1, "Marka je obavezna"),
  model: z.string().min(1, "Model je obavezan"),
  godina: z
    .string()
    .min(1, "Godina je obavezna")
    .refine((val) => !isNaN(Number(val)), "Godina mora biti broj")
    .refine((val) => {
      const num = Number(val);
      return num >= 1900;
    }, "Godina mora biti nakon 1900")
    .refine((val) => {
      const num = Number(val);
      return num <= new Date().getFullYear() + 1;
    }, "Godina ne može biti u budućnosti"),
  services: z.array(z.string()).optional(),
});

export type VehicleFormData = z.infer<typeof vehicleFormSchema>;
