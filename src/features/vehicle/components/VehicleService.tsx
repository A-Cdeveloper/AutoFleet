import type { Service } from "@/types/service";
import { Button, Spinner, ErrorMessage } from "@/ui";
import { formatDate, formatPrice } from "@/utils/helpers";
import useRemoveServiceFromVehicle from "@/features/vehicle/hooks/useRemoveServiceFromVehicle";
import EditVehicleServiceFormular from "@/features/vehicle/components/EditVehicleServiceFormular";

const VehicleService = ({
  service,
  vehicleId,
  isEditing,
  onEditClick,
  onCancelEdit,
}: {
  service: Service;
  vehicleId: string;
  isEditing: boolean;
  onEditClick: () => void;
  onCancelEdit: () => void;
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

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      {isEditing ? (
        <EditVehicleServiceFormular
          service={service}
          vehicleId={vehicleId}
          onCancel={onCancelEdit}
        />
      ) : (
        <li
          key={service.id}
          className="p-2 border rounded-md shadow-sm grid grid-cols-1 lg:grid-cols-5 gap-2 bg-white/50 items-center"
        >
          <p>{formatDate(new Date(service.datum))}</p>
          <p>{service.opis}</p>
          <p>{formatPrice(service.cena)}</p>
          <p>{service.tipServisa}</p>

          <div className="flex gap-2 justify-end items-center">
            <Button
              variation="primary"
              size="small"
              onClick={onEditClick}
              aria-label="Izmeni servis"
            >
              Izmeni
            </Button>
            <Button
              variation="danger"
              size="small"
              onClick={handleRemove}
              disabled={isPending}
              aria-label="Obriši servis"
            >
              {isPending ? "Brisanje..." : "Obriši"}
            </Button>
          </div>
        </li>
      )}
    </>
  );
};

export default VehicleService;
