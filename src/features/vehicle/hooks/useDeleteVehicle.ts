import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVehicle } from "../api/vehicleApi";
import type { ApiResponse } from "../../../types/api";

const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteVehicleById,
    isPending,
    error,
    data: response,
  } = useMutation<ApiResponse<null>, Error, string>({
    mutationFn: (id: string) => deleteVehicle(id),
    onSuccess: (response, id) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
        queryClient.invalidateQueries({ queryKey: ["vehicle", id] });
      }
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
