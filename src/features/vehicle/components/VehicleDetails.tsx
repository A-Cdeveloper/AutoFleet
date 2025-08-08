import { useNavigate } from "react-router-dom";
import {
  IconButton,
  ErrorMessage,
  Headline,
  Spinner,
  ErrorBoundary,
} from "@/ui";
import useDeleteVehicle from "@/features/vehicle/hooks/useDeleteVehicle";
import useGetVehicle from "@/features/vehicle/hooks/useGetVehicle";
import VehicleServices from "@/features/vehicle/components/VehicleServices";
import React from "react";
import { useCallback } from "react";
import { Edit, Trash2 } from "lucide-react";

const VehicleDetails = React.memo(({ id }: { id: string }) => {
  const { data: vehicle, isLoading, error } = useGetVehicle(id);
  const navigate = useNavigate();
  const {
    deleteVehicleById,
    isPending,
    error: deleteError,
  } = useDeleteVehicle();

  const handleEdit = useCallback(() => {
    navigate(`/vehicles/${id}/edit`);
  }, [navigate, id]);

  const handleDelete = useCallback(() => {
    if (
      window.confirm(
        "Da li ste sigurni da želite da obrišete vozilo? Ova akcija će takođe obrisati sve servise vezane za ovo vozilo."
      )
    ) {
      deleteVehicleById(
        { id, vehicle: vehicle || undefined },
        {
          onSuccess: () => navigate("/"),
        }
      );
    }
  }, [deleteVehicleById, id, vehicle, navigate]);

  if (isLoading || isPending) return <Spinner />;
  if (!vehicle) return <ErrorMessage message="Vozilo nije pronađeno." />;
  if (error || deleteError) {
    return <ErrorMessage message={(error || deleteError) ?? undefined} />;
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col space-y-2">
        <Headline level={1}>{vehicle?.marka}</Headline>
        <div className="gap-4 bg-white p-2 flex flex-wrap justify-between items-center">
          <div>
            <p>Model: {vehicle?.model}</p>
            <p>Godina: {vehicle?.godina}</p>
          </div>
          <div className="flex gap-3">
            <IconButton
              icon={<Edit size={20} className="text-auto-secondary" />}
              onClick={handleEdit}
              aria-label="Izmeni vozilo"
            />
            <IconButton
              icon={<Trash2 size={20} className="text-auto-error" />}
              onClick={handleDelete}
              disabled={isPending}
              aria-label="Obriši vozilo"
            />
          </div>
        </div>

        <VehicleServices vehicleId={id} />
      </div>
    </ErrorBoundary>
  );
});

export default VehicleDetails;
