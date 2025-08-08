import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Vehicle } from "@/types/vehicle";
import type { ApiResponse } from "@/types/api";
import { addVehicle } from "@/features/vehicle/api/vehicleApi";
import toast from "react-hot-toast";

export const useAddVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addNewVehicle,
    isPending,
    error,
    data: response,
  } = useMutation<ApiResponse<Vehicle>, Error, Omit<Vehicle, "id">>({
    mutationFn: (newVehicle) => addVehicle(newVehicle),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Vozilo je uspešno dodato!");
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      } else {
        toast.error("Greška pri dodavanju vozila. Pokušajte ponovo.");
      }
    },
    onError: () => {
      toast.error("Greška pri dodavanju vozila. Pokušajte ponovo.");
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    addNewVehicle,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};
