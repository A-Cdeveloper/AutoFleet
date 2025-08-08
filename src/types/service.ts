import { z } from "zod";

export enum ServiceType {
  REDOVNI = "redovni servis",
  KVAR = "kvar",
}

const baseServiceSchema = {
  datum: z.string().min(1, "Datum je obavezan"),
  tipServisa: z
    .enum(ServiceType)
    .refine((val) => Object.values(ServiceType).includes(val), {
      message: "Izaberite tip servisa",
    }),
  opis: z.string().min(1, "Opis je obavezan"),
  cena: z
    .string()
    .min(1, "Cena je obavezna")
    .refine((val) => Number(val) > 0, {
      message: "Cena mora biti veća od 0",
    }),
};

export const serviceFormInputSchema = z.object({
  ...baseServiceSchema,
  datum: baseServiceSchema.datum.refine(
    (val) => {
      const selectedDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    {
      message: "Datum ne može biti u prošlosti",
    }
  ),
});

export const serviceFormEditSchema = z.object(baseServiceSchema);

export type Service = {
  id: string;
  datum: string;
  opis: string;
  cena: number;
  tipServisa: ServiceType;
};

export type ServiceFormInput = z.infer<typeof serviceFormInputSchema>;
export type ServiceFormEditInput = z.infer<typeof serviceFormEditSchema>;
