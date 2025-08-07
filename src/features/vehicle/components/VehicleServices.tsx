import type { Service } from "../../../types/service";
import Button from "../../../ui/Button";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import Headline from "../../../ui/Headline";
import { formatDate, formatPrice } from "../../../utils/helpers";
import useGetVehicleServices from "../hooks/useGetVehicleServices";

type VehicleServicesProps = {
  vehicleId: string;
};

const VehicleServices = ({ vehicleId }: VehicleServicesProps) => {
  const { data: services, isLoading, error } = useGetVehicleServices(vehicleId);

  if (isLoading) return <p>Učitavanje servisa...</p>;
  if (error) return <p>Greška: {error}</p>;
  if (!services || services.length === 0)
    return (
      <Headline level={2}>Nema evidentiranih servisa za ovo vozilo.</Headline>
    );

  return (
    <ErrorBoundary>
      <div>
        <Headline level={2}>Lista servisa</Headline>
        <ul className="space-y-2">
          {services.map((service: Service) => (
            <li
              key={service.id}
              className="p-2 border rounded-md shadow-sm grid grid-cols-5 gap-2 bg-white/50"
            >
              <p>{formatDate(new Date(service.datum))}</p>
              <p>{service.opis}</p>
              <p>{formatPrice(service.cena)}</p>
              <p>{service.tipServisa}</p>
              <div className="flex gap-2 justify-end items-center">
                <Button variation="primary" size="small">
                  Uredi
                </Button>
                <Button variation="danger" size="small">
                  Obriši
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end my-4">
          <Button variation="secondary" size="small">
            Dodaj servis
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default VehicleServices;
