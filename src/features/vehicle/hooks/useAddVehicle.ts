import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Vehicle } from "@/types/vehicle";
import type { ApiResponse } from "@/types/api";
import { addVehicle } from "@/features/vehicle/api/vehicleApi";

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
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      }
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
