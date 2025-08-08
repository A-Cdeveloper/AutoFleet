import { useMemo } from "react";
import type { Vehicle } from "@/types/vehicle";

interface UseFilteredVehiclesParams {
  vehicles?: Vehicle[] | null;
  marka?: string | null;
  godiste?: string | null;
  model?: string | null;
}

export const useFilteredVehicles = ({
  vehicles,
  marka,
  godiste,
  model,
}: UseFilteredVehiclesParams) => {
  return useMemo(() => {
    if (!vehicles || vehicles.length === 0) return [];

    return vehicles.filter((v) => {
      const matchMarka = marka
        ? v.marka.toLowerCase().startsWith(marka.toLowerCase().trim())
        : true;

      const matchGodiste = godiste ? v.godina >= Number(godiste.trim()) : true;

      const matchModel = model
        ? v.model.toLowerCase().startsWith(model.toLowerCase().trim())
        : true;

      return matchMarka && matchGodiste && matchModel;
    });
  }, [vehicles, marka, godiste, model]);
};
