enum ServiceType {
  REDOVNI = "redovni",
  KVAR = "kvar",
}

export type Service = {
  id: string;
  datum: string;
  opis: string;
  cena: number;
  tipServisa: ServiceType;
};
