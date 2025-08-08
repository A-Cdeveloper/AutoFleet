import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Service } from "@/types/service";
import type { ApiResponse } from "@/types/api";
import { editServiceInVehicle } from "@/features/vehicle/api/vehicleServices";
import toast from "react-hot-toast";

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
        toast.success("Servis je uspešno izmenjen!");
        queryClient.invalidateQueries({
          queryKey: ["vehicle-services", vehicleId],
        });
        queryClient.invalidateQueries({ queryKey: ["vehicle", vehicleId] });
      } else {
        toast.error("Greška pri izmeni servisa. Pokušajte ponovo.");
      }
    },
    onError: () => {
      toast.error("Greška pri izmeni servisa. Pokušajte ponovo.");
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
