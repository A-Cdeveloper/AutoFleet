import type { Vehicle } from "@/types/vehicle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/api";
import { editVehicle } from "@/features/vehicle/api/vehicleApi";

export const useEditVehicle = () => {
  const queryClient = useQueryClient();

  type EditVehicleInput = {
    id: string;
    data: Omit<Vehicle, "id">;
  };

  const {
    mutate: editExistingVehicle,
    isPending,
    error,
    data: response,
  } = useMutation<ApiResponse<Vehicle>, Error, EditVehicleInput>({
    mutationFn: ({ id, data }) => editVehicle(id, data),
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        queryClient.invalidateQueries({ queryKey: ["vehicle", variables.id] });
      }
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    editExistingVehicle,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};
