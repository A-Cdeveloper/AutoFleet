import { useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Headline, Spinner, ErrorBoundary } from "@/ui";
import useDeleteVehicle from "@/features/vehicle/hooks/useDeleteVehicle";
import useGetVehicle from "@/features/vehicle/hooks/useGetVehicle";
import VehicleServices from "@/features/vehicle/components/VehicleServices";

const VehicleDetails = ({ id }: { id: string }) => {
  const { data: vehicle, isLoading, error } = useGetVehicle(id);
  const navigate = useNavigate();
  const {
    deleteVehicleById,
    isPending,
    error: deleteError,
  } = useDeleteVehicle();

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
            variation="primary"
            size="small"
            onClick={() => navigate(`/vehicles/${id}/edit`)}
            aria-label="Izmeni vozilo"
          >
            Izmeni
          </Button>
          <Button
            variation="danger"
            size="small"
            onClick={() => {
              if (
                window.confirm(
                  "Da li ste sigurni da želite da obrišete vozilo?"
                )
              ) {
                deleteVehicleById(id, {
                  onSuccess: () => navigate("/"),
                });
              }
            }}
            disabled={isPending}
            aria-label="Obriši vozilo"
          >
            Obriši
          </Button>
        </div>

        <VehicleServices vehicleId={id} />
      </div>
    </ErrorBoundary>
  );
};

export default VehicleDetails;
