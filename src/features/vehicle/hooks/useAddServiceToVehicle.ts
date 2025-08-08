import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Service } from "@/types/service";
import type { ApiResponse } from "@/types/api";
import { addServiceToVehicle } from "@/features/vehicle/api/vehicleServices";
import toast from "react-hot-toast";

export const useAddServiceToVehicle = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addNewService,
    isPending,
    error,
    data: response,
  } = useMutation<
    ApiResponse<Service>,
    Error,
    { vehicleId: string; serviceData: Omit<Service, "id"> }
  >({
    mutationFn: ({ vehicleId, serviceData }) =>
      addServiceToVehicle(vehicleId, serviceData),
    onSuccess: (response, { vehicleId, serviceData }) => {
      if (response.success) {
        toast.success(`Servis "${serviceData.opis}" je uspešno dodat!`);
        queryClient.invalidateQueries({
          queryKey: ["vehicle-services", vehicleId],
        });
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      } else {
        toast.error("Greška pri dodavanju servisa. Pokušajte ponovo.");
      }
    },
    onError: () => {
      toast.error("Greška pri dodavanju servisa. Pokušajte ponovo.");
    },
  });

  const apiError =
    response?.success === false ? response.error : error?.message;

  return {
    addNewService,
    isPending,
    error: apiError,
    success: response?.success ?? false,
  };
};
