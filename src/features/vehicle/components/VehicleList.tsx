import { useEffect, useMemo, useState } from "react";
import { ITEMS_PER_PAGE } from "@/constants";
import { useUrlParams } from "@/hooks/useUrlParams";
import ErrorMessage from "@/ui/ErrorMessage";
import Pagination from "@/ui/Pagination";
import Spinner from "@/ui/Spinner";
import ErrorBoundary from "@/ui/ErrorBoundary";
import useGetVehicles from "@/features/vehicle/hooks/useGetVehicles";
import VehicleItem from "@/features/vehicle/components/VehicleItem";
import VehicleTopBar from "@/features/vehicle/components/VehicleTopBar";
import { useFilteredVehicles } from "@/features/vehicle/hooks/useFilteredVehicles";

const VehicleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: vehicles, isLoading, error } = useGetVehicles();
  const { marka, godiste, model } = useUrlParams();
  const filteredVehicles = useFilteredVehicles({
    vehicles,
    marka,
    godiste,
    model,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [marka, godiste, model]);

  const totalItems = useMemo(
    () => filteredVehicles?.length || 0,
    [filteredVehicles]
  );
  const totalPages = useMemo(
    () => Math.ceil(totalItems / ITEMS_PER_PAGE),
    [totalItems]
  );

  const paginatedVehicles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full w-full">
        <VehicleTopBar
          totalItems={totalItems}
          markaFilter={marka}
          godisteFilter={godiste}
          modelFilter={model}
        />

        {paginatedVehicles.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 h-2/3">
            {paginatedVehicles.map((vehicle) => (
              <VehicleItem key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="my-4">Nema vozila po zadatim kriterijima</p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default VehicleList;
