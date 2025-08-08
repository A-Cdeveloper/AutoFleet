import { useUrlParams } from "@/hooks/useUrlParams";
import { FilterInput } from "@/ui";
import React from "react";
import { useCallback } from "react";

interface VehicleTopBarProps {
  totalItems: number;
  markaFilter: string;
  godisteFilter: string | null;
  modelFilter: string;
}

const VehicleTopBar = React.memo(
  ({
    totalItems,
    markaFilter,
    godisteFilter,
    modelFilter,
  }: VehicleTopBarProps) => {
    const { searchParams, setCurrentParams } = useUrlParams();

    const updateFilter = useCallback(
      (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams.toString());

        if (value) newParams.set(key, value);
        else newParams.delete(key);

        setCurrentParams(newParams);
      },
      [searchParams, setCurrentParams]
    );

    const handleMarkaChange = useCallback(
      (val: string) => {
        updateFilter("marka", val);
      },
      [updateFilter]
    );

    const handleGodisteChange = useCallback(
      (val: string) => {
        updateFilter("godiste", val);
      },
      [updateFilter]
    );

    const handleModelChange = useCallback(
      (val: string) => {
        updateFilter("model", val);
      },
      [updateFilter]
    );

    return (
      <div className="border-y flex flex-col sm:flex-row justify-between items-center p-2 mb-2 bg-white/50 gap-4">
        <div className="min-w-[120px]">Ukupno ({totalItems})</div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 flex-grow w-full">
          <FilterInput
            placeholder="Filter po marki"
            value={markaFilter}
            onChange={handleMarkaChange}
          />
          <FilterInput
            placeholder="Mlađe od ..."
            type="number"
            value={godisteFilter}
            onChange={handleGodisteChange}
          />
          <FilterInput
            placeholder="Filter po modelu"
            value={modelFilter}
            onChange={handleModelChange}
          />
        </div>
      </div>
    );
  }
);

export default VehicleTopBar;
