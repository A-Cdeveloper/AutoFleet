import { useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Headline, Spinner, ErrorBoundary } from "@/ui";
import useDeleteVehicle from "@/features/vehicle/hooks/useDeleteVehicle";
import useGetVehicle from "@/features/vehicle/hooks/useGetVehicle";
import VehicleServices from "@/features/vehicle/components/VehicleServices";
import React from "react";
import { useCallback } from "react";

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
      deleteVehicleById(id, {
        onSuccess: () => navigate("/"),
      });
    }
  }, [deleteVehicleById, id, navigate]);

  if (!vehicle) return <ErrorMessage message="Vozilo nije pronađeno." />;
  if (isLoading || isPending) return <Spinner />;
  if (error || deleteError) {
    return <ErrorMessage message={(error || deleteError) ?? undefined} />;
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col space-y-2">
        <Headline level={1}>{vehicle?.marka}</Headline>
        <div className="gap-4 bg-white p-2">
          <p>Model: {vehicle?.model}</p>
          <p>Godina: {vehicle?.godina}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variation="danger"
            size="small"
            onClick={handleDelete}
            disabled={isPending}
            aria-label="Obriši vozilo"
          >
            Obriši
          </Button>
          <Button
            variation="primary"
            size="small"
            onClick={handleEdit}
            aria-label="Izmeni vozilo"
          >
            Izmeni
          </Button>
        </div>

        <VehicleServices vehicleId={id} />
      </div>
    </ErrorBoundary>
  );
});

export default VehicleDetails;
