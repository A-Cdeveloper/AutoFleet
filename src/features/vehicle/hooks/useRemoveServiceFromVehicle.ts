import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeServiceFromVehicle } from "../api/vehicleServices";
import type { ApiResponse } from "../../../types/api";

const useRemoveServiceFromVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: removeService,
    isPending,
    error,
    data: response,
  } = useMutation<
    ApiResponse<string[]>,
    Error,
    { vehicleId: string; serviceId: string }
  >({
    mutationFn: ({ vehicleId, serviceId }) =>
      removeServiceFromVehicle(vehicleId, serviceId),

    onSuccess: (_response, { vehicleId }) => {
      queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      queryClient.invalidateQueries({
        queryKey: ["vehicle-services", vehicleId],
      });
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    removeService,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};

export default useRemoveServiceFromVehicle;
