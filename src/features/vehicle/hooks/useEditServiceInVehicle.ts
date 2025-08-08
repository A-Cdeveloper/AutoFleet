import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Service } from "@/types/service";
import type { ApiResponse } from "@/types/api";
import { editServiceInVehicle } from "@/features/vehicle/api/vehicleServices";

export const useEditServiceInVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editService,
    isPending,
    error,
    data: response,
  } = useMutation<
    ApiResponse<Service>,
    Error,
    { vehicleId: string; serviceId: string; serviceData: Omit<Service, "id"> }
  >({
    mutationFn: ({ serviceId, serviceData }) =>
      editServiceInVehicle(serviceId, serviceData),
    onSuccess: (response, { vehicleId }) => {
      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: ["vehicle-services", vehicleId],
        });
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      }
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    editService,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};
