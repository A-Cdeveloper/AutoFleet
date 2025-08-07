import type { Service } from "../../../types/service";
import Button from "../../../ui/Button";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import Headline from "../../../ui/Headline";
import useGetVehicleServices from "../hooks/useGetVehicleServices";
import VehicleService from "./VehicleService";

type VehicleServicesProps = {
  vehicleId: string;
};

const VehicleServices = ({ vehicleId }: VehicleServicesProps) => {
  const { data: services, isLoading, error } = useGetVehicleServices(vehicleId);

  if (isLoading) return <p>Učitavanje servisa...</p>;
  if (error) return <p>Greška: {error}</p>;

  let content = (
    <ul className="space-y-2">
      {services?.map((service: Service) => (
        <VehicleService
          key={service.id}
          service={service}
          vehicleId={vehicleId}
        />
      ))}
    </ul>
  );

  if (!services || services.length === 0)
    content = <p>Nema evidentiranih servisa za ovo vozilo.</p>;

  return (
    <ErrorBoundary>
      <div>
        <Headline level={2}>Lista servisa</Headline>
        {content}
        <div className="flex justify-end my-4 border-t py-4">
          <Button variation="secondary" size="small">
            Dodaj servis
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default VehicleServices;
