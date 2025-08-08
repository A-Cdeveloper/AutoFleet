import { useQuery } from "@tanstack/react-query";
import { fetchVehicleById } from "@/features/vehicle/api/vehicleApi";
import type { Vehicle } from "@/types/vehicle";
import type { ApiResponse } from "@/types/api";

const useGetVehicle = (id: string) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse<Vehicle>>({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleById(id),
    enabled: !!id,
  });

  const data = response?.success ? response.data : null;
  const apiError = response?.success === false ? response.error : null;

  return {
    data,
    isLoading,
    error: apiError || error?.message,
  };
};

export default useGetVehicle;
