import type { Service } from "@/types/service";
import { Button, ErrorBoundary, Headline } from "@/ui";
import useGetVehicleServices from "@/features/vehicle/hooks/useGetVehicleServices";
import AddVehicleServiceFormualar from "@/features/vehicle/components/AddVehicleServiceFormualar";
import VehicleService from "@/features/vehicle/components/VehicleService";
import { useState, useCallback, useMemo } from "react";
import { sortServicesByDateDesc } from "@/utils/helpers";

type VehicleServicesProps = {
  vehicleId: string;
};

const VehicleServices = ({ vehicleId }: VehicleServicesProps) => {
  const { data: services, isLoading, error } = useGetVehicleServices(vehicleId);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  const sortedServices = useMemo(() => {
    if (!services) return [];
    return sortServicesByDateDesc(services);
  }, [services]);

  const handleToggleAddForm = useCallback(() => {
    setShowAddForm(!showAddForm);
  }, [showAddForm]);

  const handleEditClick = useCallback((serviceId: string) => {
    setEditingServiceId(serviceId);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingServiceId(null);
  }, []);

  if (isLoading) return <p>Učitavanje servisa...</p>;
  if (error) return <p>Greška: {error}</p>;

  let content = (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
      {sortedServices?.map((service: Service) => (
        <VehicleService
          key={service.id}
          service={service}
          vehicleId={vehicleId}
          isEditing={editingServiceId === service.id}
          onEditClick={() => handleEditClick(service.id)}
          onCancelEdit={handleCancelEdit}
        />
      ))}
    </ul>
  );

  if (!sortedServices || sortedServices.length === 0)
    content = <p>Nema evidentiranih servisa za ovo vozilo.</p>;

  return (
    <ErrorBoundary>
      <div>
        {showAddForm ? (
          <AddVehicleServiceFormualar
            setShowAddForm={setShowAddForm}
            vehicleId={vehicleId}
          />
        ) : (
          <div className="flex justify-end my-4 border-y py-2">
            <Button
              variation="secondary"
              size="small"
              onClick={handleToggleAddForm}
              aria-label="Dodaj novi servis"
            >
              Dodaj servis
            </Button>
          </div>
        )}
        <Headline level={2}>Lista servisa</Headline>
        {content}
      </div>
    </ErrorBoundary>
  );
};

export default VehicleServices;
