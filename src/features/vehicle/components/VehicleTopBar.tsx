import { useUrlParams } from "@/hooks/useUrlParams";
import { FilterInput } from "@/ui";

interface VehicleTopBarProps {
  totalItems: number;
  markaFilter: string;
  godisteFilter: string | null;
  modelFilter: string;
}

const VehicleTopBar = ({
  totalItems,
  markaFilter,
  godisteFilter,
  modelFilter,
}: VehicleTopBarProps) => {
  const { searchParams, setCurrentParams } = useUrlParams();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    setCurrentParams(newParams);
  };

  return (
    <div className="border-y flex flex-col sm:flex-row justify-between items-center p-2 mb-2 bg-white/50 gap-4">
      <div className="min-w-[120px]">Ukupno ({totalItems})</div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 flex-grow w-full">
        <FilterInput
          placeholder="Filter po marki"
          value={markaFilter}
          onChange={(val) => updateFilter("marka", val)}
        />
        <FilterInput
          placeholder="Mlađe od ..."
          type="number"
          value={godisteFilter}
          onChange={(val) => updateFilter("godiste", val)}
        />
        <FilterInput
          placeholder="Filter po modelu"
          value={modelFilter}
          onChange={(val) => updateFilter("model", val)}
        />
      </div>
    </div>
  );
};

export default VehicleTopBar;
