import type { Service } from "../../../types/service";
import Button from "../../../ui/Button";
import { formatDate, formatPrice } from "../../../utils/helpers";
import useRemoveServiceFromVehicle from "../hooks/useRemoveServiceFromVehicle";

const VehicleService = ({
  service,
  vehicleId,
}: {
  service: Service;
  vehicleId: string;
}) => {
  const { removeService, isPending, error } = useRemoveServiceFromVehicle();

  const handleRemove = () => {
    if (
      window.confirm(
        `Da li ste sigurni da želite da obrišete servis ${service.opis}?`
      )
    ) {
      removeService({ vehicleId, serviceId: service.id });
    }
  };

  return (
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
        <Button
          variation="danger"
          size="small"
          onClick={handleRemove}
          disabled={isPending}
        >
          {isPending ? "Brišem..." : "Obriši"}
        </Button>
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </li>
  );
};

export default VehicleService;
