import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeServiceFromVehicle } from "@/features/vehicle/api/vehicleServices";
import type { ApiResponse } from "@/types/api";
import toast from "react-hot-toast";

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

    onSuccess: (response, { vehicleId }) => {
      if (response.success) {
        toast.success("Servis je uspešno obrisan!");
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
        queryClient.invalidateQueries({
          queryKey: ["vehicle-services", vehicleId],
        });
      } else {
        toast.error("Greška pri brisanju servisa. Pokušajte ponovo.");
      }
    },
    onError: () => {
      toast.error("Greška pri brisanju servisa. Pokušajte ponovo.");
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
