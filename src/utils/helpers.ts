import { format } from "date-fns";

export const formatDate = (date: Date) => {
  return date ? format(date, "dd.MM.yyyy") : null;
};

///////////////////////////////////////////////
export const formatPrice = (price: number) => {
  return `${price.toFixed(2)} RSD`;
};
