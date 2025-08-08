import { format } from "date-fns";
import type { Service } from "@/types/service";

export const formatDate = (date: Date) => {
  return date ? format(date, "dd.MM.yyyy") : null;
};

///////////////////////////////////////////////
export const formatPrice = (price: number) => {
  return `${price.toFixed(2)} RSD`;
};

///////////////////////////////////////////////

export const sortByKey = <T extends Record<string, unknown>>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "desc"
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    // Ako su vrednosti datumi, konvertuj ih u timestamp
    if (aValue instanceof Date && bValue instanceof Date) {
      return order === "desc"
        ? bValue.getTime() - aValue.getTime()
        : aValue.getTime() - bValue.getTime();
    }

    // Ako su stringovi (datumi kao stringovi), konvertuj ih u Date objekte
    if (typeof aValue === "string" && typeof bValue === "string") {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);

      // Proveri da li su validni datumi
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        return order === "desc"
          ? bDate.getTime() - aDate.getTime()
          : aDate.getTime() - bDate.getTime();
      }
    }

    // Za brojeve i stringove
    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "desc" ? bValue - aValue : aValue - bValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return order === "desc"
        ? bValue.localeCompare(aValue)
        : aValue.localeCompare(bValue);
    }

    return 0;
  });
};

///////////////////////////////////////////////

export const sortServicesByDateDesc = (services: Service[]): Service[] => {
  return sortByKey(services, "datum", "desc");
};
