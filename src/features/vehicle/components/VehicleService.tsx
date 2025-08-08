import type { Service } from "@/types/service";
import { IconButton, Spinner, ErrorMessage } from "@/ui";
import { formatDate, formatPrice } from "@/utils/helpers";
import useRemoveServiceFromVehicle from "@/features/vehicle/hooks/useRemoveServiceFromVehicle";
import EditVehicleServiceFormular from "@/features/vehicle/components/EditVehicleServiceFormular";
import React from "react";
import { useCallback } from "react";
import { Edit, Trash2 } from "lucide-react";

const VehicleService = React.memo(
  ({
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

    const handleRemove = useCallback(() => {
      if (
        window.confirm(
          `Da li ste sigurni da želite da obrišete servis ${service.opis}?`
        )
      ) {
        removeService({ vehicleId, serviceId: service.id });
      }
    }, [service.opis, service.id, vehicleId, removeService]);

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
            className={`p-2 border rounded-md shadow-sm grid grid-cols-1 lg:grid-cols-5 gap-2 bg-white/50 items-center ${
              !isEditing ? "self-start" : ""
            }`}
          >
            <p>{formatDate(new Date(service.datum))}</p>
            <p>{service.opis}</p>
            <p>{formatPrice(service.cena)}</p>
            <p>{service.tipServisa}</p>

            <div className="flex gap-3 justify-end items-center">
              <IconButton
                icon={<Edit size={20} className="text-auto-secondary" />}
                onClick={onEditClick}
                aria-label="Izmeni servis"
              />
              <IconButton
                icon={<Trash2 size={20} className="text-auto-error" />}
                onClick={handleRemove}
                disabled={isPending}
                aria-label="Obriši servis"
              />
            </div>
          </li>
        )}
      </>
    );
  }
);

VehicleService.displayName = "VehicleService";

export default VehicleService;
