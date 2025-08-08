import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/api";
import type { Vehicle } from "@/types/vehicle";
import { deleteVehicle } from "@/features/vehicle/api/vehicleApi";
import toast from "react-hot-toast";

type DeleteVehicleInput = {
  id: string;
  vehicle?: Vehicle;
};

const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteVehicleById,
    isPending,
    error,
    data: response,
  } = useMutation<ApiResponse<null>, Error, DeleteVehicleInput>({
    mutationFn: ({ id }) => deleteVehicle(id),
    onSuccess: (response, { id, vehicle }) => {
      if (response.success) {
        const vehicleInfo = vehicle
          ? `${vehicle.marka} ${vehicle.model}`
          : "vozilo";
        toast.success(
          `${vehicleInfo} i svi njegovi servisi su uspešno obrisani!`
        );
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      } else {
        toast.error("Greška pri brisanju vozila. Pokušajte ponovo.");
      }
    },
    onError: () => {
      toast.error("Greška pri brisanju vozila. Pokušajte ponovo.");
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    deleteVehicleById,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};

export default useDeleteVehicle;
